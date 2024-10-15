import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Function to handle sending messages
const handleSend = async (e, setInput, setMessages, setIsThinking, input, messages) => {
    e.preventDefault();
    if (input.trim()) {
        const newMessage = { role: 'user', content: input };
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        setInput('');
        setIsThinking(true);
        try {
            const response = await axios.post('https://api.qewertyy.dev/models', {
                messages: [
                    {
                        role: 'system',
                        content: 'None',
                    },
                    {
                        role: 'user',
                        content: input,
                    },
                ],
                model_id: 23,
            });
            if (response.data.content && response.data.content[0] && response.data.content[0].text) {
                const aiResponse = response.data.content[0].text;
                setMessages((prevMessages) => [...prevMessages, { role: 'assistant', content: aiResponse, isThinking: false }]);
            } else {
                console.error('Unexpected response structure:', response);
                toast.error('An error occurred while processing your request.');
            }
        } catch (error) {
            console.error('Error sending message:', error);
            toast.error('An error occurred while sending your message.');
        } finally {
            setIsThinking(false);
        }
    }
};

// Function to handle reporting problems
const handleReport = async (e, setReportEmail, setReportProblem, setReportedContent, reportedContent) => {
    e.preventDefault();
    const reportEmail = document.getElementById('report-email').value;
    const reportProblem = document.getElementById('report-problem').value;
    setReportEmail(reportEmail);
    setReportProblem(reportProblem);
    setReportedContent(reportedContent);
    try {
        const response = await axios.post('https://api.telegram.org/bot8188094426:AAHgwqlzOuNY8VckUrYL5sNkENsu-sCQOFQ/sendMessage', {
            chat_id: '5629305049',
            text: `Report from ${reportEmail}:\n\nProblem: ${reportProblem}\n\nReported Content: ${reportedContent}`,
        });
        if (response.status === 200) {
            toast.success('Report submitted successfully. Thank you for your feedback!');
        } else {
            throw new Error('Failed to submit report');
        }
    } catch (error) {
        console.error('Error submitting report:', error);
        toast.error('Failed to submit report. Please try again later.');
    }
};

// Main App component
const App = () => {
    const [messages, setMessages] = React.useState([]);
    const [input, setInput] = React.useState('');
    const [isThinking, setIsThinking] = React.useState(false);
    const [isNavOpen, setIsNavOpen] = React.useState(false);
    const [activeSection, setActiveSection] = React.useState('home');
    const [isLoading, setIsLoading] = React.useState(true);
    const [contactEmail, setContactEmail] = React.useState('');
    const [contactMessage, setContactMessage] = React.useState('');
    const [isSending, setIsSending] = React.useState(false);
    const [isReportDialogOpen, setIsReportDialogOpen] = React.useState(false);
    const [reportEmail, setReportEmail] = React.useState('');
    const [reportProblem, setReportProblem] = React.useState('');
    const [reportedContent, setReportedContent] = React.useState('');
    const [showWelcome, setShowWelcome] = React.useState(true);
    const [showNotification, setShowNotification] = React.useState(false);

    React.useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 2000);
        const notificationTimer = setTimeout(() => setShowNotification(true), 3000);

        return () => {
            clearTimeout(timer);
            clearTimeout(notificationTimer);
        };
    }, []);

    return (
        <div className="chat-interface">
            <ToastContainer />
            {isLoading ? (
                <div className="loading-animation">
                    <div></div>
                </div>
            ) : (
                <div>
                    <header className="chat-header">
                        <img src="https://raw.githubusercontent.com/Awesome-Prince/dhs-logo.png/refs/heads/main/Picsart_24-10-14_13-29-40-569.png " alt="Logo" className="logo" />
                        <h2>AI Chat</h2>
                        <button className="navbar-toggler" onClick={() => setIsNavOpen(true)}>
                            <span></span>
                            <span></span>
                            <span></span>
                        </button>
                    </header>
                    <nav className={isNavOpen ? 'navbar navbar-open' : 'navbar'}>
                        <ul>
                            <li>
                                <a href="#" onClick={() => setActiveSection('home')}>
                                    Home
                                </a>
                            </li>
                            <li>
                                <a href="#" onClick={() => setActiveSection('about')}>
                                    About
                                </a>
                            </li>
                            <li>
                                <a href="#" onClick={() => setActiveSection('contact')}>
                                    Contact
                                </a>
                            </li>
                        </ul>
                    </nav>
                    <main className="chat-body">
                        {showWelcome && (
                            <div className="welcome-message">
                                <h2>Welcome to AI Chat!</h2>
                                <p>
                                    This is an AI-powered chat interface. You can ask me anything, and I'll do my best to respond.
                                </p>
                            </div>
                        )}
                        {messages.map((message, index) => (
                            <div key={index} className={`message ${message.role === 'assistant' ? 'ai' : 'user'}`}>
                                <p>{message.content}</p>
                            </div>
                        ))}
                        {isThinking && (
                            <div className="message ai">
                                <p>...</p>
                            </div>
                        )}
                    </main>
                    <form onSubmit={(e) => handleSend(e, setInput, setMessages, setIsThinking, input, messages)}>
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type a message..."
                        />
                        <button type="submit">Send</button>
                    </form>
                    {isReportDialogOpen && (
                        <div className="report-dialog">
                            <div className="report-dialog-content">
                                <h2>Report a Problem</h2>
                                <form onSubmit={(e) => handleReport(e, setReportEmail, setReportProblem, setReportedContent, reportedContent)}>
                                    <input
                                        type="email"
                                        id="report-email"
                                        placeholder="Your Email"
                                    />
                                    <textarea
                                        id="report-problem"
                                        placeholder="Describe the problem..."
                                    />
                                    <button type="submit">Submit Report</button>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
