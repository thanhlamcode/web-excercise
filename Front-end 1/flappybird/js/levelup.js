var currentLevel = 1;
var interval = 40; // Thời gian mặc định của level 1

// Hàm cập nhật Level và tốc độ di chuyển
function updateLevel(score) {
  if (score >= 50) {
    stop_the_game();
    alert("Chúc mừng, bạn đã chiến thắng!");
  } else if (score >= 40) {
    currentLevel = 4;
    interval = 20; // Level 4: Interval 20ms
  } else if (score >= 20) {
    currentLevel = 3;
    interval = 25; // Level 3: Interval 25ms
  } else if (score >= 5) {
    currentLevel = 2;
    interval = 30; // Level 2: Interval 30ms
  } else {
    currentLevel = 1;
    interval = 40; // Level 1: Interval 40ms
  }

  // Cập nhật Level hiển thị trên giao diện
  $("#level").text("Level: " + currentLevel);
  return interval;
}
