const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const messageForm = document.getElementById('message-form');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');
const messagesContainer = document.getElementById('messages');
const reportDialog = document.getElementById('report-dialog');
const reportForm = document.getElementById('report-form');
const reportEmail = document.getElementById('report-email');
const reportProblem = document.getElementById('report-problem');
const reportSubmit = document.getElementById('report-submit');
const toastContainer = document.getElementById('toast-container');

let messages = [];
let input = '';
let isThinking = false;
let isNavOpen = false;
let activeSection = 'home';
let isLoading = true;
let contactEmail = '';
let contactMessage = '';
let isSending = false;
let isReportDialogOpen = false;
let reportEmailValue = '';
let reportProblemValue = '';
let reportedContent = '';
let showWelcome = true;
const messagesEndRef = document.getElementById('messages-end');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('nav-menu-open');
});

messageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value.trim();
    if (message) {
        messages.push({ role: 'user', content: message });
        messageInput.value = '';
        isThinking = true;
        sendPayload(message);
    }
});

sendButton.addEventListener('click', () => {
    messageForm.submit();
});

reportDialog.addEventListener('click', (e) => {
    if (e.target === reportDialog) {
        reportDialog.classList.remove('report-dialog-open');
    }
});

reportForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = reportEmail.value.trim();
    const problem = reportProblem.value.trim();
    if (email && problem) {
        // Send report to server
        console.log('Report sent:', email, problem);
        reportDialog.classList.remove('report-dialog-open');
    }
});

function sendPayload(prompt) {
    const api_url = "https://api.qewertyy.dev/models";
    const payload = {
        messages: [
            {
                role: "system",
                content: "None"
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
            fetch(api_url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            })
            .then(response => response.json())
            .then(data => {
                if (data.content && data.content[0] && data.content[0].text) {
                    messages.push({ role: 'assistant', content: data.content[0].text });
                } else {
                    console.error("Unexpected response structure:", data);
                    alert("An error occurred while processing your request.");
                }
            })
            .catch(error => {
                console.error("Error sending message:", error);
                alert("An error occurred while sending your message.");
            })
            .finally(() => {
                isThinking = false;
            });
            break;
        } catch (error) {
            console.error(error);
            setTimeout(() => {}, 1000); // wait for 1 second before retrying
        }
    }
}

function handleContactSend() {
    if (!contactEmail.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        alert('Please enter a valid email address');
        return;
    }
    isSending = true;

    const TOKEN = 'YOUR_TELEGRAM_BOT_TOKEN';
    const CHAT_ID = 'YOUR_TELEGRAM_CHAT_ID';
    const message = `New contact from ${contactEmail}:\n\n${contactMessage}`;
    const url = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            chat_id: CHAT_ID,
            text: message
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.ok) {
            alert("Message sent successfully! We'll reply as soon as possible.");
            contactEmail = '';
            contactMessage = '';
        } else {
            throw new Error('Failed to send message');
        }
    })
    .catch(error => {
        alert('Failed to send message. Please try again later.');
    })
    .finally(() => {
        isSending = false;
    });
}

function handleCopy(content) {
    navigator.clipboard.writeText(content);
    alert('Response copied to clipboard!');
}

function handleReport(content) {
    reportedContent = content;
    isReportDialogOpen = true;
}

function submitReport() {
    if (!reportEmail Value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        alert('Please enter a valid email address');
        return;
    }

    const TOKEN = 'YOUR_TELEGRAM_BOT_TOKEN';
    const CHAT_ID = 'YOUR_TELEGRAM_CHAT_ID';
    const reportMessage = `Report from ${reportEmailValue}:\n\nProblem: ${reportProblemValue}\n\nReported Content: ${reportedContent}`;
    const url = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            chat_id: CHAT_ID,
            text: reportMessage
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.ok) {
            alert('Report submitted successfully. Thank you for your feedback!');
            isReportDialogOpen = false;
            reportEmailValue = '';
            reportProblemValue = '';
            reportedContent = '';
        } else {
            throw new Error('Failed to submit report');
        }
    })
    .catch(error => {
        alert('Failed to submit report. Please try again later.');
    });
}

function handleAgain(index) {
    const userMessage = messages[index - 1].content;
    messages[index] = { ...messages[index], isThinking: true };
    sendPayload(userMessage);
}

