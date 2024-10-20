// DOM Elements
const menuButton = document.getElementById('menuButton');
const navbar = document.getElementById('navbar');
const closeNavButton = document.getElementById('closeNavButton');
const mainContent = document.getElementById('mainContent');
const navButtons = document.querySelectorAll('.nav-button');
const reportDialog = document.getElementById('reportDialog');
const submitReportButton = document.getElementById('submitReportButton');
const notificationsContainer = document.getElementById('notifications');

// State
let messages = [];
let activeSection = 'home';
let isThinking = false;
let showWelcome = true;

// Event Listeners
menuButton.addEventListener('click', () => navbar.classList.remove('hidden'));
closeNavButton.addEventListener('click', () => navbar.classList.add('hidden'));
navButtons.forEach(button => {
    button.addEventListener('click', () => {
        activeSection = button.dataset.section;
        navbar.classList.add('hidden');
        renderContent();
    });
});

submitReportButton.addEventListener('click', submitReport);

// Functions
function renderContent() {
    switch (activeSection) {
        case 'about':
            renderAboutSection();
            break;
        case 'contact':
            renderContactSection();
            break;
        default:
            renderChatSection();
    }
}

function renderAboutSection() {
    mainContent.innerHTML = `
        <div class="flex-1 overflow-y-auto p-8 space-y-8 bg-gradient-to-br from-blue-100 via-white to-blue-100">
            <h2 class="text-4xl font-bold mb-6 text-center text-blue-900 animate-fade-in-up">
                Meet Your AI Companion
            </h2>
            <div class="max-w-3xl mx-auto space-y-6 text-blue-800">
                <p class="text-lg leading-relaxed animate-fade-in-up">
                    Welcome to the cutting-edge of educational technology! I'm not just any chatbot – I'm a personalized AI assistant crafted exclusively for the brilliant minds at DHARAM HINDUJA MATRICULATION HIGHER SECONDARY SCHOOL.
                </p>
                <div class="flex items-center justify-center space-x-4 my-8">
                    <i class="fas fa-bolt h-12 w-12 text-blue-600 animate-pulse"></i>
                    <i class="fas fa-code h-12 w-12 text-blue-600 animate-bounce"></i>
                    <i class="fas fa-magic h-12 w-12 text-blue-600 animate-spin"></i>
                </div>
                <p class="text-lg leading-relaxed animate-fade-in-up">
                    Born from the innovative spirit of Harish, a visionary student at DHARAM HINDUJA, I represent the perfect fusion of youthful creativity and artificial intelligence. Harish poured his passion for technology and education into every line of my code, crafting an AI companion that understands the unique needs of his fellow students.
                </p>
                <p class="text-lg leading-relaxed animate-fade-in-up">
                    I'm here to revolutionize your learning experience, providing instant assistance, thought-provoking discussions, and a touch of digital magic to your educational journey. Whether you're tackling complex math problems, exploring the depths of literature, or diving into scientific theories, I'm your round-the-clock study buddy and knowledge enhancer.
                </p>
                <div class="text-center mt-8">
                    <span class="text-2xl font-semibold text-blue-900 animate-pulse">
                        Empowering Minds, One Conversation at a Time
                    </span>
                </div>
            </div>
        </div>
    `;
}

function renderContactSection() {
    mainContent.innerHTML = `
        <div class="flex-1 overflow-y-auto p-8 bg-gradient-to-br from-blue-100  via-white to-blue-100">
            <h2 class="text-3xl font-bold mb-6 text-center text-blue-900 animate-fade-in-up">
                Get in Touch
            </h2>
            <div class="max-w-2xl mx-auto space-y-8">
                <div class="bg-white bg-opacity-50 p-6 rounded-lg shadow-lg backdrop-blur-sm transform hover:scale-105 transition-all duration-300">
                    <h3 class="text-xl font-semibold mb-4 text-blue-800">School Contact Information</h3>
                    <p class="text-blue-700 mb-2">DHARAM HINDUJA MATRICULATION HIGHER SECONDARY SCHOOL</p>
                    <p class="text-blue-700 mb-2">No.19, Poonthottam Street, Tiruvottiyur, Chennai - 600 019, Tamilnadu</p>
                    <p class="text-blue-700 mb-2">Phone: (044) 2572-7553, +91 9025218724</p>
                    <p class="text-blue-700">Email: dharam_hinduja@yahoo.com</p>
                </div>
                <div class="bg-white bg-opacity-50 p-6 rounded-lg shadow-lg backdrop-blur-sm transform hover:scale-105 transition-all duration-300">
                    <h3 class="text-xl font-semibold mb-4 text-blue-800 flex items-center">
                        <i class="fas fa-envelope mr-2"></i>
                        Contact the Developer 🚀
                    </h3>
                    <form id="contactForm" class="space-y-4">
                        <div class="relative">
                            <input type="email" id="contactEmail" placeholder="Your Gmail 📧" class="w-full p-2 pl-10 bg-blue-50 border-blue-200 text-blue-900 focus:ring-2 focus:ring-blue-400 transition-all duration-300 rounded">
                            <i class="fas fa-envelope absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400"></i>
                        </div>
                        <div class="relative">
                            <textarea id="contactMessage" placeholder="Your message 💬" class="w-full p-2 pl-10 pt-8 bg-blue-50 border-blue-200 text-blue-900 focus:ring-2 focus:ring-blue-400 transition-all duration-300 rounded"></textarea>
                            <i class="fas fa-comment absolute left-3 top-8 text-blue-400"></i>
                        </div>
                        <button type="submit" class="w-full bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white font-bold py-2 px-4 rounded-full transition-all duration-300 transform hover:scale-105 flex items-center justify-center">
                            <i class="fas fa-paper-plane mr-2"></i>
                            Send Message 🚀
                        </button>
                    </form>
                </div>
            </div>
        </div>
    `;

    document.getElementById('contactForm').addEventListener('submit', handleContactSend);
}

