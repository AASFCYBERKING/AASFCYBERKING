// Get elements
const container = document.querySelector('.container');
const header = document.querySelector('.header');
const profilePic = document.querySelector('.profile-pic');
const profileName = document.querySelector('.profile-name');
const content = document.querySelector('.content');
const buttons = document.querySelector('.buttons');
const certificateContainer = document.querySelector('.certificate-container');
const signatureCanvas = document.querySelector('#signature-canvas');
const finalMsg = document.querySelector('.final-msg');

// Set up signature canvas
const signaturePad = new SignaturePad(signatureCanvas);
signaturePad.clear();

// Add event listeners
buttons.addEventListener('click', (e) => {
  if (e.target.classList.contains('cute-btn')) {
    generateCertificate();
  }
});

// Generate certificate function
function generateCertificate() {
  // Get user input
  const userName = profileName.textContent;
  const userPic = profilePic.src;

  // Create certificate HTML
  const certificateHTML = `
    <h1>Congratulations, ${userName}!</h1>
    <p>You have completed the course!</p>
    <img src="${userPic}" alt="Profile Picture">
    <canvas id="signature-canvas" width="300" height="100"></canvas>
  `;

  // Add certificate HTML to container
  certificateContainer.innerHTML = certificateHTML;

  // Show certificate container
  certificateContainer.style.display = 'block';

  // Animate certificate container
  certificateContainer.classList.add('animate-certificate');

  // Wait for animation to finish
  setTimeout(() => {
    // Show final message
    finalMsg.style.display = 'block';
    finalMsg.classList.add('animate-final-msg');
  }, 1000);
}

// Final message function
function showFinalMessage() {
  finalMsg.textContent = 'You did it!';
}
