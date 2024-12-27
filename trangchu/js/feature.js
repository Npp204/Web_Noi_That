import { products } from "../../data.js";
const featureProduct = [products[0], products[5], products[10], products[18]];
const onSaleProduct = [products[1], products[4], products[11], products[19]];
const topRatedProduct = [products[12], products[9], products[6], products[2]];
function formatPrice(price) {
  const number = typeof price === "number" ? price : parseInt(price.toString().replace(/\s/g, ""), 10);
  return number.toLocaleString("vi-VN");
}
$(document).ready(function () {
  function getStars(rating) {
    let stars = "";
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars += '<span class="star fs-5" style="color: rgb(249, 183, 102)">&#9733;</span>'; // Sao vàng
      } else {
        stars += '<span class="star-inactive fs-5">&#9733;</span>'; // Sao xám
      }
    }
    return stars;
  }

  const productFeature = $("#feature-product");
  function displayProducts(products) {
    productFeature.empty();
    products.forEach((product, index) => {
      productFeature.append(`
          <a href="../../chitietsanpham/product.html?id=${product.id}">
          <div>
            <img
              src=${product.image1}
              alt=""
              style="width: 100%; object-fit: cover; aspect-ratio: 1/1"
            />
          </div>
          <div class="p-2">
            <div class="fw-semibold line-claim-2">
             ${product.name}
            </div>
            <div class="text-primary-custom fw-medium">$${formatPrice(product.price)}</div>
            <div class="d-flex gap-1">
            ${getStars(parseInt(product.rating))}
            </div>
          </div>
        </a>`);
    });
  }
  displayProducts(featureProduct);
  // Gắn sự kiện click cho từng mục
  function setActiveAndDisplayProducts(buttonId, products) {
    // Xóa class active khỏi tất cả các nút
    $(".feature-button").removeClass("feature-active");

    // Thêm class active vào nút được click
    $(buttonId).addClass("feature-active");

    // Hiển thị sản phẩm tương ứng
    displayProducts(products);
  }

  // Các sự kiện click cho từng nút
  $("#feature").on("click", function () {
    setActiveAndDisplayProducts("#feature", featureProduct);
  });

  $("#on-sale").on("click", function () {
    setActiveAndDisplayProducts("#on-sale", onSaleProduct);
  });

  $("#top-rated").on("click", function () {
    setActiveAndDisplayProducts("#top-rated", topRatedProduct);
  });
});
