function send() {
  let text = document.getElementById("textedit")
  let msg=text.value;
  if (msg != ""){
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", "chat.php?phrase="+msg);
    xhttp.send();
  }
}

function display_loop() {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (xhttp.readyState === 4 && xhttp.status === 200) {
        let txt = document.getElementById("textarea");
        let messages = xhttp.responseText.trim().split("\n").reverse();
        txt.innerHTML = "";
        let displayedMessages = 0;
        for (const message of messages) {
          if (displayedMessages >= 10) {
            break;
          }
          if (message !== "") {
            const element = document.createElement("p");
            element.textContent = message;
            txt.appendChild(element);
            displayedMessages++;
          }
        }
      }
    };
    xhttp.open("GET", "chatlog.txt", true);
    xhttp.send();
  }
setInterval(display_loop, 100);