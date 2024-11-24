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

    function showContent() {
        disclaimer.style.display = 'none';
        content.style.display = 'block';
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
        const count = parseInt(followerCountSlider.value);
        const price = calculateInstagramPrice(count);
        followerCountValue.textContent = count;
        instagramPriceElement.textContent = `Total Price: ₹${price} (includes ₹15 service fee)`;
    }

    function updateGooglePlayPrice() {
        const amount = parseInt(document.getElementById('google-play-amount').value);
        const price = calculateGooglePlayPrice(amount);
        googlePlayPriceElement.textContent = `Total Price: ₹${price} (includes ₹${price - amount} service fee)`;
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

    agreeButton.addEventListener('click', () => {
        showContent();
        showNotification('info', 'Welcome to Cool Digital Services!');
    });

    darkModeToggle.addEventListener('click', toggleDarkMode);

    followerCountSlider.addEventListener('input', updateInstagramPrice);

    document.getElementById('google-play-amount').addEventListener('input', updateGooglePlayPrice);

    instagramForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('instagram-username').value;
        const count = parseInt(followerCountSlider.value);
        if (!username || count < 100 || count > 1000) {
            showNotification('error', 'Please enter a valid username and follower count (100-1000)');
            return;
        }
        const price = calculateInstagramPrice(count);
        generatedOrderText.textContent = `Instagram Followers Order:
Username: @${username}
Followers: ${count}
Total Price: ₹${price} (includes ₹15 service fee)

I agree to all terms and conditions. I am responsible for my actions, and I confirm that this money belongs to me and was not obtained through illegal means.`;
        orderDetails.style.display = 'flex';
        showNotification('success', 'Order generated successfully!');
    });

    googlePlayForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const amount = parseInt(document.getElementById('google-play-amount').value);
        if (amount < 10 || amount > 1000) {
            showNotification('error', 'Please enter a valid amount (10-1000)');
            return;
        }
        const price = calculateGooglePlayPrice(amount);
        generatedOrderText.textContent = `Google Play Gift Card Order:
Amount: ₹${amount}
Total Price: ₹${price} (includes ₹${price - amount} service fee)

I agree to all terms and conditions. I am responsible for my actions, and I confirm that this money belongs to me and was not obtained through illegal means.`;
        orderDetails.style.display = 'flex';
        showNotification('success', 'Order generated successfully!');
    });

    copyOrderTextButton.addEventListener('click', () => {
        navigator.clipboard.writeText(generatedOrderText.textContent);
        showNotification('success', 'Copied to clipboard!');
    });

    openInstagramButton.addEventListener('click', () => {
        window.open('https://www.instagram.com/kishoredxd', '_blank');
    });

    closeOrderDetailsButton.addEventListener('click', () => {
        orderDetails.style.display = 'none';
    });

    qrCodeImage.addEventListener('click', () => {
        qrCodeOverlay.style.display = 'flex';
    });

    closeQrCodeOverlayButton.addEventListener('click', () => {
        qrCodeOverlay.style.display = 'none';
    });

    closeNotificationButton.addEventListener('click', () => {
        notification.style.display = 'none';
    });

    // Initialize
    updateInstagramPrice();
    updateGooglePlayPrice();
    lucide.createIcons();
});

