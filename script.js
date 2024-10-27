const chatContainer = document.getElementById('chatContainer');
const userInput = document.getElementById('userInput');
const chatForm = document.getElementById('chatForm');
const menuButton = document.getElementById('menuButton');
const navbar = document.getElementById('navbar');
const closeNavButton = document.getElementById('closeNavButton');
const reportDialog = document.getElementById('reportDialog');
const submitReportButton = document.getElementById('submitReport');
const cancelReportButton = document.getElementById('cancelReport');
const navButtons = document.querySelectorAll('.nav-button');
const sections = {
    home: document.getElementById('homeSection'),
    about: document.getElementById('aboutSection'),
    contact: document.getElementById('contactSection')
};
const notificationsContainer = document.getElementById('notificationsContainer');
const contactForm = document.getElementById('contactForm');
const welcomeMessage = document.getElementById('welcomeMessage');
const sendButton = document.getElementById('sendButton');
const sendIcon = document.getElementById('sendIcon');
const sendText = document.getElementById('sendText');
const clearHistoryBtn = document.getElementById('clearHistoryBtn');
const clearHistoryModal = document.getElementById('clearHistoryModal');
const modalCloseBtn = document.getElementById('modalCloseBtn');
const modalCancelBtn = document.getElementById('modalCancelBtn');
const modalClearBtn = document.getElementById('modalClearBtn');
const micButton = document.getElementById('micButton');
const micPermissionModal = document.getElementById('micPermissionModal');
const micPermissionAcceptBtn = document.getElementById('micPermissionAcceptBtn');
const micPermissionDeclineBtn = document.getElementById('micPermissionDeclineBtn');

let messages = [];
let conversationHistory = [];
let isGenerating = false;
let activeSection = 'home';
let showWelcome = true;
let currentRequest = null;
let recognition = null;
let isListening = false;

let schoolData = '';

fetch('data.txt')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.text();
    })
    .then(data => {
        schoolData = data;
        console.log(schoolData);
    })
    .catch(error => {
        addNotification('error', `There was a problem with the fetch operation for data: ${error}`);
        console.error('There was a problem with the fetch operation:', error);
    });

function switchSection(sectionName) {
    Object.values(sections).forEach(section => section.classList.add('hidden'));
    sections[sectionName].classList.remove('hidden');
    activeSection = sectionName;
    navbar.classList.add('hidden');
    window.location.hash = sectionName;
}

function updateClearHistoryButton() {
    if (messages.length > 0) {
        clearHistoryBtn.style.display = 'block';
    } else {
        clearHistoryBtn.style.display = 'none';
        showWelcomeMessage();
    }
}

function showWelcomeMessage() {
    welcomeMessage.classList.remove('hidden');
    chatContainer.classList.add('hidden');
    showWelcome = true;
}

