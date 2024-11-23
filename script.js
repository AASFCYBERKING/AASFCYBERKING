document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons
    lucide.createIcons();

    // Dark mode toggle
    const darkModeToggle = document.getElementById('darkModeToggle');
    const sunIcon = `<i data-lucide="sun" class="h-6 w-6"></i>`;
    const moonIcon = `<i data-lucide="moon" class="h-6 w-6"></i>`;

    function toggleDarkMode() {
        document.documentElement.classList.toggle('dark');
        darkModeToggle.innerHTML = document.documentElement.classList.contains('dark') ? sunIcon : moonIcon;
        lucide.createIcons();
    }

    darkModeToggle.addEventListener('click', toggleDarkMode);

    // Instagram form
    const instagramForm = document.getElementById('instagramForm');
    const instagramUsername = document.getElementById('instagram-username');
    const followerCount = document.getElementById('follower-count');
    const followerCountDisplay = document.getElementById('follower-count-display');
    const instagramPrice = document.getElementById('instagram-price');

    function calculateInstagramPrice(count) {
        const basePrice = 50;
        const serviceFee = 15;
        return basePrice + serviceFee;
    }

    followerCount.addEventListener('input', () => {
        followerCountDisplay.textContent = followerCount.value;
        instagramPrice.textContent = calculateInstagramPrice(parseInt(followerCount.value));
    });

    instagramForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!instagramUsername.value || followerCount.value < 100 || followerCount.value > 1000) {
            showNotification('error', 'Please enter a valid username and follower count (100-1000)');
            return;
        }
        const price = calculateInstagramPrice(parseInt(followerCount.value));
        const orderText = `Instagram Followers Order:
Username: @${instagramUsername.value}
Followers: ${followerCount.value}
Total Price: ₹${price} (includes ₹15 service fee)

I agree to all terms and conditions. I am responsible for my actions, and I confirm that this money belongs to me and was not obtained through illegal means.`;
        showOrderDetails(orderText);
        showNotification('success', 'Order generated successfully!');
    });

    // Google Play form
    const googlePlayForm = document.getElementById('googlePlayForm');
    const googlePlayAmount = document.getElementById('google-play-amount');
    const googlePlayPrice = document.getElementById('google-play-price');

    function calculateGooglePlayPrice(amount) {
        return amount + Math.ceil(amount / 10) * 2;
    }

    googlePlayAmount.addEventListener('input', () => {
        const amount = parseInt(googlePlayAmount.value);
        googlePlayPrice.textContent = calculateGooglePlayPrice(amount);
    });

    googlePlayForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const amount = parseInt(googlePlayAmount.value);
        if (amount < 10 || amount > 1000) {
            showNotification('error', 'Please enter a valid amount (10-1000)');
            return;
        }
        const price = calculateGooglePlayPrice(amount);
        const orderText = `Google Play Gift Card Order:
Amount: ₹${amount}
Total Price: ₹${price} (includes ₹${price - amount} service fee)

I agree to all terms and conditions. I am responsible for my actions, and I confirm that this money belongs to me and was not obtained through illegal means.`;
        showOrderDetails(orderText);
        showNotification('success', 'Order generated successfully!');
    });

    // Order details modal
    const orderDetailsModal = document.getElementById('orderDetailsModal');
    const generatedOrderText = document.getElementById('generatedOrderText');
    const closeOrderDetails = document.getElementById('closeOrderDetails');
    const copyOrderText = document.getElementById('copyOrderText');
    const openInstagram = document.getElementById('openInstagram');

    function showOrderDetails(orderText) {
        generatedOrderText.textContent = orderText;
        orderDetailsModal.classList.remove('hidden');
    }

    closeOrderDetails.addEventListener('click', () => {
        orderDetailsModal.classList.add('hidden');
    });

    copyOrderText.addEventListener('click', () => {
        navigator.clipboard.writeText(generatedOrderText.textContent);
        showNotification('success', 'Copied to clipboard!');
    });

    openInstagram.addEventListener('click', () => {
        window.open('https://www.instagram.com/kishoredxd', '_blank');
    });

    // QR Code overlay
    const qrCodeImage = document.getElementById('qrCodeImage');
    const qrCodeOverlay = document.getElementById('qrCodeOverlay');
    const closeQRCodeOverlay = document.getElementById('closeQRCodeOverlay');

    qrCodeImage.addEventListener('click', () => {
        qrCodeOverlay.classList.remove('hidden');
    });

    closeQRCodeOverlay.addEventListener('click', () => {
        qrCodeOverlay.classList.add('hidden');
    });

    // Notification
    const notification = document.getElementById('notification');
    const notificationIcon = document.getElementById('notificationIcon');
    const notificationMessage = document.getElementById('notificationMessage');

    function showNotification(type, message) {
        const iconName = type === 'success' ? 'check-circle' : type === 'error' ? 'alert-circle' : 'info';
        const bgColor = type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : 'bg-blue-500';

        notificationIcon.setAttribute('data-lucide', iconName);
        notificationMessage.textContent = message;
        notification.className = `fixed bottom-4 right-4 p-4 rounded-md shadow-lg ${bgColor} text-white`;
        notification.classList.add('show');
        lucide.createIcons();

        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }
});
