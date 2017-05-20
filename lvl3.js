var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var x = 700;
var y = 700;
var chaserX = 50;
var chaserY = 50;
var dx = 2;
var dy = -2;
var chaserDX = 1.5;
var chaserDY = -1.5;
var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;
var dPressed = false;
var aPressed = false;
var wPressed = false;
var sPressed = false;
var ballRadius = 15;
var chaserRadius = 15;
var seconds = 0;
var start = false;
var highscore3 = 0;
var difficulty= "";
var paused = false;

var link = document.createElement('link');
link.type = 'image/x-icon';
link.rel = 'shortcut icon';
link.href = 'https://jevin-studios.github.io/Chaser/logo.ico';
document.getElementsByTagName('head')[0].appendChild(link);


if(localStorage.getItem("highscore3")) {
	highscore3 = localStorage.getItem("highscore3");
	document.getElementById("seconds").innerHTML = "Seconds: "+seconds+" Highscore: "+highscore3;
} else {
	highscore3 = 0;
	document.getElementById("seconds").innerHTML = "Seconds: "+seconds+" Highscore: "+highscore3;
};

if(localStorage.getItem("difficulty")) {
	difficulty = localStorage.getItem("difficulty");
	if(difficulty == "easy") {
		chaserDX = 1.2;
		chaserDY = -1.2;
	} else if(difficulty == "medium") {
		chaserDX = 1.5;
		chaserDY = -1.5;
	} else if(difficulty == "hard") {
		chaserDX = 1.8;
		chaserDY = -1.8;
	}
}

if(localStorage.getItem("runnerColor")) {
	runnerColor = localStorage.getItem("runnerColor");
} else {
	runnerColor = "#0000FF";
	localStorage.setItem("runnerColor", runnerColor);
}

if(localStorage.getItem("chaserColor")) {
	chaserColor = localStorage.getItem("chaserColor");
} else {
	chaserColor = "#008000";
	localStorage.setItem("chaserColor", chaserColor);
}

function drawBall() {
	ctx.beginPath();
	ctx.arc(x, y, ballRadius, 0, Math.PI*2, false);
	ctx.fillStyle = runnerColor;
	ctx.fill();
	ctx.closePath();
}

function drawChaser() {
	ctx.beginPath();
	ctx.arc(chaserX, chaserY, chaserRadius, 0, Math.PI*2, false);
	ctx.fillStyle = chaserColor;
	ctx.fill();
	ctx.closePath();
}

function drawInnerBox() {
	ctx.beginPath();
	ctx.strokeStyle="black";
	ctx.moveTo(125,325);
	ctx.lineTo(125,125);
	ctx.lineTo(625,125);
	ctx.lineTo(625,325);
	ctx.moveTo(625,425);
	ctx.lineTo(625,625);
	ctx.lineTo(125,625);
	ctx.lineTo(125,425);
	ctx.moveTo(350,250);
	ctx.lineTo(250,250);
	ctx.lineTo(250,500);
	ctx.lineTo(350,500);
	ctx.moveTo(400,500);
	ctx.lineTo(500,500);
	ctx.lineTo(500,250);
	ctx.lineTo(400,250);
	ctx.stroke();
	ctx.closePath();
}



function drawSeconds() {
	if (!(y + dy > canvas.height-ballRadius || y + dy < ballRadius || x + dx > canvas.width-ballRadius || x + dx < ballRadius || (Math.sqrt((Math.pow((chaserX-x), 2)) + (Math.pow((chaserY-y), 2)))) < 30)) {
		if (paused) {
			seconds += 0;
		} else {
			seconds += 1;
		}
		document.getElementById("seconds").innerHTML = "Seconds: "+seconds+" Highscore: "+highscore3;
	}
}