function scrollToBottom() {
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

function showModal() {
    clearHistoryModal.classList.add('show');
}

function hideModal() {
    clearHistoryModal.classList.remove('show');
}

function clearHistory() {
    messages = [];
    conversationHistory = [];
    localStorage.removeItem('chatHistory');
    chatContainer.innerHTML = '';
    hideModal();
    addNotification('info', 'Chat history has been cleared.');
    updateClearHistoryButton();
    showWelcomeMessage();
}

function addMessage(role, content) {
    if (showWelcome) {
        welcomeMessage.classList.add('hidden');
        chatContainer.classList.remove('hidden');
        showWelcome = false;
    }
    const messageElement = document.createElement('div');
    messageElement.className = `flex ${role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in-up`;

    const innerDiv = document.createElement('div');
    innerDiv.className = `flex items-start space-x-2 max-w-full ${role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`;

    const avatar = document.createElement('div');
    avatar.className = role === 'user' ? 'user-avatar' : 'ai-avatar';
    avatar.innerHTML = role === 'user' ? '<i class="fas fa-user"></i>' : '<img src="src/dharam.jpg" alt="AI">';

    const messageContent = document.createElement('div');
    messageContent.className = `message-bubble ${role === 'user' ? 'bg-blue-500 text-white' : 'bg-blue-100 text-blue-900'} text-sm md:text-base shadow-md`;

    const contentWrapper = document.createElement('div');
    contentWrapper.className = 'message-content';
    contentWrapper.innerHTML = formatMessage(content);

    messageContent.appendChild(contentWrapper);

    if (role === 'assistant') {
        const actionsDiv = document.createElement('div');
        actionsDiv.className = 'flex mt-2 space-x-2';
        actionsDiv.innerHTML = `
            <button data-action="copy" data-content="${escapeHtml(content)}" class="text-blue-500 hover:text-blue-600 transition-colors duration-300">
                <i class="fas fa-copy"></i>
            </button>
            <button data-action="report" data-content="${escapeHtml(content)}" class="text-blue-500 hover:text-blue-600 transition-colors duration-300">
                <i class="fas fa-flag"></i>
            </button>
            <button data-action="again" data-content="${escapeHtml(content)}" class="text-blue-500 hover:text-blue-600 transition-colors duration-300">
                <i class="fas fa-redo"></i>
            </button>
        `;
        messageContent.appendChild(actionsDiv);
    }

    innerDiv.appendChild(avatar);
    innerDiv.appendChild(messageContent);
    messageElement.appendChild(innerDiv);
    chatContainer.appendChild(messageElement);
    scrollToBottom();
    updateClearHistoryButton();
    conversationHistory.push({ role, content });
    localStorage.setItem('chatHistory', JSON.stringify(conversationHistory));
    messages.push({ role, content });
}

function formatMessage(content) {
    content = content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    content = content.replace(/\*(.*?)\*/g, '<em>$1</em>');
    content = content.replace(/`(.*?)`/g, '<code>$1</code>');
    content = content.replace(/^(#{1,6})\s(.*)$/gm, (match, hashes, text) => `<h${hashes.length}>${text}</h${hashes.length}>`);
    content = content.replace(/^\s*[-*+]\s(.*)$/gm, '<li>$1</li>');
    content = content.replace(/^\d+\.\s(.*)$/gm, '<li>$1</li>');

    const orderedList = content.match(/<li>.*<\/li>/g);
    if (orderedList) {
        content = content.replace(/(<li>.*<\/li>)/s, '<ol>$1</ol>');
    }

    const unorderedList = content.match(/<li>.*<\/li>/g);
    if (unorderedList) {
        content = content.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');
    }

    content = content.replace(/\[([^\]]+)\]$$([^)]+)$$/g, (match, text, url) => {
        return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-blue-500 hover:underline">${text}</a>`;
    });

    const links = content.match(/https?:\/\/[^\s]+/g);
    if (links) {
        links.forEach(link => {
            content += `
            <div class="link-preview">
                <a href="${link}" target="_blank" rel="noopener noreferrer" class="text-blue-500 hover:underline">${link}</a>
            </div>`;
        });
    }

    return content;
}

function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function setThinking(thinking) {
    const existingThinkingElement = chatContainer.querySelector('.thinking-indicator');
    if (thinking) {
        if (!existingThinkingElement) {
            const thinkingElement = document.createElement('div');
            thinkingElement.className = 'flex justify-start animate-fade-in-up thinking-indicator';
            thinkingElement.innerHTML = `
                <div class="flex items-end space-x-2 max-w-[80%]">
                    <div class="w-8 h-8 bg-transparent rounded-full">
                        <img src="src/dharam.jpg" alt="AI" class="ai-logo">
                    </div>
                    <div class="p-3 rounded-lg bg-blue-100 text-sm md:text-base shadow-md">
                        <div class="flex space-x-2">
                            <div class="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                            <div class="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
                            <div class="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style="animation-delay: 0.4s"></div>
                        </div>
                    </div>
                </div>
            `;
            chatContainer.appendChild(thinkingElement);
        }
        setGenerating(true);
    } else {
        if (existingThinkingElement) {
            existingThinkingElement.remove();
        }
        setGenerating(false);
    }
    scrollToBottom();
}

function setGenerating(generating) {
    isGenerating = generating;
    if (generating) {
        sendIcon.className = 'fas fa-stop h-4 w-4 md:mr-2';
        sendText.textContent = 'Stop';
        sendButton.classList.remove('bg-blue-500', 'hover:bg-blue-600');
        sendButton.classList.add('bg-red-500', 'hover:bg-red-600');
    } else {
        sendIcon.className = 'fas fa-paper-plane h-4 w-4 md:mr-2';
        sendText.textContent = 'Send';
        sendButton.classList.remove('bg-red-500', 'hover:bg-red-600');
        sendButton.classList.add('bg-blue-500', 'hover:bg-blue-600');
    }
}

function loadStoredHistory() {
    try {
        const storedHistory = localStorage.getItem('chatHistory');
        if (storedHistory) {
            conversationHistory = JSON.parse(storedHistory);
            conversationHistory.forEach(message => {
                addMessage(message.role, message.content);
            });
            showWelcome = false;
        } else {
            showWelcomeMessage();
        }
    } catch (error) {
        console.error('Error loading chat history:', error);
        localStorage.removeItem('chatHistory');
        showWelcomeMessage();
    }
}

async function sendMessage(message) {
    if (message.trim()) {
        addMessage('user', message);
        setThinking(true);
        try {
            currentRequest = axios.CancelToken.source();
            const response = await axios.post('https://api.qewertyy.dev/models', {
                messages: [
                    { role: "system", content: schoolData },
                    ...conversationHistory.map(msg => ({
                        role: msg.role,
                        content: msg.content
                    })),
                    { role: "user", content: message }
                ],
                model_id: 23
            }, {
                cancelToken: currentRequest.token,
                timeout: 30000 // 30 seconds timeout
            });
            if (response.data.content && response.data.content[0] && response.data.content[0].text) {
                const aiResponse = response.data.content[0].text;
                addMessage('assistant', aiResponse);
            } else {
                throw new Error('Unexpected response structure');
            }
        } catch (error) {
            if (axios.isCancel(error)) {
                console.log('Request canceled:', error.message);
            } else if (error.code === 'ECONNABORTED') {
                addNotification('error', 'Request timed out. Please try again.');
            } else {
                console.error('Error:', error);
                addNotification('error', `Failed to get response. Please try again. ${error}`);
            }
        } finally {
            setThinking(false);
            currentRequest = null;
            scrollToBottom();
        }
    }
}

function addNotification(type, message) {
    const notification = document.createElement('div');
    notification.className = `bg-white p-4 rounded-lg shadow-lg flex items-center space-x-3 ${
        type === 'error' ? 'border-l-4 border-red-500' :
        type === 'report' ? 'border-l-4 border-green-500' :
        type === 'info' ? 'border-l-4 border-yellow-500' :
        'border-l-4 border-blue-500'
    }`;

    const iconClass = type === 'error' ? 'fa-exclamation-triangle text-red-500' :
        type === 'report' ? 'fa-file-alt text-green-500' :
        type === 'info' ? 'fa-info-circle text-yellow-500' :
        'fa-bell text-blue-500';

    notification.innerHTML = `
        <div class="animate-bounce">
            <i class="fas ${iconClass} h-6 w-6"></i>
        </div>
        <div>
            <h3 class="font-semibold ${
                type === 'error' ? 'text-red-800' :
                type === 'report' ? 'text-green-800' :
                type === 'info' ? 'text-yellow-800' :
                'text-blue-800'
            }">${type.charAt(0).toUpperCase() + type.slice(1)}</h3>
            <p class="text-sm ${
                type === 'error' ? 'text-red-600' :
                type === 'report' ? 'text-green-600' :
                type === 'info' ? 'text-yellow-600' :
                'text-blue-600'
            }">${message}</p>
        </div>
        <button onclick="this.parentElement.remove()" class="text-gray-500 hover:${
            type === 'error' ? 'text-red-700' :
            type === 'report' ? 'text-green-700' :
            type === 'info' ? 'text-yellow-700' :
            'text-blue-700'
        }">
            <i class="fas fa-times h-4 w-4"></i>
        </button>
    `;

    notificationsContainer.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 5000);
}

