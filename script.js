document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app');
    const content = document.getElementById('content');
    const disclaimer = document.getElementById('disclaimer');
    const agreeButton = document.getElementById('agreeButton');
    const darkModeToggle = document.getElementById('darkModeToggle');
    const instagramForm = document.getElementById('instagramForm');
    const googlePlayForm = document.getElementById('googlePlayForm');
    const followerCountSlider = document.getElementById('follower-count');
    const followerCountValue = document.getElementById('followerCountValue');
    const instagramPriceElement = document.getElementById('instagramPrice');
    const googlePlayPriceElement = document.getElementById('googlePlayPrice');
    const orderDetails = document.getElementById('orderDetails');
    const generatedOrderText = document.getElementById('generatedOrderText');
    const copyOrderTextButton = document.getElementById('copyOrderText');
    const openInstagramButton = document.getElementById('openInstagram');
    const closeOrderDetailsButton = document.getElementById('closeOrderDetails');
    const qrCodeOverlay = document.getElementById('qrCodeOverlay');
    const qrCodeImage = document.getElementById('qrCodeImage');
    const closeQrCodeOverlayButton = document.getElementById('closeQrCodeOverlay');
    const notification = document.getElementById('notification');
    const notificationIcon = document.getElementById('notificationIcon');
    const notificationMessage = document.getElementById('notificationMessage');
    const closeNotificationButton = document.getElementById('closeNotification');

    let isDarkMode = false;
    let instagramUsername = '';
    let followerCount = 100;
    let googlePlayAmount = 100;
    let generatedText = '';
    let showOrderDetails = false;
    let showDisclaimer = true;
    let showContent = false;
    let isQRCodeOverlayOpen = false;

    function showContent() {
        disclaimer.style.display = 'none';
        content.style.display = 'block';
        showDisclaimer = false;
        showContent = true;
    }

    function toggleDarkMode() {
        isDarkMode = !isDarkMode;
        document.documentElement.classList.toggle('dark', isDarkMode);
        darkModeToggle.innerHTML = isDarkMode
            ? '<i data-lucide="moon" class="h-6 w-6"></i>'
            : '<i data-lucide="sun" class="h-6 w-6"></i>';
        lucide.createIcons();
    }

    function calculateInstagramPrice(count) {
        const basePrice = 50;
        const serviceFee = 15;
        return basePrice + serviceFee;
    }

    function calculateGooglePlayPrice(amount) {
        return amount + Math.ceil(amount / 10) * 2;
    }

    function updateInstagramPrice() {
        const price = calculateInstagramPrice(followerCount);
        followerCountValue.textContent = followerCount;
        instagramPriceElement.textContent = `Total Price: ₹${price} (includes ₹15 service fee)`;
    }

    function updateGooglePlayPrice() {
        const price = calculateGooglePlayPrice(googlePlayAmount);
        googlePlayPriceElement.textContent = `Total Price: ₹${price} (includes ₹${price - googlePlayAmount} service fee)`;
    }

    function showNotification(type, message) {
        notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg text-white flex items-center space-x-3 max-w-md notification-${type}`;
        notificationIcon.setAttribute('data-lucide', type === 'success' ? 'check-circle' : type === 'error' ? 'alert-circle' : 'info');
        notificationMessage.textContent = message;
        notification.style.display = 'flex';
        lucide.createIcons();
        setTimeout(() => {
            notification.style.display = 'none';
        }, 3000);
    }

    function handleInstagramSubmit(e) {
        e.preventDefault();
        if (!instagramUsername || followerCount < 100 || followerCount > 1000) {
            showNotification('error', 'Please enter a valid username and follower count (100-1000)');
            return;
        }
        const price = calculateInstagramPrice(followerCount);
        generatedText = `Instagram Followers Order:
Username: @${instagramUsername}
Followers: ${followerCount}
Total Price: ₹${price} (includes ₹15 service fee)

I agree to all terms and conditions. I am responsible for my actions, and I confirm that this money belongs to me and was not obtained through illegal means.`;
        showOrderDetails = true;
        orderDetails.style.display = 'flex';
        generatedOrderText.textContent = generatedText;
        showNotification('success', 'Order generated successfully!');
    }

    function handleGooglePlaySubmit(e) {
        e.preventDefault();
        if (googlePlayAmount < 10 || googlePlayAmount > 1000) {
            showNotification('error', 'Please enter a valid amount (10-1000)');
            return;
        }
        const price = calculateGooglePlayPrice(googlePlayAmount);
        generatedText = `Google Play Gift Card Order:
Amount: ₹${googlePlayAmount}
Total Price: ₹${price} (includes ₹${price - googlePlayAmount} service fee)

I agree to all terms and conditions. I am responsible for my actions, and I confirm that this money belongs to me and was not obtained through illegal means.`;
        showOrderDetails = true;
        orderDetails.style.display = 'flex';
        generatedOrderText.textContent = generatedText;
        showNotification('success', 'Order generated successfully!');
    }

    function copyToClipboard() {
        navigator.clipboard.writeText(generatedText);
        showNotification('success', 'Copied to clipboard!');
    }

    function handleAgreeTerms() {
        showContent();
        showNotification('info', 'Welcome to Cool Digital Services!');
    }

    // Event Listeners
    agreeButton.addEventListener('click', handleAgreeTerms);
    darkModeToggle.addEventListener('click', toggleDarkMode);

    followerCountSlider.addEventListener('input', (e) => {
        followerCount = parseInt(e.target.value);
        updateInstagramPrice();
    });

    document.getElementById('instagram-username').addEventListener('input', (e) => {
        instagramUsername = e.target.value;
    });

    document.getElementById('google-play-amount').addEventListener('input', (e) => {
        googlePlayAmount = Math.max(10, Math.min(1000, parseInt(e.target.value) || 10));
        updateGooglePlayPrice();
    });

    instagramForm.addEventListener('submit', handleInstagramSubmit);
    googlePlayForm.addEventListener('submit', handleGooglePlaySubmit);

    copyOrderTextButton.addEventListener('click', copyToClipboard);

    openInstagramButton.addEventListener('click', () => {
        window.open('https://www.instagram.com/kishoredxd', '_blank');
    });

    closeOrderDetailsButton.addEventListener('click', () => {
        showOrderDetails = false;
        orderDetails.style.display = 'none';
    });

    qrCodeImage.addEventListener('click', () => {
        isQRCodeOverlayOpen = true;
        qrCodeOverlay.style.display = 'flex';
    });

    closeQrCodeOverlayButton.addEventListener('click', () => {
        isQRCodeOverlayOpen = false;
        qrCodeOverlay.style.display = 'none';
    });

    closeNotificationButton.addEventListener('click', () => {
        notification.style.display = 'none';
    });

    // Initialize
    updateInstagramPrice();
    updateGooglePlayPrice();
    lucide.createIcons();

    // Add paw prints
    const pawContainer = document.querySelector('.absolute.inset-0.overflow-hidden.pointer-events-none');
    for (let i = 0; i < 20; i++) {
        const paw = document.createElement('i');
        paw.setAttribute('data-lucide', 'paw-print');
        paw.className = 'absolute text-orange-200 dark:text-gray-700 opacity-10';
        paw.style.top = `${Math.random() * 100}%`;
        paw.style.left = `${Math.random() * 100}%`;
        paw.style.fontSize = `${Math.random() * 30 + 10}px`;
        paw.style.transform = `rotate(${Math.random() * 360}deg)`;
        pawContainer.appendChild(paw);
    }
    lucide.createIcons();
});