function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawInnerBox();
	drawBall();
	drawChaser();
	if(y + dy > canvas.height-ballRadius || y + dy < ballRadius || x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
		runnerHitWall();
	}
	
	if((x+dx)>=125-ballRadius && (x+dx)<=625+ballRadius) {
		if((y+dy)>=125-ballRadius && (y+dy)<=125+ballRadius || (y+dy)>=625-ballRadius && (y+dy)<=625+ballRadius){
			runnerHitWall();
		}
	}
	
	if((x+dx)>=250-ballRadius && (x+dx)<=350+ballRadius || (x+dx)>=400-ballRadius && (x+dx)<=500+ballRadius) {
		if((y+dy)>=250-ballRadius && (y+dy)<=250+ballRadius || (y+dy)>=500-ballRadius && (y+dy)<=500+ballRadius){
			runnerHitWall();
		}
	}
	
	if((y+dy)>=125-ballRadius && (y+dy)<=325+ballRadius || (y+dy)>=425-ballRadius && (y+dy)<=625+ballRadius) {
		if((x+dx)>=125-ballRadius && (x+dx)<=125+ballRadius || (x+dx)>=625-ballRadius && (x+dx)<=625+ballRadius){
			runnerHitWall();
		}
	}

	if((y+dy)>=250-ballRadius && (y+dy)<=500+ballRadius) {
		if((x+dx)>=250-ballRadius && (x+dx)<=250+ballRadius || (x+dx)>=500-ballRadius && (x+dx)<=500+ballRadius){
			runnerHitWall();
		}
	}		
	
		
	
	if((Math.sqrt((Math.pow((chaserX-x), 2)) + (Math.pow((chaserY-y), 2)))) < 30) {
		clearInterval(drawTimer);
		if(seconds>highscore3) {
			highscore3 = seconds;
			localStorage.setItem("highscore3",highscore3);
			swal({
				title: "Chaser caught runner",
				text: "The chaser caught the runner\n\nYou have set a new highscore of "+highscore3+" seconds",
				type: "info",
				confirmButtonText: "Retry",
				closeOnConfirm: false
			},
			function(){
				document.location.reload();
			});
		} else {
			swal({
				title: "Chaser caught runner",
				text: "The chaser caught the runner",
				type: "info",
				confirmButtonText: "Retry",
				closeOnConfirm: false
			},
			function(){
				document.location.reload();
			});
		}
	}

	if(rightPressed) {
		pauseOff();
		x += dx;
	}
	if(leftPressed) {
		pauseOff();
		x -= dx;
	}
	if(downPressed) {
		pauseOff();
		y -= dy;
	}
	if(upPressed) {
		pauseOff();
		y += dy;
	}
	if(dPressed) {
		pauseOff();
		if(!(chaserX + chaserDX > canvas.width-chaserRadius)) {
			if(!((chaserY+chaserDY)>=250-ballRadius && (chaserY+chaserDY)<=500+ballRadius)) {
				if(!((chaserY+chaserDY)>=125-ballRadius && (chaserY+chaserDY)<=325+ballRadius || (chaserY+chaserDY)>=425-ballRadius && (chaserY+chaserDY)<=625+ballRadius)) {
					chaserX += chaserDX;
				} else if(!((chaserX+chaserDX)>=125-ballRadius && (chaserX+chaserDX)<=125 || (chaserX+chaserDX)>=625-ballRadius && (chaserX+chaserDX)<=625)) {
					chaserX += chaserDX;
				}
			} else if(!((chaserX+chaserDX)>=250-ballRadius && (chaserX+chaserDX)<=250 || (chaserX+chaserDX)>=500-ballRadius && (chaserX+chaserDX)<=500)) {
				if(!((chaserY+chaserDY)>=125-ballRadius && (chaserY+chaserDY)<=325+ballRadius || (chaserY+chaserDY)>=425-ballRadius && (chaserY+chaserDY)<=625+ballRadius)) {
					chaserX += chaserDX;
				} else if(!((chaserX+chaserDX)>=125-ballRadius && (chaserX+chaserDX)<=125 || (chaserX+chaserDX)>=625-ballRadius && (chaserX+chaserDX)<=625)) {
					chaserX += chaserDX;
				}
			}
		}
		
	}
	if(aPressed) {
		pauseOff();
		if(!(chaserX + chaserDX < chaserRadius)) {
			if(!((chaserY+chaserDY)>=250-ballRadius && (chaserY+chaserDY)<=500+ballRadius)) {
				if(!((chaserY+chaserDY)>=125-ballRadius && (chaserY+chaserDY)<=325+ballRadius || (chaserY+chaserDY)>=425-ballRadius && (chaserY+chaserDY)<=625+ballRadius)) {
					chaserX -= chaserDX;
				} else if(!((chaserX+chaserDX)>=125 && (chaserX+chaserDX)<=125+ballRadius || (chaserX+chaserDX)>=625 && (chaserX+chaserDX)<=625+ballRadius)) {
					chaserX -= chaserDX;
				}
			} else if(!((chaserX+chaserDX)>=250 && (chaserX+chaserDX)<=250+ballRadius || (chaserX+chaserDX)>=500 && (chaserX+chaserDX)<=500+ballRadius)) {
				if(!((chaserY+chaserDY)>=125-ballRadius && (chaserY+chaserDY)<=325+ballRadius || (chaserY+chaserDY)>=425-ballRadius && (chaserY+chaserDY)<=625+ballRadius)) {
					chaserX -= chaserDX;
				} else if(!((chaserX+chaserDX)>=125 && (chaserX+chaserDX)<=125+ballRadius || (chaserX+chaserDX)>=625 && (chaserX+chaserDX)<=625+ballRadius)) {
					chaserX -= chaserDX;
				}
			}
		}
	}
	if(sPressed) {
		pauseOff();
		if(!(chaserY + chaserDY > canvas.height-chaserRadius)) {
			if(!((chaserX+chaserDX)>=125-ballRadius && (chaserX+chaserDX)<=625+ballRadius)) {
				if(!((chaserX+chaserDX)>=250-ballRadius && (chaserX+chaserDX)<=350+ballRadius || (chaserX+chaserDX)>=400-ballRadius && (chaserX+chaserDX)<=500+ballRadius)) {
					chaserY -= chaserDY;
				} else if(!((chaserY+chaserDY)>=250-ballRadius && (chaserY+chaserDY)<=250 || (chaserY+chaserDY)>=500-ballRadius && (chaserY+chaserDY)<=500)) {
					chaserY -= chaserDY;
				}
			} else if(!((chaserY+chaserDY)>=625-ballRadius && (chaserY+chaserDY)<=625 || (chaserY+chaserDY)>=125-ballRadius && (chaserY+chaserDY)<=125)) {
				if(!((chaserX+chaserDX)>=250-ballRadius && (chaserX+chaserDX)<=350+ballRadius || (chaserX+chaserDX)>=400-ballRadius && (chaserX+chaserDX)<=500+ballRadius)) {
					chaserY -= chaserDY;
				} else if(!((chaserY+chaserDY)>=250-ballRadius && (chaserY+chaserDY)<=250 || (chaserY+chaserDY)>=500-ballRadius && (chaserY+chaserDY)<=500)) {
					chaserY -= chaserDY;
				}
			}
		}
	}
				
	if(wPressed) {
		pauseOff();
		if(!(chaserY + chaserDY < chaserRadius)) {
			if(!((chaserX+chaserDX)>=125-ballRadius && (chaserX+chaserDX)<=625+ballRadius)) {
				if(!((chaserX+chaserDX)>=250-ballRadius && (chaserX+chaserDX)<=350+ballRadius || (chaserX+chaserDX)>=400-ballRadius && (chaserX+chaserDX)<=500+ballRadius)) {
					chaserY += chaserDY;
				} else if(!((chaserY+chaserDY)>=250 && (chaserY+chaserDY)<=250+ballRadius || (chaserY+chaserDY)>=500 && (chaserY+chaserDY)<=500+ballRadius)) {
					chaserY += chaserDY;
				}
			} else if(!((chaserY+chaserDY)>=125 && (chaserY+chaserDY)<=125+ballRadius || (chaserY+chaserDY)>=625 && (chaserY+chaserDY)<=625+ballRadius)) {
				if(!((chaserX+chaserDX)>=250-ballRadius && (chaserX+chaserDX)<=350+ballRadius || (chaserX+chaserDX)>=400-ballRadius && (chaserX+chaserDX)<=500+ballRadius)) {
					chaserY += chaserDY;
				} else if(!((chaserY+chaserDY)>=250 && (chaserY+chaserDY)<=250+ballRadius || (chaserY+chaserDY)>=500 && (chaserY+chaserDY)<=500+ballRadius)) {
					chaserY += chaserDY;
				}
			}
		}
	}
	if(!rightPressed && !leftPressed && !upPressed && !downPressed && !aPressed && !dPressed && !sPressed && !wPressed) {
		if(start) {
			pauseOn();	
		}
	}
}


