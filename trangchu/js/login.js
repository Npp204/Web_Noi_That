$(document).ready(function () {
  // Đóng modal khi nhấn vào nút close
  $("#close-btn-login").click(function () {
    $("#modal").hide();
  });

  $("#close-btn-register").click(function () {
    $("#modal").hide();
  });

  // Đóng modal khi nhấn ra ngoài phần tử .bg-white
  $("#modal").click(function (e) {
    if (!$(e.target).closest("#wrapper-modal-login").length) {
      $("#modal").hide();
    }
  });

  // Khởi tạo ban đầu
  $("#modal").hide();

  $("#btn-login").click(function () {
    $("#modal").show();
    $("#form-register").hide(); // Hiển thị form đăng ký
    $("#form-login").show();
    $("#form-login").trigger("reset");
    $("#username").focus();
  });
  $("#btn-register").click(function () {
    $("#modal").show();
    $("#form-login").hide();
    $("#form-register").show(); // Hiển thị form đăng ký
    $("#form-register").trigger("reset");

    $("#email").focus();
  });

  $("#btn-signup-nav").click(function () {
    $("#form-login").hide(); // Ẩn form đăng nhập
    $("#form-register").show(); // Hiển thị form đăng ký
    $("#email").focus();
  });

  // Khi click vào nút "Sign In" trong form đăng ký, ẩn form đăng ký và hiển thị form đăng nhập
  $("#btn-signin-nav").click(function () {
    $("#form-register").hide(); // Ẩn form đăng ký
    $("#form-login").show(); // Hiển thị form đăng nhập
    $("#username").focus();
  });

  // Khi có input trong form-login nhận focus
  $("#form-login input").on("focus", function () {
    // Thêm class 'active' vào input đang focus trong form-login
    $(this).addClass("input-login-active");
  });

  // Khi input trong form-login mất focus
  $("#form-login input").on("blur", function () {
    // Xóa class 'active' khỏi input khi mất focus trong form-login
    $(this).removeClass("input-login-active");
  });

  // Khi có input trong form-register nhận focus
  $("#form-register input").on("focus", function () {
    // Thêm class 'active' vào input đang focus trong form-register
    $(this).addClass("input-login-active");
  });

  $("#form-register #email").on("focus", function () {
    // Thêm class 'active' vào input đang focus trong form-register
    $("#error-register-email").text("");
  });

  $("#form-login #username").on("focus", function () {
    // Thêm class 'active' vào input đang focus trong form-register
    $("#error-login-email").text("");
  });

  // Khi input trong form-register mất focus
  $("#form-register input").on("blur", function () {
    // Xóa class 'active' khỏi input khi mất focus trong form-register
    $(this).removeClass("input-login-active");
  });
});
$(document).ready(function () {
  $("#agree-register").change(function () {
    if ($(this).is(":checked")) {
      $("#btn-get-values-register").prop("disabled", false);
    } else {
      $("#btn-get-values-register").prop("disabled", true);
    }
  });
  // Khi nhấn nút "Lấy giá trị"
  $("#btn-get-values-login").click(function (e) {
    e.preventDefault();
    const formDataLogin = getFormValuesLogin(); // Lấy giá trị của form
    if (!formDataLogin) {
      return;
    }
    const newUser = { email: formDataLogin.username, password: formDataLogin.password };
    const accounts = localStorage.getItem("accounts") && JSON.parse(localStorage.getItem("accounts"));
    if (!accounts) {
      $("#error-login-email").text("Thông tin tài khoản hoặc mật khẩu không chính xác");
      return;
    }
    const isExistUser = accounts.find((item) => item.email === newUser.email && item.password === newUser.password);
    if (isExistUser) {
      $("#modal").hide();
      handleLoginSuccess(isExistUser);
      return;
    }
    console.log(accounts, newUser);
    $("#error-login-email").text("Thông tin tài khoản hoặc mật khẩu không chính xác");
  });

  $("#btn-get-values-register").click(function (e) {
    e.preventDefault();
    var formDataRegister = getFormValuesRegister(); // Lấy giá trị của form
    if (!formDataRegister) {
      return;
    }
    const newUser = { email: formDataRegister.email, password: formDataRegister.password, role: 0 };

    const accountRegistered = localStorage.getItem("accounts") && JSON.parse(localStorage.getItem("accounts"));
    if (!accountRegistered) {
      localStorage.setItem("accounts", JSON.stringify([newUser]));
      return;
    }

    const isExistEmail = accountRegistered.find((item) => item.email === formDataRegister.email);
    if (isExistEmail) {
      $("#error-register-email").text("Email đã tốn tại");
      return;
    }
    accountRegistered.push(newUser);
    localStorage.setItem("accounts", JSON.stringify(accountRegistered));
    $("#modal").hide();
    alert("Register success!");
  });

  // Hàm lấy giá trị từ tất cả các input trong form
  function getFormValuesLogin() {
    var formData = {};

    // Lấy giá trị từ các trường input trong form đăng ký
    const username = document.getElementById("username").checkValidity();
    if (!username) {
      $("#error-login-email").text("Vui lòng nhập đúng định dạng email");
      return null;
    }
    formData.username = $("#username").val(); // Lấy giá trị từ input email
    formData.password = $("#password-login").val(); // Lấy giá trị từ input password

    if (!formData.username || !formData.password) {
      return null;
    }
    return formData;
  }

  function getFormValuesRegister() {
    var formData = {};

    // Lấy giá trị từ các trường input trong form đăng ký
    const email = document.getElementById("email").checkValidity();
    if (!email) {
      $("#error-register-email").text("Vui lòng nhập đúng định dạng email");
      return null;
    }
    formData.email = $("#email").val(); // Lấy giá trị từ input email
    formData.password = $("#password-register").val(); // Lấy giá trị từ input password
    if (!formData.email || !formData.password) {
      return null;
    }
    return formData;
  }

  $("#not-login").hide();
  $(".user-avatar").hide();
  function handleLoginSuccess(user) {
    localStorage.setItem("currentUser", JSON.stringify(user));
    $("#not-login").hide();
    $(".user-avatar").show();
    $("#logined").text(user.email.slice(0, 1));
  }

  function firstCheckLogin() {
    const currentUser = localStorage.getItem("currentUser") && JSON.parse(localStorage.getItem("currentUser"));
    const accounts = localStorage.getItem("accounts") && JSON.parse(localStorage.getItem("accounts"));
    const user = accounts?.find((item) => item.email === currentUser.email && item.password === currentUser.password);
    if (!user) {
      $(".user-avatar").hide();
      $("#not-login").show();
    } else {
      $("#not-login").hide();
      $(".user-avatar").show();
      $("#logined").text(user.email.slice(0, 1));
    }
  }
  firstCheckLogin();

  $("#logout").on("click", function () {
    handleLogout();
  });

  function handleLogout() {
    localStorage.setItem("currentUser", "");
    firstCheckLogin();
  }
});
