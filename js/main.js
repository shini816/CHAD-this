document.addEventListener('DOMContentLoaded', () => {
    console.log('GENESIS System Online');

    // Initialize Lucide icons
    if (window.lucide) {
        window.lucide.createIcons();
    }

    // Mobile Menu Toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileBtn && navLinks) {
        mobileBtn.addEventListener('click', () => {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
            if (navLinks.style.display === 'flex') {
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '80px';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.backgroundColor = 'var(--color-surface)';
                navLinks.style.padding = '2rem';
                navLinks.style.borderBottom = '1px solid var(--color-border)';
            }
        });
    }

    // Cart Click
    const cartBtn = document.querySelector('.cart-btn');
    if (cartBtn) {
        cartBtn.addEventListener('click', () => {
            // Check if we are in root or pages folder to determine path
            const isPages = window.location.pathname.includes('/pages/');
            const path = isPages ? 'checkout.html' : 'pages/checkout.html';
            window.location.href = path;
        });
    }

    // Wishlist Click
    const wishlistBtn = document.querySelector('button[aria-label="Wishlist"]');
    if (wishlistBtn) {
        wishlistBtn.addEventListener('click', () => {
            alert('Wishlist feature is coming soon!');
        });
    }

    // Update Cart Count (Mock)
    const updateCartCount = () => {
        const cart = JSON.parse(localStorage.getItem('genesis_cart')) || [];
        const count = cart.reduce((acc, item) => acc + item.quantity, 0);
        const countEl = document.querySelector('.cart-count');
        if (countEl) {
            countEl.textContent = count;
        }
    };

    updateCartCount();
});