function handleCopy(content) {
    navigator.clipboard.writeText(content).then(() => {
        addNotification('info', 'Response copied to clipboard!');
    }).catch(err => {
        console.error('Failed to copy: ', err);
        addNotification('error', 'Failed to copy content.');
    });
}

function handleReport(content) {
    reportDialog.classList.remove('hidden');
    document.getElementById('reportEmail').value = '';
    document.getElementById('reportProblem').value = '';
    updateReportContent();
}

async function handleAgain(content) {
    const lastUserMessage = messages.filter(m => m.role === 'user').pop();
    if (lastUserMessage) {
        setThinking(true);
        try {
            currentRequest = axios.CancelToken.source();
            const response = await axios.post('https://api.qewertyy.dev/models', {
                messages: [
                    { role: "system", content: schoolData },
                    { role: "user", content: lastUserMessage.content }
                ],
                model_id: 23
            }, {
                cancelToken: currentRequest.token
            });

            if (response.data.content && response.data.content[0] && response.data.content[0].text) {
                const aiResponse = response.data.content[0].text;
                setThinking(false);
                addMessage('assistant', aiResponse);
            } else {
                throw new Error('Unexpected response structure');
            }
        } catch (error) {
            if (axios.isCancel(error)) {
                console.log('Request canceled:', error.message);
            } else {
                console.error('Error:', error);
                addNotification('error', 'Failed to regenerate response. Please try again.');
            }
        } finally {
            setThinking(false);
            currentRequest = null;
            scrollToBottom();
        }
    } else {
        addNotification('error', 'No previous user message found to regenerate.');
    }
}

