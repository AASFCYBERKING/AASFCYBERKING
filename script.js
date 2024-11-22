document.addEventListener('DOMContentLoaded', () => {
  const username = "kishoredxd";
  const upiId = "kishoredxd@ybl";
  const instagramProfileName = ".𝐊𝐈𝐒𝐇𝐎𝐑𝐄.👀";
  const instagramBio = "- 𝚜𝚞𝚙, 𝙸'𝚖 𝚊𝚠𝚔𝚠𝚊𝚛𝚍...🥂\nContact for custom solutions!";
  const upiQrCode = "./qrcode.png";

  const app = document.getElementById('app');
  const disclaimer = document.getElementById('disclaimer');
  const agreeButton = document.getElementById('agreeButton');
  const darkModeToggle = document.getElementById('darkModeToggle');
  const instagramForm = document.getElementById('instagramForm');
  const googlePlayForm = document.getElementById('googlePlayForm');
  const orderDetails = document.getElementById('orderDetails');
  const generatedOrderText = document.getElementById('generatedOrderText');
  const copyOrderText = document.getElementById('copyOrderText');
  const openInstagram = document.getElementById('openInstagram');
  const closeOrderDetails = document.getElementById('closeOrderDetails');
  const notification = document.getElementById('notification');
  const notificationMessage = document.getElementById('notificationMessage');
  const closeNotification = document.getElementById('closeNotification');

  let isDarkMode = false;

  function toggleDarkMode() {
    isDarkMode = !isDarkMode;
    document.documentElement.classList.toggle('dark', isDarkMode);
    darkModeToggle.innerHTML = isDarkMode
      ? '<i data-lucide="sun" class="h-6 w-6"></i>'
      : '<i data-lucide="moon" class="h-6 w-6"></i>';
    lucide.createIcons();
  }

  function showNotification(type, message) {
    notification.classList.remove('hidden', 'bg-green-500', 'bg-red-500', 'bg-blue-500');
    notification.classList.add(`bg-${type}-500`);
    notificationMessage.textContent = message;
    notification.classList.remove('hidden');
    setTimeout(() => {
      notification.classList.add('hidden');
    }, 3000);
  }

  function calculateInstagramPrice(count) {
    const basePrice = 50;
    const additionalFollowers = Math.max(0, count - 500);
    const additionalCost = Math.ceil(additionalFollowers / 100) * 15;
    return basePrice + additionalCost;
  }

  function calculateGooglePlayPrice(amount) {
    return amount + Math.ceil(amount / 10) * 2;
  }

  function handleInstagramSubmit(e) {
    e.preventDefault();
    const username = document.getElementById('instagram-username').value;
    const followerCount = parseInt(document.getElementById('follower-count').value);
    if (!username || followerCount < 100 || followerCount > 1000) {
      showNotification('error', 'Please enter a valid username and follower count (100-1000)');
      return;
    }
    const price = calculateInstagramPrice(followerCount);
    generatedOrderText.textContent = `Instagram Followers Order:
Username: @${username}
Followers: ${followerCount}
Total Price: ₹${price} (includes ₹${price - followerCount * 0.1} service fee)

I agree to all terms and conditions. I am responsible for my actions, and I confirm that this money belongs to me and was not obtained through illegal means.`;
    orderDetails.classList.remove('hidden');
    showNotification('success', 'Order generated successfully!');
  }

  function handleGooglePlaySubmit(e) {
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
    orderDetails.classList.remove('hidden');
    showNotification('success', 'Order generated successfully!');
  }

  function copyToClipboard() {
    navigator.clipboard.writeText(generatedOrderText.textContent);
    showNotification('success', 'Copied to clipboard!');
  }

  agreeButton.addEventListener('click', () => {
    disclaimer.classList.add('hidden');
    app.classList.remove('hidden');
    showNotification('info', 'Welcome to Cool Digital Services!');
  });

  darkModeToggle.addEventListener('click', toggleDarkMode);
  instagramForm.addEventListener('submit', handleInstagramSubmit);
  googlePlayForm.addEventListener('submit', handleGooglePlaySubmit);
  copyOrderText.addEventListener('click', copyToClipboard);
  openInstagram.addEventListener('click', () => window.open(`https://www.instagram.com/${username}`, '_blank'));
  closeOrderDetails.addEventListener('click', () => orderDetails.classList.add('hidden'));
  closeNotification.addEventListener('click', () => notification.classList.add('hidden'));

  // Update profile information
  document.querySelector('.card h2.text-xl.sm\\:text-2xl.font-bold').textContent = instagramProfileName;
  document.querySelector('.card p.text-gray-600.dark\\:text-gray-400').textContent = `@${username}`;
  document.querySelector('.card p.mt-2.whitespace-pre-line').textContent = instagramBio;
  document.querySelector('.card img[alt="@kishoredxd"]').src = "later.kh";
  document.querySelector('.bg-gradient-to-br.from-blue-100.to-green-100 img[alt="UPI QR Code"]').src = upiQrCode;
  document.querySelector('.bg-gradient-to-br.from-blue-100.to-green-100 p.text-gray-700.dark\\:text-gray-300.font-semibold').textContent = `UPI ID: ${upiId}`;

  // Initialize Lucide icons
  lucide.createIcons();

  // Initialize follower count slider
  const followerCountSlider = document.getElementById('follower-count');
  const followerCountDisplay = document.getElementById('follower-count-display');
  const instagramPrice = document.getElementById('instagram-price');
  const instagramFee = document.getElementById('instagram-fee');

  followerCountSlider.addEventListener('input', () => {
    const count = parseInt(followerCountSlider.value);
    followerCountDisplay.textContent = count;
    const price = calculateInstagramPrice(count);
    instagramPrice.textContent = price;
    instagramFee.textContent = (price - count * 0.1).toFixed(2);
  });

  // Initialize Google Play amount input
  const googlePlayAmount = document.getElementById('google-play-amount');
  const googlePlayPrice = document.getElementById('google-play-price');
  const googlePlayFee = document.getElementById('google-play-fee');

  googlePlayAmount.addEventListener('input', () => {
    const amount = parseInt(googlePlayAmount.value);
    const price = calculateGooglePlayPrice(amount);
    googlePlayPrice.textContent = price;
    googlePlayFee.textContent = price - amount;
  });
});
