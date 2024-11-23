document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const darkModeToggle = document.getElementById('darkModeToggle');
    const instagramForm = document.getElementById('instagramForm');
    const googlePlayForm = document.getElementById('googlePlayForm');
    const orderDetailsModal = document.getElementById('orderDetailsModal');
    const closeOrderDetailsButton = document.getElementById('closeOrderDetails');
    const qrCodeOverlay = document.getElementById('qrCodeOverlay');
    const closeQrCodeOverlay = document.getElementById('closeQrCodeOverlay');
    const copyOrderTextButton = document.getElementById('copyOrderText');
    const disclaimerModal = document.getElementById('disclaimerModal');
    const agreeButton = document.getElementById('agreeButton');

    // Dark mode toggle
    darkModeToggle.addEventListener('click', () => {
        body.classList.toggle('dark');
        const isDarkMode = body.classList.contains('dark');
        localStorage.setItem('darkMode', isDarkMode);
        updateDarkModeIcon(isDarkMode);
    });

    // Check for saved dark mode preference
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode === 'true') {
        body.classList.add('dark');
        updateDarkModeIcon(true);
    }

    function updateDarkModeIcon(isDarkMode) {
        darkModeToggle.innerHTML = isDarkMode 
            ? '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" /></svg>'
            : '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" /></svg>';
    }

    // Instagram form submission
    instagramForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('instagramUsername').value;
        const followerCount = document.getElementById('followerCount').value;
        if (!username || followerCount < 100 || followerCount > 1000) {
            showNotification('error', 'Please enter a valid username and follower count (100-1000)');
            return;
        }
        const price = calculateInstagramPrice(followerCount);
        const orderText = generateOrderText('Instagram', username, followerCount, price);
        showOrderDetails(orderText);
        showNotification('success', 'Order generated successfully!');
    });

    // Google Play form submission
    googlePlayForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const amount = document.getElementById('googlePlayAmount').value;
        if (amount < 10 || amount > 1000) {
            showNotification('error', 'Please enter a valid amount (10-1000)');
            return;
        }
        const price = calculateGooglePlayPrice(amount);
        const orderText = generateOrderText('Google Play', null, amount, price);
        showOrderDetails(orderText);
        showNotification('success', 'Order generated successfully!');
    });

    // Helper functions
    function calculateInstagramPrice(count) {
        const basePrice = 50;
        const additionalFollowers = Math.max(0, count - 500);
        const additionalCost = Math.ceil(additionalFollowers / 100) * 15;
        return basePrice + additionalCost;
    }

    function calculateGooglePlayPrice(amount) {
        return amount + Math.ceil(amount / 10) * 2;
    }

    function generateOrderText(type, username, amount, price) {
        const serviceFee = price - amount;
        let text = `${type} Order:\n`;
        if (type === 'Instagram') {
            text += `Username: @${username}\n`;
            text += `Followers: ${amount}\n`;
        } else {
            text += `Amount: ₹${amount}\n`;
        }
        text += `Total Price: ₹${price} (includes ₹${serviceFee} service fee)\n\n`;
        text += "I agree to all terms and conditions. I am responsible for my actions, and I confirm that this money belongs to me and was not obtained through illegal means.";
        return text;
    }

    function showOrderDetails(orderText) {
        document.getElementById('generatedOrderText').textContent = orderText;
        orderDetailsModal.classList.remove('hidden');
    }

    // Close order details modal
    closeOrderDetailsButton.addEventListener('click', () => {
        orderDetailsModal.classList.add('hidden');
    });

    // Copy order text to clipboard
    copyOrderTextButton.addEventListener('click', () => {
        const orderText = document.getElementById('generatedOrderText').textContent;
        navigator.clipboard.writeText(orderText)
            .then(() => showNotification('success', 'Copied to clipboard!'))
            .catch(() => showNotification('error', 'Failed to copy to clipboard'));
    });

    // QR Code overlay
    document.getElementById('openQrCodeOverlay').addEventListener('click', () => {
        qrCodeOverlay.classList.remove('hidden');
    });

    closeQrCodeOverlay.addEventListener('click', () => {
        qrCodeOverlay.classList.add('hidden');
    });

    // Notification system
    function showNotification(type, message) {
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg ${getNotificationColor(type)} text-white flex items-center space-x-3 max-w-md`;
        notification.innerHTML = `
            ${getNotificationIcon(type)}
            <p class="flex-grow">${message}</p>
            <button class="text-white hover:text-gray-200 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
            </button>
        `;

        document.body.appendChild(notification);

        notification.querySelector('button').addEventListener('click', () => {
            notification.remove();
        });

        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    function getNotificationColor(type) {
        switch (type) {
            case 'success': return 'bg-green-500';
            case 'error': return 'bg-red-500';
            case 'info': return 'bg-blue-500';
            default: return 'bg-gray-500';
        }
    }

    function getNotificationIcon(type) {
        switch (type) {
            case 'success':
                return '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>';
            case 'error':
                return '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>';
            case 'info':
                return '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>';
            default:
                return '';
        }
    }

    // Disclaimer modal
    agreeButton.addEventListener('click', () => {
        disclaimerModal.classList.add('hidden');
        document.getElementById('mainContent').classList.remove('hidden');
        showNotification('info', 'Welcome to Cool Digital Services!');
    });

    // Follower count slider
    const followerCountSlider = document.getElementById('followerCountSlider');
    const followerCountDisplay = document.getElementById('followerCountDisplay');
    const instagramPriceDisplay = document.getElementById('instagramPriceDisplay');

    followerCountSlider.addEventListener('input', (e) => {
        const count = e.target.value;
        followerCountDisplay.textContent = count;
        const price = calculateInstagramPrice(count);
        instagramPriceDisplay.textContent = `₹${price} (includes ₹${price - count * 0.1} service fee)`;
    });

    // Google Play amount input
    const googlePlayAmountInput = document.getElementById('googlePlayAmount');
    const googlePlayPriceDisplay = document.getElementById('googlePlayPriceDisplay');

    googlePlayAmountInput.addEventListener('input', (e) => {
        const amount = parseInt(e.target.value) || 0;
        const price = calculateGooglePlayPrice(amount);
        googlePlayPriceDisplay.textContent = `₹${price} (includes ₹${price - amount} service fee)`;
    });
});

