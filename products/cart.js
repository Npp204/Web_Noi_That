$(document).ready(function () {
  function loadCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    return cart;
  }

  function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  function parseCurrencyString(value) {
    let cleanedValue = value.replace(/[^\d]/g, "");
    return cleanedValue ? parseFloat(cleanedValue) : 0;
  }

  function updateTotal() {
    let subtotal = 0;

    $(".total-price").each(function () {
      let priceText = parseCurrencyString($(this).text());

      if (priceText) {
        subtotal += priceText;
      }
    });
    $("#subtotal").text(subtotal.toLocaleString());

    let shipping = parseFloat($('input[name="shipping"]:checked').val()) || 0;
    // console.log(shipping);
    let total = subtotal + shipping;

    $("#total").text("$" + total.toLocaleString());

    const initialCart = loadCart();
    updateCartCount(initialCart);
    
  }
  function formatPrice(price) {
    const number = typeof price === "number" ? price : parseInt(price.toString().replace(/\s/g, ""), 10);
    return number.toLocaleString("vi-VN");
  }
  function renderCart() {
    const cart = loadCart();
    const $cartItemsContainer = $("#cart-items");
    $cartItemsContainer.empty();

    cart.forEach((item, index) => {
      let itemPrice = item.price;
      let totalPrice = itemPrice * item.quantity;

      const row = `
                    <tr>
                        <td class="flex-column flex-lg-row" style="display: flex;"><img class="ms-0"  style="min-width:auto" src="../${
                          item.image1
                        }" alt="${item.name}" width="50"> <div class="ms-0 ms-lg-3" style="text-align:start">${
        item.name
      } </div> </td>
                        <td style="text-align: start">$${formatPrice(item.price)}</td>
                        <td>
                            <div class="quantity-box">
                                <button class="btn-minus" data-index="${index}">-</button>
                                <input type="text" class="quantity-input" data-index="${index}" value="${
        item.quantity
      }">
                                <button class="btn-plus" data-index="${index}">+</button>
                            </div>
                        </td>
                        <td class="total-price text-warning">$${totalPrice.toLocaleString()}</td>
                        <td><button class="btn-remove" data-index="${index}"><i class="bi bi-x"></i></button></td>
                    </tr>
                `;
      $cartItemsContainer.append(row);
    });

    updateTotal();
  }

  function updateCartCount(cart) {
    let cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (cartCount > 100) {
      cartCount = "99+";
    }
    document.querySelector(".icon-cart span").textContent = cartCount;
  }

  $(document).on("click", ".btn-plus", function () {
    const index = $(this).data("index");
    let cart = loadCart();
    cart[index].quantity += 1;
    saveCart(cart);
    renderCart();
    updateCartCount(cart);
  });

  $(document).on("click", ".btn-minus", function () {
    const index = $(this).data("index");
    let cart = loadCart();
    if (cart[index].quantity > 1) {
      cart[index].quantity -= 1;
    } else {
      cart.splice(index, 1);
    }
    saveCart(cart);
    renderCart();
    updateCartCount(cart);
  });

  $(document).on("click", ".btn-remove", function () {
    const index = $(this).data("index");
    let cart = loadCart();
    cart.splice(index, 1);
    saveCart(cart);
    renderCart();
    updateCartCount(cart);
  });

  $(document).on("change", ".quantity-input", function () {
    const index = $(this).data("index");
    let cart = loadCart();
    const newQuantity = parseInt($(this).val(), 10);

    if (!isNaN(newQuantity) && newQuantity > 0) {
      cart[index].quantity = newQuantity;
      saveCart(cart);
      renderCart();
      updateCartCount(cart);
    } else {
      $(this).val(cart[index].quantity);
    }
  });

  $('input[name="shipping"]').on("change", function () {
    updateTotal();
  });

  function checkout() {
    const cart = loadCart();
    if (cart.length === 0) {
      alert("Giỏ hàng của bạn hiện đang trống!");
      return;
    }

    alert(
      "Thanh toán thành công! Tổng tiền: " +
        $("#total").text() +
        ". Hàng sẽ được vận chuyển đến " +
        $("#address").val() +
        ". Cảm ơn bạn đã mua hàng."
    );

    localStorage.removeItem("cart");
    $("#address").val("");
    $("#freeShipping").prop("checked", true);
    renderCart();
    const cartNew = loadCart();
    updateCartCount(cartNew);
  }

  $("#checkout-button").on("click", function () {
    checkout();
  });

  renderCart();
});
