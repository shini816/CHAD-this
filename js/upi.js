// UPI Configuration
// REPLACE THIS WITH YOUR ACTUAL UPI ID
const UPI_ID = "9365725950@ybl";
const PAYEE_NAME = "GENESIS Store";

window.initUPI = (amount) => {
    const upiSection = document.getElementById('upi-section');
    const paymentRadios = document.querySelectorAll('input[name="payment"]');
    const qrContainer = document.getElementById('qrcode');

    // Links
    const linkGeneric = document.getElementById('upi-link-generic');
    const linkGPay = document.getElementById('upi-link-gpay');
    const linkPhonePe = document.getElementById('upi-link-phonepe');
    const linkPaytm = document.getElementById('upi-link-paytm');

    // Generate UPI String
    // Format: upi://pay?pa=<id>&pn=<name>&am=<amount>&cu=INR
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

    // Set Deep Links
    // Note: On web, we can't force a specific app easily without specific schemes (e.g., phonepe://), 
    // but standard upi:// usually lets the OS pick. 
    // Some apps support specific schemes, but standard upi:// is safest.
    upiSection.style.display = 'none';
}
    };

paymentRadios.forEach(radio => {
    radio.addEventListener('change', toggleUPI);
});

// Initial check
toggleUPI();
};
