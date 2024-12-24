class ChatApp {
    constructor() {
        this.messages = [];
        this.isLoading = false;
        this.recognition = null;
        this.isRecording = false;

        // DOM Elements
        this.elements = {
            app: document.getElementById('app'),
            welcomeScreen: document.getElementById('welcomeScreen'),
            chatContainer: document.getElementById('chatContainer'),
            messageInput: document.getElementById('messageInput'),
            chatForm: document.getElementById('chatForm'),
            sendButton: document.getElementById('sendMessage'),
            voiceButton: document.getElementById('voiceInput'),
            themeToggle: document.getElementById('themeToggle'),
            clearChat: document.getElementById('clearChat'),
            downloadChat: document.getElementById('downloadChat'),
            importChat: document.getElementById('importChat'),
            suggestionBtns: document.querySelectorAll('.suggestion-btn')
        };

        // Templates
        this.templates = {
            message: document.getElementById('messageTemplate'),
            loading: document.getElementById('loadingTemplate')
        };

        this.initializeApp();
    }

    initializeApp() {
        this.setupEventListeners();
        this.loadChatHistory();
        this.setupSpeechRecognition();
        this.loadTheme();
        this.adjustTextareaHeight();
    }

    setupEventListeners() {
        // Form submission
        this.elements.chatForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSubmit();
        });

        // Input handling
        this.elements.messageInput.addEventListener('input', () => {
            this.adjustTextareaHeight();
            this.toggleSendButton();
        });

        this.elements.messageInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.handleSubmit();
            }
        });

        // Voice input
        this.elements.voiceButton.addEventListener('click', () => {
            this.toggleVoiceInput();
        });

        // Theme toggle
        this.elements.themeToggle.addEventListener('click', () => {
            this.toggleTheme();
        });

        // Chat management
        this.elements.clearChat.addEventListener('click', () => {
            this.clearChat();
        });

        this.elements.downloadChat.addEventListener('click', () => {
            this.downloadChat();
        });

        this.elements.importChat.addEventListener('change', (e) => {
            this.importChat(e);
        });

        // Suggestions
        this.elements.suggestionBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                this.handleSuggestion(btn.textContent);
            });
        });

        // Handle message actions delegation
        this.elements.chatContainer.addEventListener('click', (e) => {
            this.handleMessageActions(e);
        });
    }

    async handleSubmit() {
        const message = this.elements.messageInput.value.trim();
        if (!message || this.isLoading) return;

        this.elements.messageInput.value = '';
        this.adjustTextareaHeight();
        this.toggleSendButton();
        await this.sendMessage(message);
    }

    async sendMessage(content) {
        this.hideWelcomeScreen();
        this.addMessage('user', content);
        this.showLoadingIndicator();

        try {
            const response = await this.fetchAIResponse(content);
            this.addMessage('ai', response);
        } catch (error) {
            console.error('Error:', error);
            this.addMessage('ai', 'Sorry, I encountered an error. Please try again.');
        } finally {
            this.hideLoadingIndicator();
        }
    }

    async fetchAIResponse(content) {
        // Simulate API call - Replace with your actual API endpoint
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(`This is a simulated response to: "${content}"`);
            }, 1000);
        });
    }

    addMessage(role, content) {
        const message = {
            role,
            content,
            timestamp: new Date().toISOString()
        };

        this.messages.push(message);
        this.renderMessage(message);
        this.saveChatHistory();
        this.scrollToBottom();
    }

    renderMessage(message) {
        const messageElement = this.templates.message.content.cloneNode(true);
        const messageDiv = messageElement.querySelector('.message');
        
        messageDiv.classList.add(`${message.role}-message`);
        messageDiv.querySelector('.message-content').textContent = message.content;

        if (message.role === 'ai') {
            this.setupMessageActions(messageDiv);
        } else {
            messageDiv.querySelector('.message-actions').remove();
        }

        this.elements.chatContainer.appendChild(messageDiv);
    }

    setupMessageActions(messageDiv) {
        const copyBtn = messageDiv.querySelector('.copy-btn');
        const regenerateBtn = messageDiv.querySelector('.regenerate-btn');
        const reportBtn = messageDiv.querySelector('.report-btn');
        const dropdownToggle = messageDiv.querySelector('.dropdown-toggle');

        copyBtn.addEventListener('click', () => {
            this.copyToClipboard(messageDiv.querySelector('.message-content').textContent);
        });

        regenerateBtn.addEventListener('click', () => {
            const lastUserMessage = this.messages.findLast(m => m.role === 'user');
            if (lastUserMessage) {
                this.sendMessage(lastUserMessage.content);
            }
        });

        reportBtn.addEventListener('click', () => {
            this.reportMessage(messageDiv.querySelector('.message-content').textContent);
        });

        dropdownToggle.addEventListener('click', () => {
            dropdownToggle.closest('.dropdown').classList.toggle('active');
        });
    }

    setupSpeechRecognition() {
        if ('webkitSpeechRecognition' in window) {
            this.recognition = new webkitSpeechRecognition();
            this.recognition.continuous = true;
            this.recognition.interimResults = true;

            this.recognition.onresult = (event) => {
                const transcript = Array.from(event.results)
                    .map(result => result[0].transcript)
                    .join('');
                this.elements.messageInput.value = transcript;
                this.adjustTextareaHeight();
                this.toggleSendButton();
            };

            this.recognition.onerror = () => {
                this.isRecording = false;
                this.updateVoiceButton();
            };

            this.recognition.onend = () => {
                this.isRecording = false;
                this.updateVoiceButton();
            };
        } else {
            this.elements.voiceButton.style.display = 'none';
        }
    }

    toggleVoiceInput() {
        if (!this.recognition) return;

        if (this.isRecording) {
            this.recognition.stop();
        } else {
            this.recognition.start();
        }

        this.isRecording = !this.isRecording;
        this.updateVoiceButton();
    }

    updateVoiceButton() {
        const icon = this.elements.voiceButton.querySelector('i');
        icon.className = this.isRecording ? 'fas fa-stop' : 'fas fa-microphone';
        this.elements.voiceButton.classList.toggle('recording', this.isRecording);
    }

    adjustTextareaHeight() {
        const textarea = this.elements.messageInput;
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';
    }

    toggleSendButton() {
        this.elements.sendButton.disabled = !this.elements.messageInput.value.trim();
    }

    toggleTheme() {
        const isDark = document.body.classList.toggle('dark');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        
        const icon = this.elements.themeToggle.querySelector('i');
        icon.className = `fas fa-${isDark ? 'sun' : 'moon'}`;
    }

    loadTheme() {
        const theme = localStorage.getItem('theme') || 'light';
        if (theme === 'dark') {
            document.body.classList.add('dark');
            this.elements.themeToggle.querySelector('i').className = 'fas fa-sun';
        }
    }

    clearChat() {
        if (confirm('Are you sure you want to clear the chat history?')) {
            this.messages = [];
            this.elements.chatContainer.innerHTML = '';
            localStorage.removeItem('chatHistory');
            this.showWelcomeScreen();
        }
    }

    downloadChat() {
        const data = JSON.stringify(this.messages, null, 2);
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'chat-history.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    importChat(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const messages = JSON.parse(e.target.result);
                    this.messages = messages;
                    this.elements.chatContainer.innerHTML = '';
                    messages.forEach(message => this.renderMessage(message));
                    this.hideWelcomeScreen();
                    this.saveChatHistory();
                } catch (error) {
                    console.error('Error importing chat:', error);
                    alert('Invalid chat history file');
                }
            };
            reader.readAsText(file);
        }
    }

    loadChatHistory() {
        const savedMessages = localStorage.getItem('chatHistory');
        if (savedMessages) {
            this.messages = JSON.parse(savedMessages);
            this.hideWelcomeScreen();
            this.messages.forEach(message => this.renderMessage(message));
        }
    }

    saveChatHistory() {
        localStorage.setItem('chatHistory', JSON.stringify(this.messages));
    }

    showLoadingIndicator() {
        this.isLoading = true;
        const loadingElement = this.templates.loading.content.cloneNode(true);
        this.elements.chatContainer.appendChild(loadingElement);
        this.scrollToBottom();
    }

    hideLoadingIndicator() {
        this.isLoading = false;
        const loadingElement = this.elements.chatContainer.querySelector('.typing-indicator')?.parentElement;
        if (loadingElement) {
            loadingElement.remove();
        }
    }

    async copyToClipboard(text) {
        try {
            await navigator.clipboard.writeText(text);
            this.showToast('Copied to clipboard!');
        } catch (error) {
            console.error('Failed to copy:', error);
            this.showToast('Failed to copy text');
        }
    }

    reportMessage(content) {
        console.log('Reporting message:', content);
        this.showToast('Message reported');
        // Implement your report logic here
    }

    showToast(message) {
        // Simple toast implementation - you might want to use a library
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
    }

    hideWelcomeScreen() {
        this.elements.welcomeScreen.classList.add('hidden');
        this.elements.chatContainer.classList.remove('hidden');
    }

    showWelcomeScreen() {
        this.elements.welcomeScreen.classList.remove('hidden');
        this.elements.chatContainer.classList.add('hidden');
    }

    scrollToBottom() {
        this.elements.chatContainer.scrollTop = this.elements.chatContainer.scrollHeight;
    }

    handleSuggestion(text) {
        this.elements.messageInput.value = text;
        this.handleSubmit();
    }
}

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    new ChatApp();
});
