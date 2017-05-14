var slideIndex = 1;
var slideNumber = 1;
showSlides(slideIndex);

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
		window.location = "lvl1.html";
		return
	}
	if(slideNumber % 3 == 2) {
		window.location = "lvl2.html";
		return
	}
}