document.querySelectorAll("li").forEach((item) => {
  // Tạo mảng chứa các hiệu ứng chuyển động
  const effects = [
    "animate__bounce",
    "animate__flash",
    "animate__pulse",
    "animate__rubberBand",
    "animate__shakeX",
    "animate__shakeY",
    "animate__headShake",
    "animate__swing",
    "animate__tada",
    "animate__wobble",
    "animate__jello",
    "animate__heartBeat",
    "animate__backInDown",
    "animate__backInLeft",
    "animate__backInRight",
    "animate__backInUp",
  ];

  item.addEventListener("mouseover", () => {
    // Chọn ngẫu nhiên một hiệu ứng từ mảng
    const randomEffect = effects[Math.floor(Math.random() * effects.length)];

    // Thêm lớp hiệu ứng và lớp animate__animated
    item.classList.add("animate__animated", randomEffect);
  });

  item.addEventListener("mouseleave", () => {
    // Loại bỏ tất cả các lớp hiệu ứng
    effects.forEach((effect) => item.classList.remove(effect));
    item.classList.remove("animate__animated");
  });
});
