
function butshow(){
    const mainDisplay = document.getElementById('MAINSHOW');
    mainDisplay.innerHTML = '';
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/Slices');
    xhr.onload = function() {
      const receivedText = this.responseText;
      const output = document.getElementById('MAINSHOW');
      output.textContent = receivedText;
    }
    xhr.send();
}

function butadd(){
    const mainDisplay = document.getElementById("MAINSHOW");
    mainDisplay.innerHTML = "";
    const titleValue = document.getElementById("titleTF").value;
    const numericValue = document.getElementById("valueTF").value;
    const colorValue = document.getElementById("colorTF").value;
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/add?title=' + titleValue + '&value=' + numericValue + '&color=' + colorValue);
    xhr.send();
}

function addshow(){
  document.getElementById("SUBMITADD").style.visibility = "visible";
  document.getElementById("colorTF").style.visibility = "visible";
  document.getElementById("valueTF").style.visibility = "visible";
  document.getElementById("titleTF").style.visibility = "visible";
}

function remshow(){
    document.getElementById("SUBMITREM").style.visibility = "visible";
    document.getElementById("indexTF").style.visibility = "visible";
}
function butrem(){
    const mainDisplay = document.getElementById("MAINSHOW");
    mainDisplay.innerHTML = "";
    const indexValue = document.getElementById("indexTF").value;
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '../../remove?index=' + (new Number(indexValue)).toString());
    xhr.send();
}
function clear(){
    const mainDisplay = document.getElementById("MAINSHOW");
    mainDisplay.innerHTML = "";
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '../../clear');
    xhr.send();
}
function restore(){
    const mainDisplay = document.getElementById("MAINSHOW");
    mainDisplay.innerHTML = "";
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '../../restore');
    xhr.send();
}