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

    // Desktop Handling: Redirect to QR Code
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    const handleDesktopClick = (e) => {
        if (!isMobile) {
            e.preventDefault();
            qrContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
            // Visual cue
            qrContainer.style.border = "2px solid #6A00FF";
            qrContainer.style.borderRadius = "10px";
            qrContainer.style.padding = "10px";
            setTimeout(() => {
                qrContainer.style.border = "none";
                qrContainer.style.padding = "0";
            }, 2000);
            alert("On Windows/Desktop, please SCAN the QR code with your mobile app to pay.");
        }
    };

    // Set Deep Links & Listeners
    if (linkGeneric) { linkGeneric.href = upiString; linkGeneric.addEventListener('click', handleDesktopClick); }
    if (linkGPay) { linkGPay.href = upiString; linkGPay.addEventListener('click', handleDesktopClick); }
    if (linkPhonePe) { linkPhonePe.href = upiString; linkPhonePe.addEventListener('click', handleDesktopClick); }
    if (linkPaytm) { linkPaytm.href = upiString; linkPaytm.addEventListener('click', handleDesktopClick); }

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
