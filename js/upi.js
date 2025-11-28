// UPI Configuration
// REPLACE THIS WITH YOUR ACTUAL UPI ID
const UPI_ID = "9365725950@ybl";
const PAYEE_NAME = "GENESIS Store";

window.initUPI = (amount) => {
    const upiSection = document.getElementById('upi-section');
    const paymentRadios = document.querySelectorAll('input[name="payment"]');
    const qrContainer = document.getElementById('qrcode');
    const upiLinkBtn = document.getElementById('upi-link');

    // Generate UPI String
    // Format: upi://pay?pa=<id>&pn=<name>&am=<amount>&cu=INR
    // Note: Amount must be in INR for most UPI apps. Assuming store prices are USD, 
    // we might need conversion, but for this demo we'll treat the number as is or assume INR.
    // Let's assume the store is in USD but we'll just pass the number. 
    // In a real app, you'd convert USD to INR.
    const upiString = `upi://pay?pa=${UPI_ID}&pn=${encodeURIComponent(PAYEE_NAME)}&am=${amount.toFixed(2)}&cu=INR`;

    // Generate QR Code
    if (qrContainer) {
        qrContainer.innerHTML = ''; // Clear previous
        new QRCode(qrContainer, {
            text: upiString,
            width: 200,
            height: 200,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        });
    }

    // Set Deep Link
    if (upiLinkBtn) {
        upiLinkBtn.href = upiString;
    }

    // Toggle UI based on selection
    const toggleUPI = () => {
        const selected = document.querySelector('input[name="payment"]:checked').value;
        if (selected === 'upi') {
            upiSection.style.display = 'block';
        } else {
            upiSection.style.display = 'none';
        }
    };

    paymentRadios.forEach(radio => {
        radio.addEventListener('change', toggleUPI);
    });

    // Initial check
    toggleUPI();
};