document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
	if(e.keyCode == 39) {
		rightPressed = true;
		if(!start) {
			start = true;
			setInterval(drawSeconds, 1000);
		}
	} else if (e.keyCode == 37) {
		leftPressed = true;
		if(!start) {
			start = true;
			setInterval(drawSeconds, 1000);
		}
	} else if (e.keyCode == 40) {
		downPressed = true;
		if(!start) {
			start = true;
			setInterval(drawSeconds, 1000);
		}
	} else if (e.keyCode == 38) {
		upPressed = true;
		if(!start) {
			start = true;
			setInterval(drawSeconds, 1000);
		}
	} else if (e.keyCode == 65) {
		aPressed = true;
		if(!start) {
			start = true;
			setInterval(drawSeconds, 1000);
		}
	} else if (e.keyCode == 68) {
		dPressed = true;
		if(!start) {
			start = true;
			setInterval(drawSeconds, 1000);
		}
	} else if (e.keyCode == 83) {
		sPressed = true;
		if(!start) {
			start = true;
			setInterval(drawSeconds, 1000);
		}
	} else if (e.keyCode == 87) {
		wPressed = true;
		if(!start) {
			start = true;
			setInterval(drawSeconds, 1000);
		}
	}
}

function keyUpHandler(e) {
	if(e.keyCode == 39) {
		rightPressed = false;
	} else if (e.keyCode == 37) {
		leftPressed = false;
	} else if (e.keyCode == 40) {
		downPressed = false;
	} else if (e.keyCode == 38) {
		upPressed = false;
	} else if (e.keyCode == 65) {
		aPressed = false;
	} else if (e.keyCode == 68) {
		dPressed = false;
	} else if (e.keyCode == 83) {
		sPressed = false;
	} else if (e.keyCode == 87) {
		wPressed = false;
	}
	
}

