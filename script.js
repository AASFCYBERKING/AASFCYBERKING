// Get the elements
const certificate = document.getElementById('certificate');
const tomJerryContainer = document.getElementById('tom-jerry-container');
const tomImg = document.getElementById('tom-img');
const jerryImg = document.getElementById('jerry-img');
const signatures = document.getElementById('signatures');
const tomSignature = document.getElementById('tom-signature');
const jerrySignature = document.getElementById('jerry-signature');
const buttons = document.getElementById('buttons');
const response = document.getElementById('response');
const msgTextarea = document.getElementById('msg-txtarea');
const sendMsgBtn = document.getElementById('send-msg-btn');

// Telegram Bot API settings
const telegramBotToken = '6690815586:AAFh5kcrmt7Heggp-Syg66FDlGP9idUzQEI';
const telegramChatId = '5456798232';

// Add event listeners
sendMsgBtn.addEventListener('click', sendMessage);

// Function to send message to Telegram bot
function sendMessage() {
  const message = msgTextarea.value.trim();
  if (message!== '') {
    fetch(`https://api.telegram.org/bot${telegramBotToken}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        chat_id: telegramChatId,
        text: message
      })
    })
   .then(response => response.json())
   .then(data => {
      console.log(data);
      response.innerHTML = `Message sent to Telegram bot!`;
      msgTextarea.value = '';
    })
   .catch(error => {
      console.error(error);
      response.innerHTML = `Error sending message to Telegram bot: ${error.message}`;
    });
  }
}

// Run animation on page load
animateTomJerry();

// Run animation on button click
buttons.addEventListener('click', animateTomJerry);

// Function to animate Tom and Jerry
function animateTomJerry() {
  tomJerryContainer.classList.add('animate');
  setTimeout(() => {
    tomJerryContainer.classList.remove('animate');
  }, 2000);
}
