function loadDoc(){
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET","text.txt",false);
    xhttp.send();
    document.getElementById("textarea").innerHTML = xhttp.responseText;
}

function loadDoc2() {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        let lines = this.responseText.split('\n');
        let colors=["red","blue","green","yellow"];
        let output = '';
        for (let i=0;i<lines.length;i++) {
          output += '<p style="color: ' + colors[i % 4] + ';">' + lines[i] + '</p>';
        }
        document.getElementById("textarea2").innerHTML = output;
    };
    xhttp.open("GET", "text.txt", true);
    xhttp.send();
  }

document.getElementById("b1").addEventListener("click", loadDoc);
document.getElementById("b2").addEventListener("click", loadDoc2);