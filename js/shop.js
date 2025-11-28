document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('products-grid');
    const catFilters = document.querySelectorAll('.cat-filter');
    const priceFilters = document.querySelectorAll('input[name="price"]');

    // Check URL params for category
    const urlParams = new URLSearchParams(window.location.search);
    const catParam = urlParams.get('cat');

    if (catParam) {
        catFilters.forEach(cb => {
            if (cb.value === catParam) cb.checked = true;
        });
    }

    function renderProducts() {
        grid.innerHTML = '';

        // Get active filters
        const activeCats = Array.from(catFilters)
            .filter(cb => cb.checked)
            .map(cb => cb.value);

        const activePrice = document.querySelector('input[name="price"]:checked').value;

        // Filter products
        const filtered = window.products.filter(p => {
            // Category match
            const catMatch = activeCats.length === 0 || activeCats.includes(p.category);

            // Price match
            let priceMatch = true;
            if (activePrice === 'under-50') priceMatch = p.price < 50;
            else if (activePrice === '50-100') priceMatch = p.price >= 50 && p.price <= 100;
            else if (activePrice === 'over-100') priceMatch = p.price > 100;

            return catMatch && priceMatch;
        });

        if (filtered.length === 0) {
            grid.innerHTML = '<p class="text-muted">No products found matching your filters.</p>';
            return;
        }

        filtered.forEach(p => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = `
                <a href="product.html?id=${p.id}">
                    <img src="../${p.image}" alt="${p.name}" class="product-image">
                </a>
                <div class="product-info">
                    <div class="product-category">${p.category}</div>
                    <h3 class="product-title"><a href="product.html?id=${p.id}">${p.name}</a></h3>
                    <div class="product-price">₹${p.price.toFixed(2)}</div>
                    <button class="add-btn" onclick="addToCart(${p.id})">Add to Cart</button>
                </div>
            `;
            grid.appendChild(card);
        });

        // Re-init icons if needed (though none in card currently)
    }

    // Event listeners
    catFilters.forEach(cb => cb.addEventListener('change', renderProducts));
    priceFilters.forEach(r => r.addEventListener('change', renderProducts));

    // Initial render
    renderProducts();
});

// Global add to cart wrapper
window.addToCart = (id) => {
    const product = window.products.find(p => p.id === id);
    if (product) {
        Cart.add(product);
        // Optional: Show toast
        alert(`Added ${product.name} to cart!`);
    }
};
