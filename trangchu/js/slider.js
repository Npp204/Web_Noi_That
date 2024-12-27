$(document).ready(function () {
  // Lấy phần tử có id="slider"
  const slider = $("#slider");

  // Hàm tính toán lại widthSlider
  function updateWidth() {
    return slider.width();
  }
  let widthSlider = updateWidth();

  const preBtn = $("#pre-btn");
  const nextBtn = $("#next-btn");

  // Gán event resize để cập nhật lại widthSlider khi resize
  $(window).resize(function () {
    widthSlider = updateWidth();
  });

  // In ra console để kiểm tra
  preBtn.on("click", function () {
    // Kiểm tra nếu slider đang ở đầu
    if (slider.scrollLeft() > 0) {
      slider.scrollLeft(slider.scrollLeft() - widthSlider);
    }
  });

  nextBtn.on("click", function () {
    // Kiểm tra nếu slider chưa cuộn đến cuối
    if (slider.scrollLeft() < slider[0].scrollWidth - widthSlider) {
      slider.scrollLeft(slider.scrollLeft() + widthSlider);
    }
  });
});
