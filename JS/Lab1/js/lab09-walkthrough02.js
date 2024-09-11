/* code goes here */
var stories = document.getElementById("stories");
for (i = 0; i < stories.childNodes.length; i++) {
  if (stories.childNodes[i].nodeType !== 3) {
    // Kiểm tra nếu node không phải là text
    stories.childNodes[i].style.backgroundColor = "green"; // Đổi màu nền
  }
}
