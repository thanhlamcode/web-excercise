$(function () {
  // Khai báo các object
  var container = $("#container");
  var bird = $("#bird");
  var pole = $(".pole");
  var pole_1 = $("#pole_1");
  var pole_2 = $("#pole_2");
  var score = $("#score");

  // Chuyển các thông tin của object sang dạng số thực
  var container_width = parseInt(container.width());
  var container_height = parseInt(container.height());
  var pole_initial_position = parseInt(pole.css("right"));
  var pole_initial_height = parseInt(pole.css("height"));
  var bird_left = parseInt(bird.css("left"));
  var bird_height = parseInt(bird.height());
  var speed = 10;

  // Một số trạng thái trong game
  var go_up = false;
  var score_updated = false;
  var game_over = false;

  // Hàm bắt đầu game
  function playGame() {
    // Realtime cho game
    var the_game = setInterval(function () {
      if (
        collision(bird, pole_1) || // Nếu chú chim va chạm với ống trên
        collision(bird, pole_2) || // Hoặc chú chim va chạm với ông dưới
        parseInt(bird.css("top")) <= 0 || // Hoặc chú chim va chạp với khung game trên
        parseInt(bird.css("top")) > container_height - bird_height // Hoặc chú chim va chạm với khung game dưới
      ) {
        stop_the_game(); // Chạy hàm thua game
      } else {
        // Lấy vị trị hiện tại của ống nước
        var pole_current_position = parseInt(pole.css("right"));
        // Cập nhập điểm khi chú chim vượt qua 1 cặp ống
        if (pole_current_position > container_width - bird_left) {
          if (score_updated === false) {
            score.text(parseInt(score.text()) + 1); // Cộng 1 điểm
            score_updated = true;
          }
        }

        // Kiểm tra các ống đã đi ra khỏi khung game
        if (pole_current_position > container_width) {
          var new_height = parseInt(Math.random() * 100);
          // Tạo chiều cao các ống nước ngẫu nhiên
          pole_1.css("height", pole_initial_height + new_height);
          pole_2.css("height", pole_initial_height - new_height);
          score_updated = false;
          pole_current_position = pole_initial_position; // Gán vị trị hiện tại = vị trí ban đầu của ống nước
        }

        // Di chuyển ống nước
        pole.css("right", pole_current_position + speed);

        // Nếu không điều khiển chú chim bay lên
        if (go_up === false) {
          go_down(); // Hàm di chuyển chú chim rơi xuống
        }
      }
    }, 40);
  }

  // Thay thế sự kiện nhấp chuột bằng sự kiện nhấn phím mũi tên xuống
  $(document).keydown(function (e) {
    if (e.key === "ArrowDown") {
      go_up = setInterval(up, 40); // Khi nhấn mũi tên xuống thì chú chim bay lên
    }
  });

  $(document).keyup(function (e) {
    if (e.key === "ArrowDown") {
      clearInterval(go_up); // Khi nhả phím mũi tên xuống thì dừng bay lên
      go_up = false;
    }
  });

  // Khi nhấn vào Chơi game
  $("#play_btn").click(function () {
    playGame(); // Chạy hàm bắt đầu chơi game
    $(this).hide(); // Ẩn nút chơi game
  });

  // Hàm di chuyển chú chim rơi xuống
  function go_down() {
    bird.css("top", parseInt(bird.css("top")) + 10);
    bird.css("transform", "rotate(50deg)"); // Nghiêng object chú chim 50 độ
  }

  // Hàm di chuyển chú chim bay lên
  function up() {
    bird.css("top", parseInt(bird.css("top")) - 20);
    bird.css("transform", "rotate(-10deg)"); // Nghiêng object chú chim -10 độ
  }

  // Hàm thua game
  function stop_the_game() {
    clearInterval(playGame()); // Xoá realtime chơi game
    game_over = true;
    $("#restart_btn").slideDown(); // Hiện nút chơi lại
  }

  // Khi click vào nút Chơi lại
  $("#restart_btn").click(function () {
    location.reload(); // Tải lại trang
  });

  // Hàm va chạm giữa 2 object
  function collision($div1, $div2) {
    // Khai báo các thông số của 2 object
    var x1 = $div1.offset().left;
    var y1 = $div1.offset().top;
    var h1 = $div1.outerHeight(true);
    var w1 = $div1.outerWidth(true);
    var b1 = y1 + h1;
    var r1 = x1 + w1;

    var x2 = $div2.offset().left;
    var y2 = $div2.offset().top;
    var h2 = $div2.outerHeight(true);
    var w2 = $div2.outerWidth(true);
    var b2 = y2 + h2;
    var r2 = x2 + w2;

    // Nếu xảy ra va chạm
    if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) {
      return false;
    }
    // Ngược lại không va chạm
    else {
      return true;
    }
  }
});

var current_level = 1; // Bắt đầu từ Level 1
var game_interval = 40; // Mốc thời gian Level 1

function updateLevel() {
  var current_score = parseInt(score.text());

  if (current_score >= 50) {
    stop_the_game(true); // Chiến thắng khi đạt 50 điểm
  } else if (current_score >= 40 && current_level < 4) {
    current_level = 4;
    game_interval = 20;
    level.text("Level: 4");
    restartGame();
  } else if (current_score >= 20 && current_level < 3) {
    current_level = 3;
    game_interval = 25;
    level.text("Level: 3");
    restartGame();
  } else if (current_score >= 5 && current_level < 2) {
    current_level = 2;
    game_interval = 30;
    level.text("Level: 2");
    restartGame();
  }
}

function restartGame() {
  clearInterval(playGame()); // Dừng trò chơi hiện tại
  playGame(); // Khởi động lại trò chơi với tốc độ mới
}

// Thay đổi hàm playGame để gọi updateLevel:
function playGame() {
  var the_game = setInterval(function () {
    if (
      collision(bird, pole_1) ||
      collision(bird, pole_2) ||
      parseInt(bird.css("top")) <= 0 ||
      parseInt(bird.css("top")) > container_height - bird_height
    ) {
      stop_the_game();
    } else {
      var pole_current_position = parseInt(pole.css("right"));
      if (pole_current_position > container_width - bird_left) {
        if (!score_updated) {
          score.text(parseInt(score.text()) + 1);
          score_updated = true;
          updateLevel(); // Cập nhật cấp độ khi điểm tăng
        }
      }

      if (pole_current_position > container_width) {
        var new_height = parseInt(Math.random() * 100);
        pole_1.css("height", pole_initial_height + new_height);
        pole_2.css("height", pole_initial_height - new_height);
        score_updated = false;
        pole_current_position = pole_initial_position;
      }

      pole.css("right", pole_current_position + speed);

      if (!go_up) {
        go_down();
      }
    }
  }, game_interval);
}

// Thay đổi hàm stop_the_game để hiển thị thông báo chiến thắng
function stop_the_game(victory = false) {
  clearInterval(playGame());
  game_over = true;
  if (victory) {
    alert("Chiến thắng!");
  }
  $("#restart_btn").slideDown();
}
