$(document).ready(function () {
  let seconds = 0;
  let minutes = 0;
  let hours = 10; // Bắt đầu từ 10 giờ

  function startTimer() {
    setInterval(function () {
      // Giảm dần thời gian
      seconds--;

      if (seconds < 0) {
        seconds = 59;
        minutes--;
      }

      if (minutes < 0) {
        minutes = 59;
        hours--;
      }

      // Khi hết 10 giờ (0 giờ), reset lại từ 10 giờ
      if (hours < 0) {
        hours = 10;
        minutes = 0;
        seconds = 0;
      }

      // Cập nhật giao diện bằng jQuery
      $("#timer").html(`
          <div>
            <div
              class="bg-danger fw-semibold text-white d-flex justify-content-center align-items-center"
              style="width: 30px; height: 30px"
            >
              ${formatTime(hours)}
            </div>
            <span class="fw-semibold" style="font-size: 12px; color: #fff">hours</span>
          </div>
          <div class="fw-semibold d-flex justify-content-center align-items-center mb-3 text-white">:</div>
          <div class="">
            <div
              class="bg-danger fw-semibold text-white d-flex justify-content-center align-items-center"
              style="width: 30px; height: 30px; margin-left:6px;"
            >
              ${formatTime(minutes)}
            </div>
            <span class="fw-semibold" style="font-size: 12px; color: #fff">minutes</span>
          </div>
          <div class="fw-semibold d-flex justify-content-center align-items-center mb-3 text-white">:</div>
          <div>
            <div
              class="bg-danger fw-semibold text-white d-flex justify-content-center align-items-center"
              style="width: 30px; height: 30px"
            >
              ${formatTime(seconds)}
            </div>
            <span class="fw-semibold" style="font-size: 12px; color: #fff">seconds</span>
          </div>
        `);
    }, 1000);
  }

  function formatTime(time) {
    return time < 10 ? `0${time}` : time;
  }

  startTimer();
});
