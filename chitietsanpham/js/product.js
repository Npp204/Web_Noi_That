import { products } from "../../data.js";
import { products as productsData } from "../../data.js";

function formatPrice(price) {
  const number = typeof price === "number" ? price : parseInt(price.toString().replace(/\s/g, ""), 10);
  return number.toLocaleString("vi-VN");
}

$(document).ready(function () {
  $(".product-links-wap a").click(function () {
    var this_src = $(this).children("img").attr("src");
    $("#current_product_img").attr("src", this_src);
    return false;
  });

  $("#btn_minus").click(function () {
    var val = $("#var_value").html();
    val = val == "1" ? val : val - 1;
    $("#var_value").html(val);
    $("product_quantity").val(val);
    return false;
  });
  $("#btn_plus").click(function () {
    var val = $("#var_value").html();
    val++;
    $("#var_value").html(val);
    $("#product_quantity").val(val);
    return false;
  });
  $(".img-button").click(function () {
    var this_img = $(this).parent("#cap_img").children("img").attr("src");
    $(".modal-img").attr("src", this_img);
    return false;
  });
  $(".slide_img").click(function () {
    $(".product-links-wap").find(".img-is-selected").removeClass("img-is-selected");
    $(this).addClass(".img-is-selected");
  });
  $("#tab-item").click(function () {
    $(".nav-tabs").find(".tab-is-selected").removeClass("tab-is-selected");
    $(this).addClass("tab-is-selected");
  });
});

$(document).ready(function () {
  let cart = [];

  // Hàm lưu giỏ hàng vào localStorage
  function saveCartToLocalStorage() {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  // Hàm tải giỏ hàng từ localStorage
  function loadCartFromLocalStorage() {
    const storedCart = localStorage.getItem("cart");
    cart = storedCart ? JSON.parse(storedCart) : [];
  }

  // Hàm cập nhật số lượng sản phẩm trong giỏ
  function updateCartCount() {
    let cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    $(".icon-cart span").text(cartCount > 100 ? "99+" : cartCount);
  }

  // Hàm lấy toàn bộ danh sách sản phẩm
  function getAllProducts() {
    return Object.values(productsData).flat();
  }

  // Hàm thêm sản phẩm vào giỏ
  function addToCart(productId) {
    const product = getAllProducts().find((item) => item.id === parseInt(productId, 10));
    if (!product) return;

    // Kiểm tra sản phẩm có trong giỏ hay chưa
    const cartItem = cart.find((item) => item.id === product.id);

    if (cartItem) {
      // Nếu sản phẩm đã có, tăng số lượng
      cartItem.quantity += parseInt($("#product_quantity").val()) || 1;
    } else {
      // Nếu chưa có, thêm sản phẩm mới
      cart.push({
        ...product,
        quantity: parseInt($("#product_quantity").val()) || 1,
      });
    }

    // Lưu giỏ hàng vào localStorage
    saveCartToLocalStorage();
    updateCartCount();
  }

  // Khởi tạo giỏ hàng khi tải trang
  loadCartFromLocalStorage();
  updateCartCount();

  // Lấy ID sản phẩm từ URL
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");

  // Lấy thông tin sản phẩm
  const product = getAllProducts().find((item) => item.id === parseInt(productId, 10));
  if (product) {
    // Hiển thị thông tin sản phẩm
    $("#current_product_img").attr("src", `../.${product.image1}`);
    $("#name-product").text(`${product.name}`);
    $("#price-product").text(`$${formatPrice(product.price)}`);
    $("#content-name").text(`${product.name}`);
    $("#content-feature").text(`${product.features}`);
    $("#content-description").text(`${product.description}`);
    $("#content-img1").attr("src", `../.${product.image1}`);
    $("#content-img2").attr("src", `../.${product.image2}`);
    $("#content-img3").attr("src", `../.${product.image3}`);
  }

  // Xử lý khi nhấn nút "Thêm vào giỏ hàng"
  $("#add-btn").click(function (e) {
    e.preventDefault();
    if (product) {
      addToCart(product.id);
      alert("Đã thêm vào giỏ hàng!");
    }
  });
});