function updateReportContent() {
    const reportedContent = document.getElementById('reportedContent');
    const lastUserMessage = messages.filter(m => m.role === 'user').pop();
    const lastAIMessage = messages.filter(m => m.role === 'assistant').pop();

    if (lastUserMessage && lastAIMessage) {
        reportedContent.value = `User: ${lastUserMessage.content}\n\nAI: ${lastAIMessage.content}`;
    }
}

async function submitReport() {
    const email = document.getElementById('reportEmail').value;
    const problem = document.getElementById('reportProblem').value;
    const reportedContent = document.getElementById('reportedContent').value;

    if (!email || !problem) {
        addNotification('error', 'Please fill in both email and problem description.');
        return;
    }

    const TOKEN = '8188094426:AAHgwqlzOuNY8VckUrYL5sNkENsu-sCQOFQ';
    const CHAT_ID = '5629305049';
    const reportMessage = `Report from ${email}:\n\nProblem: ${problem}\n\nReported Content:\n${reportedContent}`;
    const url = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

    try {
        const response = await axios.post(url, {
            chat_id: CHAT_ID,
            text: reportMessage,
        });

        if (response.status === 200) {
            addNotification('report', 'Report submitted successfully. Thank you for your feedback!');
            reportDialog.classList.add('hidden');
            document.getElementById('reportEmail').value = '';
            document.getElementById('reportProblem').value = '';
        } else {
            throw new Error('Failed to submit report');
        }
    } catch (error) {
        console.error('Error submitting report:', error);
        addNotification('error', 'Failed to submit report. Please try again.');
    }
}

function initSpeechRecognition() {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
        recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognition.continuous = false;
        recognition.lang = 'en-US';

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            userInput.value = transcript;
        };

        recognition.onend = () => {
            isListening = false;
            micButton.classList.remove('listening');
        };

        recognition.onerror = (event) => {
            console.error('Speech recognition error', event.error);
            isListening = false;
            micButton.classList.remove('listening');
            addNotification('error', 'Speech recognition error. Please try again.');
        };
    } else {
        console.error('Speech recognition not supported');
        micButton.style.display = 'none';
        addNotification('error', 'Speech recognition is not supported in your browser.');
    }
}

function toggleSpeechRecognition() {
    if (!recognition) {
        initSpeechRecognition();
    }

    if (isListening) {
        recognition.stop();
        isListening = false;
        micButton.classList.remove('listening');
    } else {
        recognition.start();
        isListening = true;
        micButton.classList.add('listening');
    }
}

function showMicPermissionModal() {
    micPermissionModal.classList.add('show');
}

function hideMicPermissionModal() {
    micPermissionModal.classList.remove('show');
}

chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = userInput.value.trim();
    if (isGenerating) {
        if (currentRequest) {
            currentRequest.cancel('Operation canceled by the user.');
        }
        setThinking(false);
    } else if (message) {
        sendMessage(message);
        userInput.value = '';
        if (isListening) {
            toggleSpeechRecognition();
        }
    }
});

menuButton.addEventListener('click', () => navbar.classList.remove('hidden'));
closeNavButton.addEventListener('click', () => navbar.classList.add('hidden'));

navButtons.forEach(button => {
    button.addEventListener('click', () => switchSection(button.dataset.section));
});

submitReportButton.addEventListener('click', submitReport);
cancelReportButton.addEventListener('click', () => reportDialog.classList.add('hidden'));

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('contactEmail').value;
    const message = document.getElementById('contactMessage').value;

    if (!email || !message) {
        addNotification('error', 'Please fill in all fields.');
        return;
    }

    const TOKEN = '8188094426:AAHgwqlzOuNY8VckUrYL5sNkENsu-sCQOFQ';
    const CHAT_ID = '5629305049';
    const contactMessage = `&#128236; New contact from ${email}:\n\n&#128172; ${message}`;
    const url = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

    try {
        const response = await axios.post(url, {
            chat_id: CHAT_ID,
            text: contactMessage,
            parse_mode: 'HTML'
        });

        if (response.status === 200) {
            addNotification('info', "Message sent successfully! We'll reply as soon as possible.");
            document.getElementById('contactEmail').value = '';
            document.getElementById('contactMessage').value = '';
        }
    } catch (error) {
        console.error('Error sending message:', error);
        addNotification('error', 'Failed to send message. Please try again later.');
    }
});

window.addEventListener('load', () => {
    setTimeout(() => {
        const loadingScreen = document.getElementById('loadingScreen');
        loadingScreen.style.opacity = '0';
        loadingScreen.style.transition = 'opacity 0.5s ease-out';
        
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 500);

    loadStoredHistory();

    const hash = window.location.hash.slice(1);
    if (sections[hash]) {
        switchSection(hash);
    }

    updateClearHistoryButton();
    scrollToBottom();
    initSpeechRecognition();
});

clearHistoryBtn.addEventListener('click', showModal);
modalCloseBtn.addEventListener('click', hideModal);
modalCancelBtn.addEventListener('click', hideModal);
modalClearBtn.addEventListener('click', clearHistory);

micButton.addEventListener('click', () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(() => {
                toggleSpeechRecognition();
            })
            .catch(() => {
                showMicPermissionModal();
            });
    } else {
        console.error('getUserMedia not supported');
        addNotification('error', 'Speech recognition is not supported in your browser.');
    }
});

micPermissionAcceptBtn.addEventListener('click', () => {
    hideMicPermissionModal();
    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(() => {
            toggleSpeechRecognition();
        })
        .catch((error) => {
            console.error('Error accessing microphone:', error);
            addNotification('error', 'Failed to access microphone. Please check your browser settings.');
        });
});

micPermissionDeclineBtn.addEventListener('click', () => {
    hideMicPermissionModal();
    addNotification('info', 'Microphone access denied. You can still type your messages.');
});

userInput.addEventListener('input', () => {
    if (isListening) {
        toggleSpeechRecognition();
    }
});

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

const debouncedScrollToBottom = debounce(scrollToBottom, 100);

chatContainer.addEventListener('click', (event) => {
    if (event.target.closest('button')) {
        const button = event.target.closest('button');
        const action = button.getAttribute('data-action');
        const content = button.getAttribute('data-content');

        if (action === 'copy') {
            handleCopy(content);
        } else if (action === 'report') {
            handleReport(content);
        } else if (action === 'again') {
            handleAgain(content);
        }
    }
});

window.addEventListener('hashchange', () => {
    const hash = window.location.hash.slice(1);
    if (sections[hash]) {
        switchSection(hash);
    }
});

const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
            debouncedScrollToBottom();
        }
    });
});

observer.observe(chatContainer, { childList: true, subtree: true });

window.addEventListener('resize', debouncedScrollToBottom);

window.addEventListener('load', scrollToBottom);

setTimeout(() => {
    addNotification('welcome', 'Welcome to AI Chat! Feel free to ask any questions.');
}, 2000);
