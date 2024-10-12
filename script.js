// script.js

const lightModeButton = document.getElementById('light-mode');
const darkModeButton = document.getElementById('dark-mode');
const chatContainer = document.querySelector('.chat-container');

lightModeButton.addEventListener('click', () => {
    chatContainer.classList.add('light-mode');
    chatContainer.classList.remove('dark-mode');
});

darkModeButton.addEventListener('click', () => {
    chatContainer.classList.add('dark-mode');
    chatContainer.classList.remove('light-mode');
});
