const products = [
    {
        id: 1,
        name: "Cyberpunk Hoodie",
        price: 2999,
        category: "clothes",
        image: "https://placehold.co/600x600/1a1a2e/6A00FF?text=Cyberpunk+Hoodie",
        rating: 4.8,
        isNew: true
    },
    {
        id: 2,
        name: "Neon Tech Pants",
        price: 1999,
        category: "clothes",
        image: "https://placehold.co/600x600/1a1a2e/00F0FF?text=Neon+Pants",
        rating: 4.5,
        isNew: false
    },
    {
        id: 3,
        name: "Holo Visor",
        price: 999,
        category: "accessories",
        image: "https://placehold.co/600x600/1a1a2e/6A00FF?text=Holo+Visor",
        rating: 4.9,
        isNew: true
    },
    {
        id: 4,
        name: "Quantum Sneakers",
        price: 4999,
        category: "clothes",
        image: "https://placehold.co/600x600/1a1a2e/00F0FF?text=Quantum+Sneakers",
        rating: 4.7,
        isNew: true
    },
    {
        id: 5,
        name: "Mecha Figure",
        price: 3499,
        category: "toys",
        image: "https://placehold.co/600x600/1a1a2e/6A00FF?text=Mecha+Figure",
        rating: 5.0,
        isNew: false
    },
    {
        id: 6,
        name: "Neural Interface Case",
        price: 499,
        category: "accessories",
        image: "https://placehold.co/600x600/1a1a2e/00F0FF?text=Neural+Case",
        rating: 4.2,
        isNew: false
    }
];

// Export if using modules, but for simple script tag usage we can just leave it global or attach to window
window.products = products;
