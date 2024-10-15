document.addEventListener('DOMContentLoaded', () => {
    const app = {
        init() {
            this.cacheDOM();
            this.bindEvents();
            this.showNotification();
            this.renderSection('home');
            lucide.createIcons();
        },

        cacheDOM() {
            this.menuButton = document.getElementById('menuButton');
            this.navbar = document.getElementById('navbar');
            this.closeNavButton = document.getElementById('closeNavButton');
            this.navButtons = document.querySelectorAll('.nav-button');
            this.mainContent = document.getElementById('mainContent');
            this.chatForm = document.getElementById('chatForm');
            this.chatInput = document.getElementById('chatInput');
            this.inputArea = document.getElementById('inputArea');
            this.reportDialog = document.getElementById('reportDialog');
            this.reportEmail = document.getElementById('reportEmail');
            this.reportProblem = document.getElementById('reportProblem');
            this.submitReport = document.getElementById('submitReport');
            this.notification = document.getElementById('notification');
            this.closeNotification = document.getElementById('closeNotification');
        },

        bindEvents() {
            this.menuButton.addEventListener('click', () => this.toggleNavbar());
            this.closeNavButton.addEventListener('click', () => this.toggleNavbar());
            this.navButtons.forEach(button => {
                button.addEventListener('click', (e) => 
                    this.handleNavigation(e.currentTarget.dataset.section));
            });
            this.chatForm.addEventListener('submit', (e) => this.handleChatSubmit(e));
            this.submitReport.addEventListener('click', () => this.handleReportSubmit());
            this.closeNotification.addEventListener('click', () => this.hideNotification());
        },

        toggleNavbar() {
            this.navbar.classList.toggle('hidden');
        },

        handleNavigation(section) {
            this.toggleNavbar();
            this.renderSection(section);
        },

        renderSection(section) {
            switch (section) {
                case 'home':
                    this.renderHome();
                    break;
                case 'about':
                    this.renderAbout();
                    break;
                case 'contact':
                    this.renderContact();
                    break;
            }
            this.inputArea.style.display = section === 'home' ? 'block' : 'none';
        },

        renderHome() {
            this.mainContent.innerHTML = `
                <div id="chatMessages" class="flex-1 overflow-y-auto p-4 space-y-4"></div>
            `;
        },

        renderAbout() {
            this.mainContent.innerHTML = `
                <div class="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 md:space-y-8 bg-gradient-to-br from-blue-100 via-white to-blue-100">
                    <h2 class="text-2xl md:text-4xl font-bold mb-4 md:mb-6 text-center text-blue-900 animate-fade-in-down">
                        Meet Your AI Companion 🤖
                    </h2>
                    <div class="max-w-3xl mx-auto space-y-4 md:space-y-6 text-blue-800">
                        <p class="text-base md:text-lg leading-relaxed animate-fade-in">
                            Welcome to the cutting-edge of educational technology! I'm not just any chatbot — I'm a personalized AI assistant crafted exclusively for the brilliant minds at DHARAM HINDUJA MATRICULATION HIGHER SECONDARY SCHOOL. 🎓
                        </p>
                        <div class="flex items-center justify-center space-x-4 my-6 md:my-8">
                            <i data-lucide="zap" class="h-8 w-8 md:h-12 md:w-12 text-blue-600 animate-pulse"></i>
                            <i data-lucide="code" class="h-8 w-8 md:h-12 md:w-12 text-blue-600 animate-bounce"></i>
                            <i data-lucide="sparkles" class="h-8 w-8 md:h-12 md:w-12 text-blue-600 animate-spin"></i>
                        </div>
                        <p class="text-base md:text-lg leading-relaxed animate-fade-in">
                            Born from the innovative spirit of Harish, a visionary student at DHARAM HINDUJA, I represent the perfect fusion of youthful creativity and artificial intelligence. Harish poured his passion for technology and education into every line of my code, crafting an AI companion that understands the unique needs of his fellow students. 💡
                        </p>
                        <p class="text-base md:text-lg leading-relaxed animate-fade-in">
                            I'm here to revolutionize your learning experience, providing instant assistance, thought-provoking discussions, and a touch of digital magic to your educational journey. Whether you're tackling complex math problems, exploring the depths of literature, or diving into scientific theories, I'm your round-the-clock study buddy and knowledge enhancer. 📚⚡
                        </p>
                        <div class="text-center mt-6 md:mt-8">
                            <span class="text-xl md:text-2xl font-semibold text-blue-900 animate-pulse">
                                Empowering Minds, One Conversation at a Time 🚀
                            </span>
                        </div>
                    </div>
                </div>
            `;
            lucide.createIcons();
        },

        renderContact() {
            this.mainContent.innerHTML = `
                <div class="flex-1 overflow-y-auto p-4 md:p-8 bg-gradient-to-br from-blue-100 via-white to-blue-100">
                    <h2 class="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-center text-blue-900 animate-fade-in-down">
                        Get in Touch 📬
                    </h2>
                    <div class="max-w-2xl mx-auto space-y-6 md:space-y-8">
                        <div class="bg-white bg-opacity-50 p-4 md:p-6 rounded-lg shadow-lg backdrop-blur-sm transform hover:scale-105 transition-all duration-300">
                            <h3 class="text-lg md:text-xl font-semibold mb-3 md:mb-4 text-blue-800">School Contact Information 🏫</h3>
                            <p class="text-sm md:text-base text-blue-700 mb-2">DHARAM HINDUJA MATRICULATION HIGHER SECONDARY SCHOOL</p>
                            <p class="text-sm md:text-base text-blue-700 mb-2">No.19, Poonthottam Street, Tiruvottiyur, Chennai - 600 019, Tamilnadu</p>
                            <p class="text-sm md:text-base text-blue-700 mb-2">Phone: (044) 2572-7553, +91 9025218724</p>
                            <p class="text-sm md:text-base text-blue-700">Email: dharam_hinduja@yahoo.com</p>
                        </div>
                        <div class="bg-white bg-opacity-50 p-4 md:p-6 rounded-lg shadow-lg backdrop-blur-sm transform hover:scale-105 transition-all duration-300">
                            <h3 class="text-lg md:text-xl font-semibold mb-3 md:mb-4 text-blue-800">Contact the Developer 👨‍💻</h3>
                            <form id="contactForm" class="space-y-4">
                                <input type="email" id="contactEmail" placeholder="Your Gmail 📧" class="w-full p-2 bg-blue-50 border-blue-200 text-blue-900 rounded">
                                <textarea id="contactMessage" placeholder="Your message 💬" class="w-full p-2 bg-blue-50 border-blue-200 text-blue-900 rounded"></textarea>
                                <div class="flex space-x-2">
                                    <button type="submit" class="flex-1 bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white font-bold py-2 px-4 rounded-full transition-all duration-300 transform hover:scale-105">
                                        Send Message 📤
                                    </button>
                                    <button type="button" id="openGmail" class="bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white font-bold py-2 px-4 rounded-full transition-all duration-300 transform hover:scale-105">
                                        <i data-lucide="mail"></i>
                                        Open in Gmail
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            `;
            lucide.createIcons();
            this.bindContactFormEvents();
        },

        bindContactFormEvents() {
            const contactForm = document.getElementById('contactForm');
            const openGmailButton = document.getElementById('openGmail');
            
            contactForm.addEventListener('submit', (e) => this.handleContactSubmit(e));
            openGmailButton.addEventListener('click', () => this.openGmail());
        },

        handleContactSubmit(e) {
            e.preventDefault();
            const email = document.getElementById('contactEmail').value;
            const message = document.getElementById('contactMessage').value;
            
            if (!this.validateEmail(email)) {
                this.showNotification('error', 'Please enter a valid email address');
                return;
            }

            // Here you would typically send the data to a server
            // For this example, we'll just show a success message
            this.showNotification('success', "Message sent successfully! We'll reply as soon as possible. 🚀");
            document.getElementById('contactEmail').value = '';
            document.getElementById('contactMessage').value = '';
        },

        openGmail() {
            const email = document.getElementById('contactEmail').value;
            if (this.validateEmail(email)) {
                window.location.href = `mailto:${email}`;
            } else {
                this.showNotification('error', 'Please enter a valid email address');
            }
        },

        validateEmail(email) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        },

        async handleChatSubmit(e) {
            e.preventDefault();
            const message = this.chatInput.value.trim();
            if (message) {
                this.addMessage('user', message);
                this.chatInput.value = '';
                this.addThinkingMessage();
                try {
                    const response = await this.sendMessage(message);
                    this.removeThinkingMessage();
                    this.addMessage('ai', response);
                } catch (error) {
                    this.removeThinkingMessage();
                    this.showNotification('error', 'Failed to get a response. Please try again.');
                }
            }
        },

        addMessage(role, content) {
            const chatMessages = document.getElementById('chatMessages');
            const messageElement = document.createElement('div');
            messageElement.className = `flex ${role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in-up`;
            messageElement.innerHTML = `
                <div class="flex items-end space-x-2 max-w-[80%] ${role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}">
                    <div class="w-8 h-8 rounded-full ${role === 'user' ? 'bg-blue-700' : 'bg-transparent'}">
                        ${role === 'user' ? '👤' : '<img src="https://raw.githubusercontent.com/Awesome-Prince/dhs-logo.png/refs/heads/main/Picsart_24-10-14_13-29-40-569.png" alt="AI" class="w-full h-full object-cover">'}
                    </div>
                    <div class="p-3 rounded-lg ${role === 'user' ? 'bg-gradient-to-r from-blue-400 to-blue-600' : 'bg-gradient-to-r from-blue-300 to-blue-500'} text-sm md:text-base shadow-lg">
                        <p class="mb-2 whitespace-pre-wrap">
                            ${role === 'ai' ? '<span class="font-mono bg-blue-200 text-blue-800 px-1 rounded">AI:</span>' : '<span class="font-mono bg-green-200 text-green-800 px-1 rounded">You:</span>'}
                            ${content}
                        </p>
                        ${role === 'ai' ? `
                            <div class="flex mt-2 space-x-2">
                                <button onclick="app.handleCopy('${content}')" class="text-white hover:text-blue-100 transition-colors duration-300">
                                    <i data-lucide="copy"></i>
                                </button>
                                <button onclick="app.handleReport('${content}')" class="text-white hover:text-blue-100 transition-colors duration-300">
                                    <i data-lucide="flag"></i>
                                </button>
                                <button onclick="app.handleAgain(${chatMessages.children.length})" class="text-white hover:text-blue-100 transition-colors duration-300">
                                    <i data-lucide="rotate-ccw"></i>
                                </button>
                            </div>
                        ` : ''}
                    </div>
                </div>
            `;
            chatMessages.appendChild(messageElement);
            chatMessages.scrollTop = chatMessages.scrollHeight;
            lucide.createIcons();
        },

        addThinkingMessage() {
            const chatMessages = document.getElementById('chatMessages');
            const thinkingElement = document.createElement('div');
            thinkingElement.className = 'flex justify-start animate-fade-in-up thinking-message';
            thinkingElement.innerHTML = `
                <div class="flex items-end space-x-2 max-w-[80%]">
                    <div class="w-8 h-8 rounded-full bg-transparent">
                        <img src="https://raw.githubusercontent.com/Awesome-Prince/dhs-logo.png/refs/heads/main/Picsart_24-10-14_13-29-40-569.png" alt="AI" class="w-full h-full object-cover">
                    </div>
                    <div class="p-3 rounded-lg bg-gradient-to-r from-blue-200 to-blue-400 text-sm md:text-base shadow-lg">
                        <div class="flex space-x-2">
                            <div class="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                            <div class="w-2 h-2 bg-white rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
                            <div class="w-2 h-2 bg-white rounded-full animate-bounce" style="animation-delay: 0.4s"></div>
                        </div>
                    </div>
                </div>
            `;
            chatMessages.appendChild(thinkingElement);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        },

        removeThinkingMessage() {
            const thinkingMessage = document.querySelector('.thinking-message');
            if (thinkingMessage) {
                thinkingMessage.remove();
            }
        },

        async sendMessage(message) {
            // This is where you would normally send the message to your AI service
            // For this example, we'll just return a mock response after a delay
            await new Promise(resolve => setTimeout(resolve, 1000));
            return "This is a mock response from the AI. In a real application, this would be the response from your AI service.";
        },

        handleCopy(content) {
            navigator.clipboard.writeText(content);
            this.showNotification('info', 'Response copied to clipboard! 📋');
        },

        handleReport(content) {
            this.reportDialog.classList.remove('hidden');
        },

        handleReportSubmit() {
            const email = this.reportEmail.value;
            const problem = this.reportProblem.value;

            if (!this.validateEmail(email)) {
                this.showNotification('error', 'Please enter a valid email address');
                return;
            }

            // Here you would typically send the report to a server
            // For this example, we'll just show a success message
            this.showNotification('success', 'Report submitted successfully. Thank you for your feedback! 🙏');
            this.reportDialog.classList.add('hidden');
            this.reportEmail.value = '';
            this.reportProblem.value = '';
        },

        async handleAgain(index) {
            const chatMessages = document.getElementById('chatMessages');
            const userMessage = chatMessages.children[index - 1].querySelector('p