function renderChatSection() {
    mainContent.innerHTML = `
        <div id="chatMessages" class="flex-1 overflow-y-auto p-4 space-y-6"></div>
        <div class="chat-input">
            <input type="text" id="chatInput" placeholder="Type your message here..." />
            <button id="sendButton">
                <i class="fas fa-paper-plane"></i>
                <span class="hidden md:inline">Send</span>
            </button>
        </div>
    `;

    const chatMessages = document.getElementById('chatMessages');
    const chatInput = document.getElementById('chatInput');
    const sendButton = document.getElementById('sendButton');

    renderMessages();

    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    });

    sendButton.addEventListener('click', handleSend);
}

function renderMessages() {
    const chatMessages = document.getElementById('chatMessages');
    chatMessages.innerHTML = '';

    if (showWelcome) {
        chatMessages.innerHTML = `
            <div class="flex items-center justify-center h-full">
                <h1 class="text-4xl font-bold text-center text-blue-900 animate-pulse">
                    Hello! How can I assist you today?
                </h1>
            </div>
        `;
    } else {
        messages.forEach((message, index) => {
            const messageElement = document.createElement('div');
            messageElement.className = `message-bubble ${message.role === 'user' ? 'user-message' : 'ai-message'} animate-fade-in-up`;
            
            if (message.isThinking) {
                messageElement.innerHTML = `
                    <div class="thinking-dots">
                        <div class="thinking-dot"></div>
                        <div class="thinking-dot"></div>
                        <div class="thinking-dot"></div>
                    </div>
                `;
            } else {
                messageElement.textContent = message.content;
                
                if (message.role === 'assistant') {
                    const actionsElement = document.createElement('div');
                    actionsElement.className = 'flex mt-2 space-x-2';
                    actionsElement.innerHTML = `
                        <button class="text-white hover:text-blue-100 transition-colors duration-300" onclick="handleCopy(${index})">
                            <i class="fas fa-copy"></i>
                        </button>
                        <button class="text-white hover:text-blue-100 transition-colors duration-300" onclick="handleReport(${index})">
                            <i class="fas fa-flag"></i>
                        </button>
                        <button class="text-white hover:text-blue-100 transition-colors duration-300" onclick="handleAgain(${index})">
                            <i class="fas fa-redo"></i>
                        </button>
                    `;
                    messageElement.appendChild(actionsElement);
                }
            }
            
            chatMessages.appendChild(messageElement);
        });
    }

    chatMessages.scrollTop = chatMessages.scrollHeight;
}

async function handleSend() {
    const chatInput = document.getElementById('chatInput');
    const input = chatInput.value.trim();
    
    if (input) {
        showWelcome = false;
        messages.push({ role: 'user', content: input });
        chatInput.value = '';
        renderMessages();

        setThinking(true);
        try {
            const result = await sendPayload(input);
            if (result.content && result.content[0] && result.content[0].text) {
                const aiResponse = result.content[0].text;
                messages.push({ role: 'assistant', content: aiResponse });
            } else {
                console.error("Unexpected response structure:", result);
                addNotification('error', "An error occurred while processing your request.");
            }
        } catch (error) {
            console.error("Error sending message:", error);
            addNotification('error', "An error occurred while sending your message.");
        } finally {
            setThinking(false);
        }
    }
}