function resetHighscore() {
	ga('send', 'event', 'Button', 'click', 'Reset Highscore?');
	clearInterval(draw);
	swal({
		title: "Are You Sure?",
		text: "Clicking OK will reset your highscore to 0",
		type: "warning",
		showCancelButton: true,
		closeOnConfirm: false,
		showLoaderOnConfirm: true,
	},
	function(){
		ga('send', 'event', 'Button', 'click', 'Highscore Resetted');
		localStorage.setItem("highscore3", 0)
		setTimeout(function(){
			swal({
				title: "Highscore Deleted",
				type: "success",
				closeOnConfirm: false,
			},
			function(){
				document.location.reload();
			});
		}, 2000);
	});
}

// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("help");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
	ga('send', 'event', 'Button', 'click', 'Show Help', 3);
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function toMenu() {
	ga('send', 'event', 'Button', 'click', 'Go to Menu');
	window.location = "index.html";
	return
}

function runnerHitWall() {
	clearInterval(drawTimer);
	if(seconds>highscore3) {
		highscore3 = seconds;
		localStorage.setItem("highscore3",highscore3);
		swal({
			title: "Runner Dies",
			text: "The runner hit the wall\n\nYou have set a new highscore of "+highscore3+" seconds",
			type: "info",
			confirmButtonText: "Retry",
			closeOnConfirm: false
		},
		function(){
			document.location.reload();
		});
	} else {
		swal({
			title: "Runner Dies",
			text: "The runner hit the wall",
			type: "info",
			confirmButtonText: "Retry",
			closeOnConfirm: false
		},
		function(){
			document.location.reload();
		});
	}
}

function pauseOn() {
	paused = true;
	document.getElementById("pauseOverlay").style.display = "block";
}

function pauseOff() {
	paused = false;
	document.getElementById("pauseOverlay").style.display = "none";
}

var drawTimer = setInterval(draw, 10);