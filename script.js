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
const notificationsContainer = document.getElementById('notifications');
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

let messages = [];
let conversationHistory = [];
let schoolData = `
You are a personalized chatbot created for Dharam Hinduja Matriculation Higher Secondary School, committed to providing smart, specific, and user-friendly responses. You will answer questions related to the school while ensuring your replies are concise and relevant, avoiding unnecessary details or answering unrelated questions. You are here to help and will strive to continuously improve your performance based on user feedback.Our School Located at No. 19, Poonthottam Street, Tiruvottiyur, Chennai - 600 019, our school can be reached at dharam_hinduja@yahoo.com or by phone at (044) 2572-7553 and +91 9025218724.
Our History and Vision
Established in 1994 by Ashok Leyland, our school was founded with the goal of providing quality education to the children of its employees and the local community. Today, we have grown into one of the best schools in Thiruvottiyur, focusing on academic excellence and extracurricular activities. Our director, N R Sarala, believes that teachers play a vital role in shaping young minds and that they are a bundle of talent who know how to work more with less.
Infrastructure and Facilities
Our school boasts state-of-the-art infrastructure, including smart classes, fully equipped laboratories, a playground, and a basketball court. We strive to provide a conducive learning environment that fosters growth and development.
Mission and Vision
Our mission is to empower learners in thinking, questioning, and problem-solving, while our vision is to cultivate young minds. We aim to equip our students with the necessary knowledge, skills, and values to succeed in life.
`;
let isGenerating = false;
let activeSection = 'home';
let showWelcome = true;
let currentRequest = null;

function switchSection(sectionName) {
    Object.values(sections).forEach(section => section.classList.add('hidden'));
    sections[sectionName].classList.remove('hidden');
    activeSection = sectionName;
    navbar.classList.add('hidden');
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
}

clearHistoryBtn.addEventListener('click', showModal);
modalCloseBtn.addEventListener('click', hideModal);
modalCancelBtn.addEventListener('click', hideModal);
modalClearBtn.addEventListener('click', clearHistory);

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
    conversationHistory.push({ role, content });
    localStorage.setItem('chatHistory', JSON.stringify(conversationHistory))
    messages.push({ role, content });
}

window.addEventListener('load', () => {
    const storedHistory = localStorage.getItem('chatHistory');
    if (storedHistory) {
        conversationHistory = JSON.parse(storedHistory);
        conversationHistory.forEach(message => {
            addMessage(message.role, message.content);
        });
    }
});

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
            const linkPreview = `
                <div class="link-preview">
                    <a href="${link}" target="_blank" rel="noopener noreferrer" class="text-blue-500 hover:underline">${link}</a>
                    <p class="text-sm text-gray-500 mt-1">Link preview placeholder</p>
                </div>
            `;
            content = content.replace(link, linkPreview);
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
    const typingIndicator = document.getElementById('typingIndicator');
    if (thinking) {
        if (!typingIndicator) {
            const indicator = document.createElement('div');
            indicator.id = 'typingIndicator';
            indicator.className = 'typing-indicator animate-pulse';
            indicator.innerHTML = '<span></span><span></span><span></span>';
            chatContainer.appendChild(indicator);
        }
    } else {
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }
    scrollToBottom();
}

function setGenerating(generating) {
    isGenerating = generating;
    userInput.disabled = generating;
    sendButton.disabled = generating;
    if (generating) {
        sendIcon.classList.add('animate-spin');
        sendText.textContent = 'Generating...';
    } else {
        sendIcon.classList.remove('animate-spin');
        sendText.textContent = 'Send';
    }
}