function setThinking(thinking) {
    isThinking = thinking;
    if (thinking) {
        messages.push({ role: 'assistant', isThinking: true });
    } else {
        messages = messages.filter(m => !m.isThinking);
    }
    renderMessages();
}

async function sendPayload(prompt) {
    const api_url = "https://api.qewertyy.dev/models";
    const payload = {
        messages: [
            {
                role: "system",
                content: "None" // Replace with actual school_data when available
            },
            {
                role: "user",
                content: prompt
            }
        ],
        model_id: 23
    };

    while (true) {
        try {
            const response = await axios.post(api_url, payload);
            return response.data;
        } catch (error) {
            console.error(error);
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    }
}

async function handleContactSend(e) {
    e.preventDefault();
    const contactEmail = document.getElementById('contactEmail').value;
    const contactMessage = document.getElementById('contactMessage').value;

    if (!contactEmail.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        addNotification('error', '🚫 Please enter a valid email address');
        return;
    }

    const TOKEN = '8188094426:AAHgwqlzOuNY8VckUrYL5sNkENsu-sCQOFQ';
    const CHAT_ID = '5629305049';
    const message = `📬 New contact from ${contactEmail}:\n\n💬 ${contactMessage}`;
    const url = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

    try {
        const response = await axios.post(url, {
            chat_id: CHAT_ID,
            text: message,
        });

        if (response.status === 200) {
            addNotification('welcome', "🎉 Message sent successfully! We'll reply as soon as possible.");
            document.getElementById('contactEmail').value = '';
            document.getElementById('contactMessage').value = '';
        } else {
            throw new Error('Failed to send message');
        }
    } catch (error) {
        addNotification('error', '😕 Failed to send message. Please try again later.');
    }
}

function handleCopy(index) {
    const content = messages[index].content;
    navigator.clipboard.writeText(content);
    addNotification('welcome', 'Response copied to clipboard!');
}

function handleReport(index) {
    const content = messages[index].content;
    document.getElementById('reportDialog').classList.remove('hidden');
}

async function submitReport() {
    const reportEmail = document.getElementById('reportEmail').value;
    const reportProblem = document.getElementById('reportProblem').value;

    if (!reportEmail.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        addNotification('error', 'Please enter a valid email address');
        return;
    }

    const TOKEN = '8188094426:AAHgwqlzOuNY8VckUrYL5sNkENsu-sCQOFQ';
    const CHAT_ID = '5629305049';
    const reportMessage = `Report from ${reportEmail}:\n\nProblem: ${reportProblem}\n\nReported Content: ${reportedContent}`;
    const url = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

    try {
        const response = await axios.post(url, {
            chat_id: CHAT_ID,
            text: reportMessage,
        });

        if (response.status === 200) {
            addNotification('welcome', 'Report submitted successfully. Thank you for your feedback!');
            document.getElementById('reportDialog').classList.add('hidden');
            document.getElementById('reportEmail').value = '';
            document.getElementById('reportProblem').value = '';
        } else {
            throw new Error('Failed to submit report');
        }
    } catch (error) {
        addNotification('error', 'Failed to submit report. Please try again later.');
    }
}

async function handleAgain(index) {
    const userMessage = messages[index - 1].content;
    setThinking(true);
    try {
        const result = await sendPayload(userMessage);
        if (result.content && result.content[0] && result.content[0].text) {
            const aiResponse = result.content[0].text;
            messages[index] = { role: 'assistant', content: aiResponse };
        } else {
            console.error("Unexpected response structure:", result);
            addNotification('error', "An error occurred while processing your request.");
        }
    } catch (error) {
        console.error("Error regenerating response:", error);
        addNotification('error', "An error occurred while regenerating the response.");
    } finally {
        setThinking(false);
    }
}

function addNotification(type, message) {
    const notification = document.createElement('div');
    notification.className = `notification ${type === 'error' ? 'border-l-4 border-red-500' : type === 'welcome' ? 'border-l-4 border-blue-500' : 'border-l-4 border-green-500'}`;
    
    const icon = type === 'error' ? 'fa-exclamation-triangle text-red-500' : 
                 type === 'welcome' ? 'fa-bell text-blue-500' : 
                 'fa-file-alt text-green-500';
    
    notification.innerHTML = `
        <div class="notification-icon">
            <i class="fas ${icon}"></i>
        </div>
        <div class="notification-content">
            <div class="notification-title">${type.charAt(0).toUpperCase() + type.slice(1)}</div>
            <div class="notification-message">${message}</div>
        </div>
        <div class="notification-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </div>
    `;
    
    notificationsContainer.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 5000);
}

// Initial render
renderContent();

// Add welcome notification
setTimeout(() => {
    addNotification('welcome', 'Welcome to AI Chat!');
}, 3000);
