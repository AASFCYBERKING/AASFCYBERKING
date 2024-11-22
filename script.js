const username = "kishoredxd";
const upiId = "kishoredxd@ybl";
const instagramProfileName = ".𝐊𝐈𝐒𝐇𝐎𝐑𝐄.👀";
const instagramBio = "- 𝚜𝚞𝚙, 𝙸'𝚖 𝚊𝚠𝚔𝚠𝚊𝚛𝚍...🥂 Contact for custom solutions!";
const upiQrCode = "qrcode.jpg"; 

// React component
function CoolDigitalServices() {
    const [isDarkMode, setIsDarkMode] = React.useState(false);
    const [instagramUsername, setInstagramUsername] = React.useState('');
    const [followerCount, setFollowerCount] = React.useState(100);
    const [googlePlayAmount, setGooglePlayAmount] = React.useState(100);
    const [generatedText, setGeneratedText] = React.useState('');
    const [showOrderDetails, setShowOrderDetails] = React.useState(false);
    const [showDisclaimer, setShowDisclaimer] = React.useState(true);
    const [showContent, setShowContent] = React.useState(false);
    const [notification, setNotification] = React.useState(null);
    const [showQrOverlay, setShowQrOverlay] = React.useState(false);

    React.useEffect(() => {
        document.documentElement.classList.toggle('dark', isDarkMode);
    }, [isDarkMode]);

    const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

    const showNotification = (type, message) => {
        setNotification({ type, message });
        setTimeout(() => setNotification(null), 3000);
    };

    const calculateInstagramPrice = (count) => {
        const basePrice = 50;
        const additionalFollowers = Math.max(0, count - 500);
        const additionalCost = Math.ceil(additionalFollowers / 100) * 15;
        return basePrice + additionalCost;
    };

    const calculateGooglePlayPrice = (amount) => {
        return amount + Math.ceil(amount / 10) * 2;
    };

    const handleInstagramSubmit = (e) => {
        e.preventDefault();
        if (!instagramUsername || followerCount < 100 || followerCount > 1000) {
            showNotification('error', 'Please enter a valid username and follower count (100-1000)');
            return;
        }
        const price = calculateInstagramPrice(followerCount);
        setGeneratedText(`Instagram Followers Order:
Username: @${instagramUsername}
Followers: ${followerCount}
Total Price: ₹${price} (includes ₹${price - followerCount * 0.1} service fee)

I agree to all terms and conditions. I am responsible for my actions, and I confirm that this money belongs to me and was not obtained through illegal means.`);
        setShowOrderDetails(true);
        showNotification('success', 'Order generated successfully!');
    };

    const handleGooglePlaySubmit = (e) => {
        e.preventDefault();
        if (googlePlayAmount < 10 || googlePlayAmount > 1000) {
            showNotification('error', 'Please enter a valid amount (10-1000)');
            return;
        }
        const price = calculateGooglePlayPrice(googlePlayAmount);
        setGeneratedText(`Google Play Gift Card Order:
Amount: ₹${googlePlayAmount}
Total Price: ₹${price} (includes ₹${price - googlePlayAmount} service fee)

I agree to all terms and conditions. I am responsible for my actions, and I confirm that this money belongs to me and was not obtained through illegal means.`);
        setShowOrderDetails(true);
        showNotification('success', 'Order generated successfully!');
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(generatedText);
        showNotification('success', 'Copied to clipboard!');
    };

    const handleAgreeTerms = () => {
        setShowDisclaimer(false);
        setShowContent(true);
        showNotification('info', 'Welcome to Cool Digital Services!');
    };

    return (
        <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
            {/* Main content */}
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-gray-900 dark:to-gray-800 min-h-screen text-gray-800 dark:text-gray-200 transition-colors duration-500 relative">
                {/* Background paw prints */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {[...Array(20)].map((_, i) => (
                        <i key={i} className="fas fa-paw absolute text-orange-200 dark:text-gray-700 opacity-10"
                           style={{
                               top: `${Math.random() * 100}%`,
                               left: `${Math.random() * 100}%`,
                               fontSize: `${Math.random() * 30 + 10}px`,
                               transform: `rotate(${Math.random() * 360}deg)`,
                           }}></i>
                    ))}
                </div>

                {/* Disclaimer */}
                {showDisclaimer && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md p-6 relative flex flex-col max-h-[90vh]">
                            <div className="flex items-center justify-center mb-4">
                                <i className="fas fa-exclamation-triangle text-yellow-500 text-4xl"></i>
                            </div>
                            <h2 className="text-2xl font-bold text-center mb-4">Legal Disclaimer</h2>
                            <div className="overflow-y-auto flex-grow pr-2">
                                <div className="space-y-4 text-sm">
                                    <p>This service is provided for entertainment purposes only. We are not affiliated with or endorsed by Instagram, Google, or any other mentioned platforms.</p>
                                    {/* Add more disclaimer text here */}
                                </div>
                            </div>
                            <button onClick={handleAgreeTerms}
                                    className="w-full mt-6 bg-gradient-to-r from-yellow-400 to-orange-500 text-white py-2 rounded-lg">
                                I Agree and Understand
                            </button>
                        </div>
                    </div>
                )}

                {!showDisclaimer && (
                    <>
                        {/* Header */}
                        <header className="sticky top-0 bg-white dark:bg-gray-900 bg-opacity-90 dark:bg-opacity-90 backdrop-blur-sm z-50 shadow-md">
                            <nav className="container mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
                                <div className="flex items-center space-x-2">
                                    <i className="fas fa-cat text-2xl text-orange-500 dark:text-orange-300"></i>
                                    <h1 className="text-xl sm:text-2xl font-bold text-orange-600 dark:text-orange-400">Cool Digital Services</h1>
                                </div>
                                <button onClick={toggleDarkMode}
                                        className="text-orange-600 dark:text-orange-400 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                                    <i className={`fas ${isDarkMode ? 'fa-sun' : 'fa-moon'} text-xl`}></i>
                                </button>
                            </nav>
                        </header>

                        {/* Main content */}
                        <main className="container mx-auto px-4 sm:px-6 py-8 space-y-8 relative z-10">
                            {/* Profile card */}
                            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                                <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-4">
                                    <h2 className="text-xl sm:text-2xl font-bold flex items-center">
                                        <i className="fas fa-cat mr-2"></i>
                                        Kishore's Digital Services
                                    </h2>
                                </div>
                                <div className="p-4 sm:p-6">
                                    <div className="flex flex-col sm:flex-row items-center sm:space-x-4">
                                        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-orange-500 flex items-center justify-center text-white text-4xl font-bold mb-4 sm:mb-0">
                                            KD
                                        </div>
                                        <div className="text-center sm:text-left">
                                            <h2 className="text-xl sm:text-2xl font-bold">{instagramProfileName}</h2>
                                            <p className="text-gray-600 dark:text-gray-400">@{username}</p>
                                            <p className="mt-2">{instagramBio}</p>
                                            <button className="bg-[#E1306C] hover:bg-[#C13584] text-white mt-4 py-2 px-4 rounded-lg flex items-center">
                                                <i className="fab fa-instagram mr-2"></i>
                                                Follow on Instagram
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Instagram Followers card */}
                            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                                <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4">
                                    <h2 className="text-xl font-bold flex items-center">
                                        <i className="fab fa-instagram mr-2"></i>
                                        Instagram Followers
                                    </h2>
                                </div>
                                <div className="p-4 sm:p-6">
                                    <form onSubmit={handleInstagramSubmit} className="space-y-4">
                                        <div>
                                            <label htmlFor="instagram-username" className="block text-sm font-medium mb-1">Instagram Username</label>
                                            <div className="relative">
                                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">@</span>
                                                <input
                                                    id="instagram-username"
                                                    type="text"
                                                    placeholder="username"
                                                    value={instagramUsername}
                                                    onChange={(e) => setInstagramUsername(e.target.value)}
                                                    className="pl-8 w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label htmlFor="follower-count" className="block text-sm font-medium mb-1">Follower Count</label>
                                            <input
                                                type="range"
                                                min="100"
                                                max="1000"
                                                step="10"
                                                value={followerCount}
                                                onChange={(e) => setFollowerCount(parseInt(e.target.value))}
                                                className="w-full"
                                            />
                                            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                                                <span>100</span>
                                                <span>{followerCount}</span>
                                                <span>1000</span>
                                            </div>
                                        </div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            Total Price: ₹{calculateInstagramPrice(followerCount)} (includes ₹{calculateInstagramPrice(followerCount) - followerCount * 0.1} service fee)
                                        </p>
                                        <button type="submit" className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 rounded-lg">
                                            Generate Order
                                        </button>
                                    </form>
                                </div>
                                <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                                    <p className="text-sm text-gray-500">
                                        Note: Instagram has introduced a feature to verify suspicious followers. To ensure you receive all followers, go to Settings → Follow and Invite Friends or Settings → Followers and Contacts, and uncheck the "Flag for review" option.
                                    </p>
                                </div>
                            </div>

                            {/* Google Play Gift Cards card */}
                            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                                <div className="bg-gradient-to-r from-blue-500 to-green-500 text-white p-4">
                                    <h2 className="text-xl font-bold flex items-center">
                                        <i className="fab fa-google-play mr-2"></i>
                                        Google Play Gift Cards
                                    </h2>
                                </div>
                                <div className="p-4 sm:p-6">
                                    <form onSubmit={handleGooglePlaySubmit} className="space-y-4">
                                        <div>
                                            <label htmlFor="google-play-amount" className="block text-sm font-medium mb-1">Amount</label>
                                            <div className="relative">
                                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">₹</span>
                                                <input
                                                    id="google-play-amount"
                                                    type="number"
                                                    min="10"
                                                    max="1000"
                                                    value={googlePlayAmount}
                                                    onChange={(e) => setGooglePlayAmount(Math.max(10, Math.min(1000, parseInt(e.target.value) || 10)))}
                                                    className="pl-8 w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                                                />
                                            </div>
                                        </div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            Total Price: ₹{calculateGooglePlayPrice(googlePlayAmount)} (includes ₹{calculateGooglePlayPrice(googlePlayAmount) - googlePlayAmount} service fee)
                                        </p>
                                        <button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-green-500 text-white py-2 rounded-lg">
                                            Generate Order
                                        </button>
                                    </form>
                                </div>
                                <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                                    <p className="text-sm text-gray-500">
                                        Note: Due to limited availability of physical cards, we now offer UPI transactions. After payment, you'll receive the Google Play redeem code (including our commission).
                                    </p>
                                </div>
                            </div>

                            {/* Service Details card */}
                            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                                <div className="p-4">
                                    <h2 className="text-xl font-bold flex items-center mb-2">
                                        <i className="fas fa-clock mr-2"></i>
                                        Service Details
                                    </h2>
                                    <p>Our services will be provided within 24-48 hours after the payment is confirmed. If for any reason we are unable to fulfill your order within this timeframe, we will promptly refund your payment.</p>
                                </div>
                            </div>
                        </main>

                        {/* Footer */}
                        <footer className="bg-white dark:bg-gray-900 py-6 text-center relative z-10">
                            <div className="container mx-auto px-4 sm:px-6">
                                <p>© 2024 Cool Digital Services. All rights reserved.</p>
                                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                    This website is for entertainment purposes only. We do not guarantee any specific results from using our services.
                                </p>
                            </div>
                        </footer>
                    </>
                )}

                {/* Order Details Modal */}
                {showOrderDetails && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md p-6 relative flex flex-col max-h-[90vh]">
                            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white flex items-center">
                                <i className="fas fa-paw mr-2 text-orange-500"></i>
                                Order Details
                            </h2>
                            <div className="overflow-y-auto flex-grow">
                                <div className="bg-gradient-to-br from-orange-100 to-pink-100 dark:from-gray-700 dark:to-gray-600 p-4 rounded-md shadow-inner mb-4">
                                    <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">Generated Order Text:</h3>
                                    <pre className="whitespace-pre-wrap text-sm text-gray-800 dark:text-gray-200">
                                        {generatedText}
                                    </pre>
                                </div>
                                <div className="bg-gradient-to-br from-blue-100 to-green-100 dark:from-gray-800 dark:to-gray-700 p-4 rounded-md shadow-inner">
                                    <h3 className="font-semibold mb-2 text-gray-900 dark:text-white flex items-center">
                                        <i className="fas fa-qrcode mr-2 text-blue-500"></i>
                                        Payment Instructions
                                    </h3>
                                    <ol className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300">
                                        <li>Scan the QR code or use the UPI ID below for payment.</li>
                                        <li>Take a screenshot of your payment confirmation.</li>
                                        <li>Send the screenshot along with the generated order text to @{username} on Instagram.</li>
                                        <li>Wait for your order to be processed (usually within 24-48 hours).</li>
                                    </ol>
                                    <div className="flex items-center justify-center space-x-4 mt-4">
                                        <img src={upiQrCode} alt="UPI QR Code" className="w-24 h-24 cursor-pointer" onClick={() => setShowQrOverlay(true)} />
                                        <div>
                                            <p className="text-gray-700 dark:text-gray-300 font-semibold">UPI ID: {upiId}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-4 space-y-2">
                                    <button onClick={copyToClipboard} className="w-full bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white py-2 rounded-lg transition-all duration-300">
                                        <i className="fas fa-copy mr-2"></i>
                                        Copy Order Text
                                    </button>
                                    <button
                                        onClick={() => window.open(`https://www.instagram.com/${username}`, '_blank')}
                                        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-2 rounded-lg transition-all duration-300"
                                    >
                                        <i className="fab fa-instagram mr-2"></i>
                                        Open @{username} on Instagram
                                    </button>
                                </div>
                            </div>
                            <button
                                onClick={() => setShowOrderDetails(false)}
                                className="mt-6 w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white py-2 rounded-lg transition-all duration-300"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}

                {/* QR Code Overlay */}
                {showQrOverlay && (
                    <div className="qr-code-overlay" onClick={() => setShowQrOverlay(false)}>
                        <img src={upiQrCode} alt="UPI QR Code" />
                        <span className="close-button">&times;</span>
                    </div>
                )}

                {/* Notification */}
                {notification && (
                    <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg ${
                        notification.type === 'success' ? 'bg-green-500' :
                        notification.type === 'error' ? 'bg-red-500' :
                        'bg-blue-500'
                    } text-white flex items-center space-x-3 max-w-md`}>
                        <i className={`fas ${
                            notification.type === 'success' ? 'fa-check-circle' :
                            notification.type === 'error' ? 'fa-exclamation-circle' :
                            'fa-info-circle'
                        } text-2xl`}></i>
                        <p>{notification.message}</p>
                        <button onClick={() => setNotification(null)} className="text-white hover:text-gray-200 transition-colors">
                            <i className="fas fa-times"></i>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

// Render the React component
ReactDOM.render(<CoolDigitalServices />, document.getElementById('app'));
