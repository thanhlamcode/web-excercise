/* code goes here */
var msg = document.getElementById("msgArea");
msg.value = "here is some text";

var title = document.getElementById("pageTitle");
title.innerHTML = "New Title";

document.getElementById("pageTitle").innerHTML = "Even newer title";

msg.value = document.getElementById("first").innerText;

msg.value = "My	class is" + msg.getAttribute("class");

var elem = document.getElementsByTagName("textarea");
elem[0].value = "selected by tag name";

document.getElementById("msgArea").value = "";
var counts = document.getElementsByClassName("count-number");
for (i = 0; i < counts.length; i++) {
  document.getElementById("msgArea").value += "\n" + counts[i].innerText;
}

var ps = document.querySelector("#first	p");
document.getElementById("msgArea").value = ps.innerHTML;

ps = document.querySelectorAll("#first	p");
for (i = 0; i < ps.length; i++) {
  document.getElementById("msgArea").value += ps[i].innerHTML + "\n";
}

document.getElementById("msgArea").setAttribute("class", "hidden");

document.getElementById("features").style.backgroundColor = "green";
