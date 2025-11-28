document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('product-container');
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));

    const product = window.products.find(p => p.id === productId);

    if (!product) {
        container.innerHTML = '<h2>Product not found</h2><a href="shop.html" class="btn btn-primary">Back to Shop</a>';
        return;
    }

    // Render product details
    container.innerHTML = `
        <div class="product-gallery">
            <img src="../${product.image}" alt="${product.name}">
        </div>
        <div class="product-details">
            <div class="product-category" style="color: var(--color-accent); margin-bottom: 10px;">${product.category.toUpperCase()}</div>
            <h1>${product.name}</h1>
            <div class="product-price">$${product.price.toFixed(2)}</div>
            <p class="product-description">
                Experience the future with the ${product.name}. Designed for the modern urban explorer, 
                featuring high-quality materials and a futuristic aesthetic that stands out.
            </p>
            
            ${product.category === 'clothes' ? `
            <div class="variant-group">
                <label>SIZE</label>
                <div class="variant-options">
                    <button class="variant-btn">S</button>
                    <button class="variant-btn active">M</button>
                    <button class="variant-btn">L</button>
                    <button class="variant-btn">XL</button>
                </div>
            </div>
            ` : ''}
            
            <div class="add-to-cart-section">
                <div class="qty-selector">
                    <button class="qty-btn" onclick="updateQty(-1)">-</button>
                    <input type="text" value="1" class="qty-input" id="qty" readonly>
                    <button class="qty-btn" onclick="updateQty(1)">+</button>
                </div>
                <button class="btn btn-primary" onclick="addToCartCurrent()">ADD TO CART</button>
            </div>
        </div>
    `;

    // Variant selection logic
    const variants = document.querySelectorAll('.variant-btn');
    variants.forEach(btn => {
        btn.addEventListener('click', () => {
            variants.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });
});

window.updateQty = (change) => {
    const input = document.getElementById('qty');
    let val = parseInt(input.value) + change;
    if (val < 1) val = 1;
    input.value = val;
};

window.addToCartCurrent = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));
    const product = window.products.find(p => p.id === productId);
    const qty = parseInt(document.getElementById('qty').value);

    if (product) {
        Cart.add(product, qty);
        alert(`Added ${qty} x ${product.name} to cart!`);
    }
};
