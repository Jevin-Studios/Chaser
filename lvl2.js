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
var highscore2 = 0;

var link = document.createElement('link');
link.type = 'image/x-icon';
link.rel = 'shortcut icon';
link.href = 'https://jevin-studios.github.io/Chaser/logo.ico';
document.getElementsByTagName('head')[0].appendChild(link);


if(localStorage.getItem("highscore2")) {
	highscore2 = localStorage.getItem("highscore2");
	document.getElementById("seconds").innerHTML = "Seconds: "+seconds+" Highscore: "+highscore2;
} else {
	highscore2 = 0;
	document.getElementById("seconds").innerHTML = "Seconds: "+seconds+" Highscore: "+highscore2;
};



function drawBall() {
	ctx.beginPath();
	ctx.arc(x, y, ballRadius, 0, Math.PI*2, false);
	ctx.fillStyle = "blue";
	ctx.fill();
	ctx.closePath();
}

function drawChaser() {
	ctx.beginPath();
	ctx.arc(chaserX, chaserY, chaserRadius, 0, Math.PI*2, false);
	ctx.fillStyle = "green";
	ctx.fill();
	ctx.closePath();
}

function drawInnerBox() {
	ctx.beginPath();
	ctx.strokeStyle="black";
	ctx.strokeRect(200,200,350,350);
	ctx.closePath();
}

function drawText() {
	ctx.font = "30px Comic Sans MS";
	ctx.fillStyle = "black";
	ctx.textAlign = "center";
	ctx.fillText("Chaser Only", canvas.width/2, canvas.height/2);
}


function drawSeconds() {
	if (!(y + dy > canvas.height-ballRadius || y + dy < ballRadius || x + dx > canvas.width-ballRadius || x + dx < ballRadius || (Math.sqrt((Math.pow((chaserX-x), 2)) + (Math.pow((chaserY-y), 2)))) < 30)) {
		seconds += 1;
		document.getElementById("seconds").innerHTML = "Seconds: "+seconds+" Highscore: "+highscore2;
	}
}

function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawInnerBox();
	drawText();
	drawBall();
	drawChaser();
	if(y + dy > canvas.height-ballRadius || y + dy < ballRadius || x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
		clearInterval(drawTimer);
		if(seconds>highscore2) {
			highscore2 = seconds;
			localStorage.setItem("highscore2",highscore2);
			swal({
				title: "Runner Dies",
				text: "The runner hit the wall\n\nYou have set a new highscore of "+highscore2+" seconds",
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
	
	if((x+dx)>=200-ballRadius && (x+dx)<=550+ballRadius) {
		if((y+dy)>=200-ballRadius && (y+dy)<=550+ballRadius){
			clearInterval(drawTimer);
			if(seconds>highscore2) {
				highscore2 = seconds;
				localStorage.setItem("highscore2",highscore2);
				swal({
					title: "Runner Dies",
					text: "The runner hit the wall\n\nYou have set a new highscore of "+highscore2+" seconds",
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
	}
			
	
		
	
	if((Math.sqrt((Math.pow((chaserX-x), 2)) + (Math.pow((chaserY-y), 2)))) < 30) {
		clearInterval(drawTimer);
		if(seconds>highscore2) {
			highscore2 = seconds;
			localStorage.setItem("highscore2",highscore2);
			swal({
				title: "Chaser caught runner",
				text: "The chaser caught the runner\n\nYou have set a new highscore of "+highscore2+" seconds",
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
		x += dx;
	}
	if(leftPressed) {
		x -= dx;
	}
	if(downPressed) {
		y -= dy;
	}
	if(upPressed) {
		y += dy;
	}
	if(dPressed) {
		if(chaserX + chaserDX > canvas.width-chaserRadius) {
		} else {
			chaserX += chaserDX;
		}
	}
	if(aPressed) {
		if(chaserX + chaserDX < chaserRadius) {
		} else {
			chaserX -= chaserDX;
		}
	}
	if(sPressed) {
		if(chaserY + chaserDY > canvas.height-chaserRadius) {
		} else {
			chaserY -= chaserDY;
		}
	}
	if(wPressed) {
		if(chaserY + chaserDY < chaserRadius) {
		} else {
			chaserY += chaserDY;
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
		localStorage.setItem("highscore2", 0)
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
	window.location = "index.html";
	return
}

var drawTimer = setInterval(draw, 10);