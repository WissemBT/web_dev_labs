let slidesData;

function loadJSON() {
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", "slides.json");
    xhttp.onload = function() {
        slidesData = JSON.parse(this.responseText);
    };
    xhttp.send();
}

function displaySlide(url, div) {
    while(div.childElementCount !=0){
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
    let div = document.getElementById("SLSH");
    let currentIndex = 0;
    function displayNextSlide() {
        if (currentIndex < slidesData.slides.length) {
            let slide = slidesData.slides[currentIndex];
            displaySlide(slide.url, div);
            currentIndex++;
            setTimeout(displayNextSlide, 2000);
        }
    }
    displayNextSlide();
}

