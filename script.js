document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons
    lucide.createIcons();

    // Dark mode toggle
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;
    const moonIcon = `<i data-lucide="moon" class="h-6 w-6"></i>`;
    const sunIcon = `<i data-lucide="sun" class="h-6 w-6"></i>`;

    function toggleDarkMode() {
        body.classList.toggle('dark');
        darkModeToggle.innerHTML = body.classList.contains('dark') ? sunIcon : moonIcon;
        lucide.createIcons();
    }

    darkModeToggle.addEventListener('click', toggleDarkMode);

    // Disclaimer
    const disclaimer = document.getElementById('disclaimer');
    const agreeButton = document.getElementById('agreeButton');

    function handleAgreeTerms() {
        disclaimer.style.display = 'none';
        showNotification('info', 'Welcome to Cool Digital Services!');
    }

    agreeButton.addEventListener('click', handleAgreeTerms);

    // Instagram form
    const instagramForm = document.getElementById('instagramForm');
    const instagramUsername = document.getElementById('instagram-username');
    const followerCount = document.getElementById('follower-count');
    const followerCountDisplay = document.getElementById('follower-count-display');
    const instagramPrice = document.getElementById('instagram-price');
    const instagramFee = document.getElementById('instagram-fee');

    function calculateInstagramPrice(count) {
        const basePrice = 50;
        const additionalFollowers = Math.max(0, count - 500);
        const additionalCost = Math.ceil(additionalFollowers / 100) * 15;
        return basePrice + additionalCost;
    }

    function updateInstagramPrice() {
        const count = parseInt(followerCount.value);
        followerCountDisplay.textContent = count;
        const price = calculateInstagramPrice(count);
        const fee = price - count * 0.1;
        instagramPrice.textContent = price;
        instagramFee.textContent = fee.toFixed(2);
    }

    followerCount.addEventListener('input', updateInstagramPrice);

    function handleInstagramSubmit(e) {
        e.preventDefault();
        if (!instagramUsername.value || followerCount.value < 100 || followerCount.value > 1000) {
            showNotification('error', 'Please enter a valid username and follower count (100-1000)');
            return;
        }
        const price = parseInt(instagramPrice.textContent);
        const generatedText = `Instagram Followers Order:
Username: @${instagramUsername.value}
Followers: ${followerCount.value}
Total Price: ₹${price} (includes ₹${instagramFee.textContent} service fee)

I agree to all terms and conditions. I am responsible for my actions, and I confirm that this money belongs to me and was not obtained through illegal means.`;
        showOrderDetails(generatedText);
        showNotification('success', 'Order generated successfully!');
    }

    instagramForm.addEventListener('submit', handleInstagramSubmit);

    // Google Play form
    const googlePlayForm = document.getElementById('googlePlayForm');
    const googlePlayAmount = document.getElementById('google-play-amount');
    const googlePlayPrice = document.getElementById('google-play-price');
    const googlePlayFee = document.getElementById('google-play-fee');

    function calculateGooglePlayPrice(amount) {
        return amount + Math.ceil(amount / 10) * 2;
    }

    function updateGooglePlayPrice() {
        const amount = parseInt(googlePlayAmount.value);
        const price = calculateGooglePlayPrice(amount);
        const fee = price - amount;
        googlePlayPrice.textContent = price;
        googlePlayFee.textContent = fee;
    }

    googlePlayAmount.addEventListener('input', updateGooglePlayPrice);

    function handleGooglePlaySubmit(e) {
        e.preventDefault();
        if (googlePlayAmount.value < 10 || googlePlayAmount.value > 1000) {
            showNotification('error', 'Please enter a valid amount (10-1000)');
            return;
        }
        const price = parseInt(googlePlayPrice.textContent);
        const generatedText = `Google Play Gift Card Order:
Amount: ₹${googlePlayAmount.value}
Total Price: ₹${price} (includes ₹${googlePlayFee.textContent} service fee)

I agree to all terms and conditions. I am responsible for my actions, and I confirm that this money belongs to me and was not obtained through illegal means.`;
        showOrderDetails(generatedText);
        showNotification('success', 'Order generated successfully!');
    }

    googlePlayForm.addEventListener('submit', handleGooglePlaySubmit);

    // Order details
    const orderDetails = document.getElementById('orderDetails');
    const generatedOrderText = document.getElementById('generatedOrderText');
    const closeOrderDetails = document.getElementById('closeOrderDetails');
    const copyOrderText = document.getElementById('copyOrderText');
    const openInstagram = document.getElementById('openInstagram');

    function showOrderDetails(text) {
        generatedOrderText.textContent = text;
        orderDetails.style.display = 'flex';
    }

    function closeOrderDetailsModal() {
        orderDetails.style.display = 'none';
    }

    closeOrderDetails.addEventListener('click', closeOrderDetailsModal);

    function copyToClipboard() {
        navigator.clipboard.writeText(generatedOrderText.textContent);
        showNotification('success', 'Copied to clipboard!');
    }

    copyOrderText.addEventListener('click', copyToClipboard);

    function openInstagramProfile() {
        window.open('https://www.instagram.com/kishoredxd', '_blank');
    }

    openInstagram.addEventListener('click', openInstagramProfile);

    // Notification system
    const notification = document.getElementById('notification');
    const notificationMessage = document.getElementById('notificationMessage');
    const closeNotification = document.getElementById('closeNotification');
    let notificationTimeout;

    function showNotification(type, message) {
        const notificationColors = {
            success: 'bg-gradient-to-r from-green-400 to-green-600',
            error: 'bg-gradient-to-r from-red-400 to-red-600',
            info: 'bg-gradient-to-r from-blue-400 to-blue-600',
        };

        const notificationIcons = {
            success: 'check-circle',
            error: 'x-circle',
            info: 'alert-circle',
        };

        notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg text-white flex items-center space-x-3 max-w-md backdrop-blur-sm bg-opacity-90 ${notificationColors[type]}`;
        notificationMessage.textContent = message;
        notification.querySelector('.flex-shrink-0').setAttribute('data-lucide', notificationIcons[type]);
        lucide.createIcons();

        notification.style.display = 'flex';
        gsap.fromTo(notification, 
            { opacity: 0, y: -50, scale: 0.9 }, 
            { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: "back.out(1.7)" }
        );

        clearTimeout(notificationTimeout);
        notificationTimeout = setTimeout(() => {
            gsap.to(notification, { 
                opacity: 0, y: -50, scale: 0.9, duration: 0.3, ease: "back.in(1.7)",
                onComplete: () => { notification.style.display = 'none'; }
            });
        }, 3000);
    }

    function closeNotificationManually() {
        gsap.to(notification, { 
            opacity: 0, y: -50, scale: 0.9, duration: 0.3, ease: "back.in(1.7)",
            onComplete: () => { notification.style.display = 'none'; }
        });
    }

    closeNotification.addEventListener('click', closeNotificationManually);

    // Initialize prices
    updateInstagramPrice();
    updateGooglePlayPrice();
});
