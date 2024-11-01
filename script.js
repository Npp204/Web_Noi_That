const itemsPerPage = 9;
let currentPage = 1;
let productsData = {};
let currentCategory = 'all'; 
let cart = [];
let couponDiscount = 0;

document.querySelector('.icon-cart').addEventListener('click', () => {
    document.body.classList.toggle('showCart');
});


function fetchProductsData() {
    return fetch('data.json')
        .then(response => response.json())
        .then(data => {
            productsData = data.products;
            updatePageContent(); 
        })
        .catch(error => console.error('Error loading the JSON file:', error));
}


function getAllProducts() {
    const allProducts = Object.values(productsData).flat();

    for (let i = allProducts.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [allProducts[i], allProducts[j]] = [allProducts[j], allProducts[i]];
    }

    return allProducts;
}

function parseCurrencyString(value) {
    let cleanedValue = value.replace(/[^\d]/g, ''); 
    return cleanedValue ? parseFloat(cleanedValue) : 0; 
}

function sortByPriceAsc(products) {

    return products.sort((a, b) => parseCurrencyString(a.price) - parseCurrencyString(b.price));
}


function sortByPriceDesc(products) {
    return products.sort((a, b) => parseCurrencyString(b.price) - parseCurrencyString(a.price));
}


function sortByNameAsc(products) {
    return products.sort((a, b) => a.name.localeCompare(b.name));
}


function sortByNameDesc(products) {
    return products.sort((a, b) => b.name.localeCompare(a.name));
}

function displayProducts(products) {
    const productList = $("#product-list");
    productList.empty();

    products.forEach(product => {
        productList.append(`
            <div class="col">
                <div class="product-card">
                    <img src="${product.image}" class="product-image" alt="${product.name}">
                    <div class="product-info">
                        <h4>${product.name}</h4>                                    
                        <p class="price">${product.price} VNĐ</p>    
                        <div class="rating">
                            ${getStars(product.rating)}
                        </div>    
                    </div>
                    <div class="button-group">  
                        <button class="add-to-cart" onclick="addToCart(${product.id})"><i class="bi bi-cart"></i></button>
                        <button class="view-details"> <a href="chitiet.html"><i class="bi bi-eye"></i></a> </button>  
                    </div>
                </div>
            </div>
        `);
    });
}

function getStars(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars += '<span class="star">&#9733;</span>'; // Sao vàng
        } else {
            stars += '<span class="star-inactive">&#9733;</span>'; // Sao xám
        }
    }
    return stars;
}

function displayPaginatedProducts(products, page) {
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedProducts = products.slice(start, end);

    displayProducts(paginatedProducts);
}

function setupPagination(totalItems) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const paginationContainer = $(".pagination");
    paginationContainer.empty();

    
    paginationContainer.append(`
        <li class="page-item">
            <button class="prev-page" aria-label="Previous" ${currentPage === 1 ? 'disabled' : ''}>
                &laquo;
            </button>
        </li>
    `);

    
    for (let i = 1; i <= totalPages; i++) {
        paginationContainer.append(`
            <li class="page-item ${i === currentPage ? 'active' : ''}">
                <a class="page-link" href="#">${i}</a>
            </li>
        `);
    }

    
    paginationContainer.append(`
        <li class="page-item">
            <button class="next-page" aria-label="Next" ${currentPage === totalPages ? 'disabled' : ''}>
                &raquo;
            </button>
        </li>
    `);

    
    $(".page-link").click(function(e) {
        e.preventDefault();
        const page = parseInt($(this).text());
        currentPage = page;
        updatePageContent();
    });

    $(".prev-page").click(function() {
        if (currentPage > 1) {
            currentPage--;
            updatePageContent();
        }
    });

    $(".next-page").click(function() {
        if (currentPage < totalPages) {
            currentPage++;
            updatePageContent();
        }
    });
}

function updatePageContent() {
    let selectedProducts = currentCategory === 'all' ? getAllProducts() : productsData[currentCategory] || [];

    const sortOption = document.getElementById('sort-options').value;

    switch (sortOption) {
        case 'price-asc':
            selectedProducts = sortByPriceAsc(selectedProducts);
            break;
        case 'price-desc':
            selectedProducts = sortByPriceDesc(selectedProducts);
            break;
        case 'name-asc':
            selectedProducts = sortByNameAsc(selectedProducts);
            break;
        case 'name-desc':
            selectedProducts = sortByNameDesc(selectedProducts);
            break;
        default:
            
            break;
    }

    displayPaginatedProducts(selectedProducts, currentPage);
    setupPagination(selectedProducts.length);
}

$(document).ready(function() {
    // Fetch data from external JSON file
    fetchProductsData();

    // Category filter event listener
    $(".category-item").click(function() {
        $(".category-item").removeClass("active");
        $(this).addClass("active");
        currentCategory = $(this).data('category');
        currentPage = 1; // Reset to first page
        updatePageContent();
    });

    // Event listener for sort options
    $("#sort-options").change(function() {
        currentPage = 1; // Reset to first page
        updatePageContent();
    });
});


function loadCartFromLocalStorage() {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
        cart = JSON.parse(storedCart);
    } else {
        cart = [];
    }
}


function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function addToCart(productId) {
    const product = getAllProducts().find(item => item.id === productId); 
    const cartItem = cart.find(item => item.id === productId);
    
    if (cartItem) {
        cartItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    saveCartToLocalStorage();
    updateCartCount();
    renderCart();
}

function updateCartCount() {
    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.querySelector('.icon-cart span').textContent = cartCount;
}

window.onload = function() {
    loadCartFromLocalStorage(); 
    updateCartCount();
    renderCart();
};
