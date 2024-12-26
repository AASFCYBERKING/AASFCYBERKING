document.addEventListener('DOMContentLoaded', () => {
    const chatForm = document.getElementById('chatForm');
    const userInput = document.getElementById('userInput');
    const chatMessages = document.getElementById('chatMessages');
    const themeToggle = document.getElementById('themeToggle');
    const clearChat = document.getElementById('clearChat');
    const downloadChat = document.getElementById('downloadChat');
    const importChat = document.getElementById('importChat');
    const speechToText = document.getElementById('speechToText');

    let storedMessages = [];
    let isLoading = false;

    // Initialize Lucide icons
    lucide.createIcons();

    // Load stored messages
    const loadStoredMessages = () => {
        const storedData = localStorage.getItem('kvvnm-chat-data');
        if (storedData) {
            storedMessages = JSON.parse(storedData).messages || [];
            renderMessages();
        }
    };

    // Save messages to local storage
    const saveMessages = () => {
        localStorage.setItem('kvvnm-chat-data', JSON.stringify({ messages: storedMessages }));
    };

    // Render messages
    const renderMessages = () => {
        chatMessages.innerHTML = '';
        storedMessages.forEach(message => {
            const messageElement = createMessageElement(message);
            chatMessages.appendChild(messageElement);
        });
        scrollToBottom();
    };

    // Create message element
    const createMessageElement = (message) => {
        const template = document.getElementById('messageTemplate');
        const messageElement = template.content.cloneNode(true);

        const messageIcon = messageElement.querySelector('.message-icon');
        const messageSender = messageElement.querySelector('.message-sender');
        const messageTimestamp = messageElement.querySelector('.message-timestamp');
        const messageText = messageElement.querySelector('.message-text');
        const messageActions = messageElement.querySelector('.message-actions');

        messageIcon.innerHTML = message.role === 'assistant' ? '<i data-lucide="bot"></i>' : '<i data-lucide="user"></i>';
        messageSender.textContent = message.role === 'assistant' ? 'AI Assistant' : 'You';
        messageTimestamp.textContent = new Date(message.timestamp).toLocaleString();
        messageText.textContent = message.content;

        if (message.role === 'assistant') {
            const regenerateButton = messageActions.querySelector('.regenerate');
            regenerateButton.addEventListener('click', () => regenerateMessage(message));

            const shareButton = messageActions.querySelector('.share');
            shareButton.addEventListener('click', () => shareMessage(message));

            const reportButton = messageActions.querySelector('.report');
            reportButton.addEventListener('click', () => reportMessage(message));

            const dropdownToggle = messageActions.querySelector('.dropdown-toggle');
            const dropdownMenu = messageActions.querySelector('.dropdown-menu');
            dropdownToggle.addEventListener('click', () => dropdownMenu.classList.toggle('show'));

            const copyButton = dropdownMenu.querySelector('.copy');
            copyButton.addEventListener('click', () => copyToClipboard(message.content));

            const speakButton = dropdownMenu.querySelector('.speak');
            speakButton.addEventListener('click', () => speakMessage(message.content));

            const deleteButton = dropdownMenu.querySelector('.delete');
            deleteButton.addEventListener('click', () => deleteMessage(message));
        } else {
            messageActions.style.display = 'none';
        }

        lucide.createIcons(messageElement);
        return messageElement;
    };

    // Send message
    const sendMessage = async (content) => {
        const userMessage = { role: 'user', content, timestamp: Date.now() };
        storedMessages.push(userMessage);
        renderMessages();
        saveMessages();

        isLoading = true;
        renderLoadingIndicator();

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    messages: storedMessages.map(m => ({ role: m.role, content: m.content })),
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            const aiMessage = { role: 'assistant', content: data.content, timestamp: Date.now() };
            storedMessages.push(aiMessage);
            renderMessages();
            saveMessages();
        } catch (error) {
            console.error('Error sending message:', error);
            alert('Failed to send message. Please try again.');
        } finally {
            isLoading = false;
            removeLoadingIndicator();
        }
    };

    // Regenerate message
    const regenerateMessage = (message) => {
        const userMessageIndex = storedMessages.findIndex(m => m.role === 'user' && m.timestamp < message.timestamp);
        if (userMessageIndex !== -1) {
            const userMessage = storedMessages[userMessageIndex];
            storedMessages = storedMessages.slice(0, userMessageIndex + 1);
            sendMessage(userMessage.content);
        }
    };

    // Share message
    const shareMessage = (message) => {
        const shareText = `Check out this AI response from KVVNM AI:

"${message.content}"

Generate your own responses at https://kvvnm-ai.com`;

        if (navigator.share) {
            navigator.share({
                title: 'KVVNM AI Response',
                text: shareText,
            }).catch(console.error);
        } else {
            copyToClipboard(shareText);
        }
    };

    // Report message
    const reportMessage = (message) => {
        console.log('Report message:', message.content);
        alert('Message reported. Thank you for your feedback.');
    };

    // Copy to clipboard
    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text).then(() => {
            alert('Copied to clipboard!');
        }, (err) => {
            console.error('Could not copy text: ', err);
        });
    };

    // Speak message
    const speakMessage = (text) => {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            const voices = speechSynthesis.getVoices();
            utterance.voice = voices.find(voice => voice.name.includes('Male')) || null;
            speechSynthesis.speak(utterance);
        } else {
            alert('Text-to-speech is not supported in your browser.');
        }
    };

    // Delete message
    const deleteMessage = (message) => {
        storedMessages = storedMessages.filter(m => m.timestamp !== message.timestamp);
        renderMessages();
        saveMessages();
    };

    // Render loading indicator
    const renderLoadingIndicator = () => {
        const loadingElement = document.createElement('div');
        loadingElement.className = 'message loading';
        loadingElement.innerHTML = `
            <div class="message-icon"><i data-lucide="loader"></i></div>
            <div class="message-content">
                <div class="message-text">Generating response...</div>
            </div>
        `;
        chatMessages.appendChild(loadingElement);
        lucide.createIcons(loadingElement);
        scrollToBottom();
    };

    // Remove loading indicator
    const removeLoadingIndicator = () => {
        const loadingElement = chatMessages.querySelector('.loading');
        if (loadingElement) {
            loadingElement.remove();
        }
    };

    // Scroll to bottom
    const scrollToBottom = () => {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    };

    // Event listeners
    chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const message = userInput.value.trim();
        if (message && !isLoading) {
            sendMessage(message);
            userInput.value = '';
        }
    });

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
    });

    clearChat.addEventListener('click', () => {
        storedMessages = [];
        renderMessages();
        saveMessages();
    });

    downloadChat.addEventListener('click', () => {
        const chatContent = storedMessages
            .map(m => `${m.role} (${new Date(m.timestamp).toLocaleString()}): ${m.content}`)
            .join('\n\n');
        const blob = new Blob([chatContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'kvvnm-chat-history.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    });

    importChat.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const content = e.target.result;
                const importedMessages = content.split('\n\n').map(messageStr => {
                    const [rolePart, contentPart] = messageStr.split(': ');
                    const [role, timestampStr] = rolePart.split(' (');
                    return {
                        role: role as 'user' | 'assistant',
                        content: contentPart,
                        timestamp: new Date(timestampStr.slice(0, -1)).getTime()
                    };
                });
                storedMessages = importedMessages;
                renderMessages();
                saveMessages();
            };
            reader.readAsText(file);
        }
    });

    speechToText.addEventListener('click', () => {
        if ('webkitSpeechRecognition' in window) {
            const recognition = new webkitSpeechRecognition();
            recognition.continuous = false;
            recognition.interimResults = false;

            recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                userInput.value = transcript;
            };

            recognition.onerror = (event) => {
                console.error('Speech recognition error', event.error);
                alert('Speech recognition failed. Please try again.');
            };

            recognition.start();
        } else {
            alert('Speech recognition is not supported in your browser.');
        }
    });

    // Initialize
    loadStoredMessages();
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }
});
