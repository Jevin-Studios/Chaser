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
var highscore1 = 0;
var difficulty = "";
var runnerColor = "";
var chaserColor = "";
var paused = false;

var link = document.createElement('link');
link.type = 'image/x-icon';
link.rel = 'shortcut icon';
link.href = 'https://jevin-studios.github.io/Chaser/logo.ico';
document.getElementsByTagName('head')[0].appendChild(link);


if(localStorage.getItem("highscore1")) {
	highscore1 = localStorage.getItem("highscore1");
	document.getElementById("seconds").innerHTML = "Seconds: "+seconds+" Highscore: "+highscore1;
} else {
	highscore1 = 0;
	document.getElementById("seconds").innerHTML = "Seconds: "+seconds+" Highscore: "+highscore1;
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
} else {
	chaserDX = 1.5;
	chaserDY = -1.5;
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


function drawSeconds() {
	if (!(y + dy > canvas.height-ballRadius || y + dy < ballRadius || x + dx > canvas.width-ballRadius || x + dx < ballRadius || (Math.sqrt((Math.pow((chaserX-x), 2)) + (Math.pow((chaserY-y), 2)))) < 30)) {
		if (paused) {
			seconds += 0;
		} else {
			seconds += 1;
		}
		document.getElementById("seconds").innerHTML = "Seconds: "+seconds+" Highscore: "+highscore1;
	}
}

function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawBall();
	drawChaser();
	if(y + dy > canvas.height-ballRadius || y + dy < ballRadius || x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
		clearInterval(drawTimer);
		if(seconds>highscore1) {
			highscore1 = seconds;
			localStorage.setItem("highscore1",highscore1);
			swal({
				title: "Runner Dies",
				text: "The runner hit the wall\n\nYou have set a new highscore of "+highscore1+" seconds",
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
	
		
	
	if((Math.sqrt((Math.pow((chaserX-x), 2)) + (Math.pow((chaserY-y), 2)))) < 30) {
		clearInterval(drawTimer);
		if(seconds>highscore1) {
			highscore1 = seconds;
			localStorage.setItem("highscore1",highscore1);
			swal({
				title: "Chaser caught runner",
				text: "The chaser caught the runner\n\nYou have set a new highscore of "+highscore1+" seconds",
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
		if(chaserX + chaserDX > canvas.width-chaserRadius) {
		} else {
			chaserX += chaserDX;
		}
	}
	if(aPressed) {
		pauseOff();
		if(chaserX + chaserDX < chaserRadius) {
		} else {
			chaserX -= chaserDX;
		}
	}
	if(sPressed) {
		pauseOff();
		if(chaserY + chaserDY > canvas.height-chaserRadius) {
		} else {
			chaserY -= chaserDY;
		}
	}
	if(wPressed) {
		pauseOff();
		if(chaserY + chaserDY < chaserRadius) {
		} else {
			chaserY += chaserDY;
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
			drawSeconds = setInterval(drawSeconds, 1000);
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
		localStorage.setItem("highscore1", 0)
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
	ga('send', 'event', 'Button', 'click', 'Show Help', 1);
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

function pauseOn() {
	paused = true;
	document.getElementById("pauseOverlay").style.display = "block";
}

function pauseOff() {
	paused = false;
	document.getElementById("pauseOverlay").style.display = "none";
}

var drawTimer = setInterval(draw, 10);