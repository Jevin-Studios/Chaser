var slideIndex = 1;
var slideNumber = 1;
var difficulty = "";
var chaserColor = "";
var runnerColor = "";
showSlides(slideIndex);

function onload() {
	if(localStorage.getItem("difficulty")) {
		difficulty = localStorage.getItem("difficulty");
	} else {
		difficulty = "medium";
	};

	if(localStorage.getItem("chaserColor")) {
		chaserColor = localStorage.getItem("chaserColor");
	} else {
		chaserColor = "#008000";
	}

	if(localStorage.getItem("runnerColor")) {
		runnerColor = localStorage.getItem("runnerColor");
	} else {
		runnerColor = "#0000FF";
	}
}

window.onload = onload();

function plusSlides(n) {
	if(n == 1) {
		if(!(slideNumber == 3)) {
			slideNumber += 1;
			showSlides(slideIndex += n);
		}
	}
	if(n == -1) {
		if(!(slideNumber == 1)) {
			slideNumber -= 1;
			showSlides(slideIndex += n);
		}
	}
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  slideNumber = n;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1} 
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none"; 
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block"; 
  dots[slideIndex-1].className += " active";
}

function play () {
	if(slideNumber % 3 == 1) {
		ga('send', 'event', 'Button', 'click', 'Play Level 1');
		window.location = "lvl1.html";
		return
	}
	if(slideNumber % 3 == 2) {
		ga('send', 'event', 'Button', 'click', 'Play Level 2');
		window.location = "lvl2.html";
		return
	}
	if(slideNumber % 3 == 0) {
		ga('send', 'event', 'Button', 'click', 'Play Level 3');
		window.location = "lvl3.html";
		return
	}
}

// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("settings");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
	ga('send', 'event', 'Button', 'click', 'Show Help', 1);
	difficulty = localStorage.getItem("difficulty");
	if(difficulty == "easy") {
		document.getElementById("easyOption").setAttribute("selected", "selected");
	} else if(difficulty == "medium") {
		document.getElementById("mediumOption").setAttribute("selected", "selected");
	} else {
		document.getElementById("hardOption").setAttribute("selected", "selected");
	}
	chaserColor = localStorage.getItem("chaserColor");
	document.getElementById("chaserColor").value = chaserColor;
	runnerColor = localStorage.getItem("runnerColor");
	document.getElementById("runnerColor").value = runnerColor;
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
	saveSettings();
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
		saveSettings();
        modal.style.display = "none";
    }
}

function difficultyHelp() {
    var popup = document.getElementById("myPopup");
    popup.classList.toggle("show");
}

function saveSettings() {
	difficulty = document.getElementById("difficultySelect").value;
	localStorage.setItem("difficulty",difficulty);
	chaserColor = document.getElementById("chaserColor").value;
	localStorage.setItem("chaserColor", chaserColor);
	runnerColor = document.getElementById("runnerColor").value;
	localStorage.setItem("runnerColor", runnerColor);
	modal.style.display = "none";
}

function resetBtn() {
	difficulty = "medium";
	localStorage.setItem("difficulty",difficulty);
	chaserColor = "#008000";
	localStorage.setItem("chaserColor", chaserColor);
	runnerColor = "#0000FF";
	localStorage.setItem("runnerColor", runnerColor);
	if(difficulty == "easy") {
		document.getElementById("easyOption").setAttribute("selected", "selected");
	} else if(difficulty == "medium") {
		document.getElementById("mediumOption").setAttribute("selected", "selected");
	} else {
		document.getElementById("hardOption").setAttribute("selected", "selected");
	}
	chaserColor = localStorage.getItem("chaserColor");
	document.getElementById("chaserColor").value = chaserColor;
	runnerColor = localStorage.getItem("runnerColor");
	document.getElementById("runnerColor").value = runnerColor;
}