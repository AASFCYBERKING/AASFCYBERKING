document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app');
  const darkModeToggle = document.getElementById('darkModeToggle');
  const instagramForm = document.getElementById('instagramForm');
  const googlePlayForm = document.getElementById('googlePlayForm');
  const orderDetailsDialog = document.getElementById('orderDetailsDialog');
  const closeDialog = document.getElementById('closeDialog');
  const generatedText = document.getElementById('generatedText');
  const copyToClipboard = document.getElementById('copyToClipboard');
  const disclaimerModal = document.getElementById('disclaimerModal');
  const closeDisclaimer = document.getElementById('closeDisclaimer');
  const agreeDisclaimer = document.getElementById('agreeDisclaimer');

  let isDarkMode = false;

  function toggleDarkMode() {
    isDarkMode = !isDarkMode;
    document.body.classList.toggle('dark', isDarkMode);
    darkModeToggle.innerHTML = isDarkMode ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
  }

  darkModeToggle.addEventListener('click', toggleDarkMode);

  function calculateInstagramPrice(count) {
    const basePrice = 50;
    const additionalFollowers = Math.max(0, count - 500);
    const additionalCost = Math.ceil(additionalFollowers / 100) * 15;
    return basePrice + additionalCost;
  }

  function calculateGooglePlayPrice(amount) {
    return amount + Math.ceil(amount / 10) * 2;
  }

  function updateInstagramPrice() {
    const followerCount = document.getElementById('follower-count').value;
    const price = calculateInstagramPrice(parseInt(followerCount));
    document.getElementById('instagramPrice').textContent = `Price: ₹${price} (includes service fee)`;
  }

  function updateGooglePlayPrice() {
    const amount = document.getElementById('google-play-amount').value;
    const price = calculateGooglePlayPrice(parseInt(amount));
    document.getElementById('googlePlayPrice').textContent = `Total Price: ₹${price} (includes service fee)`;
  }

  document.getElementById('follower-count').addEventListener('input', updateInstagramPrice);
  document.getElementById('google-play-amount').addEventListener('input', updateGooglePlayPrice);

  function handleInstagramSubmit(e) {
    e.preventDefault();
    const username = document.getElementById('instagram-username').value;
    const followerCount = parseInt(document.getElementById('follower-count').value);
    if (!username) {
      showToast('Please enter your Instagram username', 'error');
      return;
    }
    if (followerCount < 100 || followerCount > 1000) {
      showToast('Follower count must be between 100 and 1000', 'error');
      return;
    }
    const price = calculateInstagramPrice(followerCount);
    const text = `Instagram Followers Order:
Username: @${username}
Followers: ${followerCount}
Price: ₹${price}
Service Fee: ₹${price - followerCount * 0.1}

I agree to all terms and conditions. I am responsible for my actions, and I confirm that this money belongs to me and was not obtained through illegal means.`;
    showOrderDetails(text);
  }

  function handleGooglePlaySubmit(e) {
    e.preventDefault();
    const amount = parseInt(document.getElementById('google-play-amount').value);
    if (amount < 100 || amount > 1000) {
      showToast('Amount must be between ₹100 and ₹1000', 'error');
      return;
    }
    const price = calculateGooglePlayPrice(amount);
    const text = `Google Play Gift Card Order:
Amount: ₹${amount}
Total Price: ₹${price}
Service Fee: ₹${price - amount}

I agree to all terms and conditions. I am responsible for my actions, and I confirm that this money belongs to me and was not obtained through illegal means.`;
    showOrderDetails(text);
  }

  instagramForm.addEventListener('submit', handleInstagramSubmit);
  googlePlayForm.addEventListener('submit', handleGooglePlaySubmit);

  function showOrderDetails(text) {
    generatedText.textContent = text;
    orderDetailsDialog.style.display = 'block';
  }

  closeDialog.addEventListener('click', () => {
    orderDetailsDialog.style.display = 'none';
  });

  copyToClipboard.addEventListener('click', () => {
    navigator.clipboard.writeText(generatedText.textContent);
    showToast('Copied to clipboard!', 'success');
  });

  function showToast(message, type = 'info') {
    Toastify({
      text: message,
      duration: 3000,
      close: true,
      gravity: 'bottom',
      position: 'right',
      backgroundColor: type === 'error' ? '#ef4444' : '#22c55e',
    }).showToast();
  }

  // Show disclaimer on page load
  disclaimerModal.style.display = 'block';

  closeDisclaimer.addEventListener('click', () => {
    disclaimerModal.style.display = 'none';
  });

  agreeDisclaimer.addEventListener('click', () => {
    disclaimerModal.style.display = 'none';
  });

  // Close modals when clicking outside
  window.addEventListener('click', (event) => {
    if (event.target === orderDetailsDialog) {
      orderDetailsDialog.style.display = 'none';
    }
    if (event.target === disclaimerModal) {
      disclaimerModal.style.display = 'none';
    }
  });

  // Initialize prices
  updateInstagramPrice();
  updateGooglePlayPrice();
});