function renderContent() {
    switch (activeSection) {
        case 'about':
            // render about content
            break;
        case 'contact':
            // render contact content
            break;
        default:
            // render chat content
            messagesContainer.innerHTML = '';
            messages.forEach((message, index) => {
                const messageElement = document.createElement('div');
                messageElement.className = `flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`;
                messageElement.innerHTML = `
                    <div class="flex items-end space-x-2 max-w-[80%] ${message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}">
                        <div class="w-8 h-8 ${message.role === 'user' ? 'bg-purple-700' : 'bg-transparent'} rounded-full"></div>
                        <div class="p-3 rounded-lg ${message.role === 'assistant' ? 'bg-gradient-to-r from-blue-500 to-indigo-500' : 'bg-gradient-to-r from-purple-500 to-pink-500'} text-sm md:text-base shadow-lg transform hover:scale-105 transition-all duration-200">
                            ${message.content}
                            ${message.role === 'assistant' ? `
                                <div class="flex mt-2 space-x-2">
                                    <button class="text-white hover:text-gray-200" onclick="handleCopy('${message.content}')">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h12a2 2 0 002-2v-8a2 2 0 00-2-2h-8v-1a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                        </svg>
                                    </button>
                                    <button class="text-white hover:text-gray-200" onclick="handleReport('${message.content}')">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 5v.01M15.09 8.09l-3-3C13.69 6.69 13.89 6.89 14 7v1.07l-.5-.46A10.923 10.923 0 0121 21a10.923 10.923 0 01-2.82-.812l-.5-.46A10.923 10.923 0 019 18 10.923 10.923 0 017.09 15.09l-3-3m-3 3l1.45 1.45" />
                                        </svg>
                                    </buttonfunction renderContent() {
    switch (activeSection) {
        case 'about':
            return `
                <div class="flex-1 overflow-y-auto p-8 space-y-8 bg-gradient-to-br from-purple-900 via-black to-indigo-900">
                    <h2 class="text-4xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                        Meet Your AI Companion
                    </h2>
                    <div class="max-w-3xl mx-auto space-y-6 text-gray-300">
                        <p class="text-lg leading-relaxed">
                            Welcome to the cutting-edge of educational technology! I'm not just any chatbot – I'm a personalized AI assistant crafted exclusively for the brilliant minds at DHARAM HINDUJA MATRICULATION HIGHER SECONDARY SCHOOL.
                        </p>
                        <div class="flex items-center justify-center space-x-4 my-8">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-yellow-400 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-blue-400 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4-4l4 16" />
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-purple-400 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <p class="text-lg leading-relaxed">
                            Born from the innovative spirit of Harish, a visionary student at DHARAM HINDUJA, I represent the perfect fusion of youthful creativity and artificial intelligence. Harish poured his passion for technology and education into every line of my code, crafting an AI companion that understands the unique needs of his fellow students.
                        </p>
                        <p class="text-lg leading-relaxed">
                            I'm here to revolutionize your learning experience, providing instant assistance, thought-provoking discussions, and a touch of digital magic to your educational journey. Whether you're tackling complex math problems, exploring the depths of literature, or diving into scientific theories, I'm your round-the-clock study buddy and knowledge enhancer.
                        </p>
                        <div class="text-center mt-8">
                            <span class="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
                                Empowering Minds, One Conversation at a Time
                            </span>
                        </div>
                    </div>
                </div>
            `;
        case 'contact':
            return `
                <div class="flex-1 overflow-y-auto p-8 bg-gradient-to-br from-purple-900 via-black to-indigo-900">
                    <h2 class="text-3xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                        Get in Touch
                    </h2>
                    <div class="max-w-2xl mx-auto space-y-8">
                        <div class="bg-zinc-800 bg-opacity-50 p-6 rounded-lg shadow-lg backdrop-blur-sm">
                            <h3 class="text-xl font-semibold mb-4 text-purple-300">School Contact Information</h3>
                            <p class="text-gray-300 mb-2">DHARAM HINDUJA MATRICULATION HIGHER SECONDARY SCHOOL</p>
                            <p class="text-gray-300 mb-2">No.19, Poonthottam Street, Tiruvottiyur, Chennai - 600 019, Tamilnadu</p>
                            <p class="text-gray-300 mb-2">Phone: (044) 2572-7553, +91 9025218724</p>
                            <p class="text-gray-300">Email: dharam_hinduja@yahoo.com</p>
                        </div>
                        <div class="bg-zinc-800 bg-opacity-50 p- 6 rounded-lg shadow-lg backdrop-blur-sm">
                            <h3 class="text-xl font-semibold mb-4 text-purple-300">Reach Out to Harish</h3>
                            <p class="text-gray-300 mb-2">Have a question, suggestion, or just want to chat about AI? Feel free to reach out to Harish, the creator of this AI companion.</p>
                            <input id="contact-email" type="email" class="w-full p-4 pl-10 text-sm text-gray-700" placeholder="Your Email" />
                            <textarea id="contact-message" class="w-full p-4 pl-10 text-sm text-gray-700" placeholder="Your Message"></textarea>
                            <button id="contact-send" class="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">Send Message</button>
                        </div>
                    </div>
                </div>
            `;
        case 'home':
            return `
                <div class="flex-1 overflow-y-auto p-8 bg-gradient-to-br from-purple-900 via-black to-indigo-900">
                    <h2 class="text-4xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                        Welcome to Your AI Companion
                    </h2>
                    <div class="max-w-3xl mx-auto space-y-6 text-gray-300">
                        <p class="text-lg leading-relaxed">
                            I'm here to help you explore the vast expanse of knowledge, providing instant answers, thought-provoking discussions, and a dash of digital magic to your educational journey.
                        </p>
                        <div class="flex items-center justify-center space-x-4 my-8">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-yellow-400 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-blue-400 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4-4l4 16" />
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-purple-400 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <p class="text-lg leading-relaxed">
                            Whether you're tackling complex math problems, exploring the depths of literature, or diving into scientific theories, I'm your round-the-clock study buddy and knowledge enhancer.
                        </p>
                        <div class="text-center mt-8">
                            <span class="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
                                Empowering Minds, One Conversation at a Time
                            </span>
                        </div>
                    </div>
                </div>
            `;
        default:
            return '';
    }
}