function scrollToBottom() {
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

async function sendMessage(message) {
    addMessage('user', message);
    setThinking(true);
    setGenerating(true);
    
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer sk-Aw5Ue5Ue5Ue5Ue5Ue5Ue5T3BlbkFJYwYwYwYwYwYwYwYwYw'
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [
                    { role: 'system', content: schoolData },
                    ...messages.map(msg => ({ role: msg.role, content: msg.content })),
                    { role: 'user', content: message }
                ]
            })
        });
        
        if (!response.ok) {
            throw new Error('Failed to get response from AI');
        }
        
        const data = await response.json();
        const aiResponse = data.choices[0].message.content;
        addMessage('assistant', aiResponse);
    } catch (error) {
        console.error('Error:', error);
        addMessage('assistant', 'I apologize, but I encountered an error while processing your request. Please try again later.');
    } finally {
        setThinking(false);
        setGenerating(false);
    }
}

function addNotification(type, message) {
    const notification = document.createElement('div');
    notification.className = `p-4 rounded-md shadow-md ${type === 'welcome' ? 'bg-blue-500 text-white' : 'bg-white text-blue-900'} animate-fade-in-up`;
    notification.textContent = message;
    notificationsContainer.appendChild(notification);
    setTimeout(() => {
        notification.classList.add('animate-fade-out');
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 5000);
}

function handleCopy(content) {
    navigator.clipboard.writeText(content).then(() => {
        addNotification('info', 'Content copied to clipboard!');
    }).catch(err => {
        console.error('Failed to copy text: ', err);
        addNotification('error', 'Failed to copy content. Please try again.');
    });
}

function handleReport(content) {
    reportDialog.classList.remove('hidden');
    document.getElementById('reportedContent').value = content;
}

async function handleAgain(content) {
    userInput.value = content;
    await sendMessage(content);
}

function updateReportContent() {
    const reportedContent = document.getElementById('reportedContent').value;
    document.getElementById('reportProblem').value = `Reported content: ${reportedContent}\n\nProblem description: `;
}

async function submitReport() {
    const email = document.getElementById('reportEmail').value;
    const problem = document.getElementById('reportProblem').value;
    
    if (!email || !problem) {
        addNotification('error', 'Please fill in all fields before submitting the report.');
        return;
    }
    
    try {
        const response = await fetch('/api/submit-report', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, problem }),
        });
        
        if (response.ok) {
            addNotification('info', 'Report submitted successfully. Thank you for your feedback!');
            reportDialog.classList.add('hidden');
        } else {
            throw new Error('Failed to submit report');
        }
    } catch (error) {
        console.error('Error submitting report:', error);
        addNotification('error', 'Failed to submit report. Please try again later.');
    }
}

chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = userInput.value.trim();
    if (message && !isGenerating) {
        userInput.value = '';
        sendMessage(message);
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
        addNotification('error', 'Please fill in all fields before sending the message.');
        return;
    }
    
    try {
        const response = await fetch('/api/send-contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, message }),
        });
        
        if (response.ok) {
            addNotification('info', 'Message sent successfully. We\'ll get back to you soon!');
            document.getElementById('contactEmail').value = '';
            document.getElementById('contactMessage').value = '';
        } else {
            throw new Error('Failed to send message');
        }
    } catch (error) {
        console.error('Error sending message:', error);
        addNotification('error', 'Failed to send message. Please try again later.');
    }
});

setTimeout(() => {
    addNotification('welcome', 'Welcome to AI Chat! Feel free to ask any questions.');
}, 2000);

window.addEventListener('load', () => {
    document.getElementById('loadingScreen').style.display = 'none';
    const storedHistory = localStorage.getItem('chatHistory');
    if (storedHistory) {
        conversationHistory = JSON.parse(storedHistory);
        conversationHistory.forEach(message => {
            addMessage(message.role, message.content);
        });
    }
});

chatContainer.addEventListener('click', (event) => {
    const target = event.target;
    if (target.tagName === 'BUTTON' && target.dataset.action) {
        const action = target.dataset.action;
        const content = target.dataset.content;
        
        switch (action) {
            case 'copy':
                handleCopy(content);
                break;
            case 'report':
                handleReport(content);
                break;
            case 'again':
                handleAgain(content);
                break;
        }
    }
});
