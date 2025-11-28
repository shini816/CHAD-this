const Cart = {
    get: () => {
        return JSON.parse(localStorage.getItem('genesis_cart')) || [];
    },

    add: (product, quantity = 1) => {
        const cart = Cart.get();
        const existing = cart.find(item => item.id === product.id);

        if (existing) {
            existing.quantity += quantity;
        } else {
            cart.push({ ...product, quantity });
        }

        localStorage.setItem('genesis_cart', JSON.stringify(cart));
        window.dispatchEvent(new Event('cartUpdated'));
    },

    remove: (productId) => {
        let cart = Cart.get();
        cart = cart.filter(item => item.id !== productId);
        localStorage.setItem('genesis_cart', JSON.stringify(cart));
        window.dispatchEvent(new Event('cartUpdated'));
    },

    clear: () => {
        localStorage.removeItem('genesis_cart');
        window.dispatchEvent(new Event('cartUpdated'));
    }
};

// Listen for updates
window.addEventListener('cartUpdated', () => {
    const cart = Cart.get();
    const count = cart.reduce((acc, item) => acc + item.quantity, 0);
    const countEl = document.querySelector('.cart-count');
    if (countEl) {
        countEl.textContent = count;
        // Animate badge
        countEl.style.transform = 'scale(1.2)';
        setTimeout(() => countEl.style.transform = 'scale(1)', 200);
    }
});
