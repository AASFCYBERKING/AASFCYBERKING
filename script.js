// Get the certificate container element
const certificateContainer = document.getElementById('certificate-container');

// Function to generate the certificate
function generateCertificate(name1, name2, tomImageSrc, jerryImageSrc) {
  // Create the Tom and Jerry images
  const tomImage = document.createElement('img');
  tomImage.src = tomImageSrc;
  tomImage.className = 'tom-image';

  const jerryImage = document.createElement('img');
  jerryImage.src = jerryImageSrc;
  jerryImage.className = 'jerry-image';

  // Create the certificate header
  const certificateHeader = document.createElement('div');
  certificateHeader.className = 'certificate-header';

  const headerText = document.createElement('h1');
  headerText.textContent = 'Bestie Certificate';
  certificateHeader.appendChild(headerText);

  // Create the certificate content
  const certificateContent = document.createElement('div');
  certificateContent.className = 'certificate-content';

  const contentText = document.createElement('p');
  contentText.textContent = `This is to certify that ${name1} and ${name2} are the best of friends.`;
  certificateContent.appendChild(contentText);

  // Create the signature section
  const signatureSection = document.createElement('div');
  signatureSection.className = 'signature-section';

  const signatureText = document.createElement('h2');
  signatureText.textContent = 'Signatures';
  signatureSection.appendChild(signatureText);

  const signature1 = document.createElement('div');
  signature1.className = 'signature';
  signature1.textContent = name1;

  const signature2 = document.createElement('div');
  signature2.className = 'signature';
  signature2.textContent = name2;

  signatureSection.appendChild(signature1);
  signatureSection.appendChild(signature2);

  // Add the elements to the certificate container
  certificateContainer.appendChild(tomImage);
  certificateContainer.appendChild(jerryImage);
  certificateContainer.appendChild(certificateHeader);
  certificateContainer.appendChild(certificateContent);
  certificateContainer.appendChild(signatureSection);
}

// Call the function to generate the certificate
generateCertificate('Kishore', 'Darshu Nursu', 'https://graph.org/file/95407856d90d07698abf4.jpg', 'https://graph.org/file/fe1eafb93b8afbac157f6.jpg');
