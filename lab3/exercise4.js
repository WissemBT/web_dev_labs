let slidesData;
let currentIndex = 0;
let playing = false;
let timeoutId;

function loadJSON() {
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", "slides.json");
    xhttp.onload = function() {
        slidesData = JSON.parse(this.responseText);
    };
    xhttp.send();
}

function displaySlide(url, div) {
    while(div.childElementCount != 0) {
        div.removeChild(div.firstChild);
    }
    if (url !== "") {
        let iframe = document.createElement("iframe");
        iframe.src = url;
        div.appendChild(iframe);
    }
}

loadJSON();

function playSlides() {
    playing = true;
    displayNextSlide();
}

function displayNextSlide() {
    if (currentIndex < slidesData.slides.length) {
        let div = document.getElementById("SLSH");
        let slide = slidesData.slides[currentIndex];
        displaySlide(slide.url, div);
        currentIndex++;
        if (playing) {
            timeoutId = setTimeout(displayNextSlide,2000);
        }
    }
}

function pauseSlides() {
    playing = !playing;
    if (playing) {
        if (currentIndex > 0) {
            currentIndex--;
        }
        displayNextSlide();
    } else {
        clearTimeout(timeoutId);
    }
}

function nextSlide() {
    if (playing) {
        pauseSlides();
    }
    if (currentIndex < slidesData.slides.length) {
        displayNextSlide();
    }
}

function previousSlide() {
    if (playing) {
        pauseSlides();
    }
    if (currentIndex > 1) {
        currentIndex -= 2;
        displayNextSlide();
    } else if (currentIndex === 1) {
        currentIndex = 0;
        displayNextSlide();
    }
}
