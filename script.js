// script.js

let yesBtn = document.querySelector('#yes-btn');
let noBtn = document.querySelector('#no-btn');
let certificateContainer = document.querySelector('.certificate-container');
let signBtn = document.querySelector('#sign-btn');
let signatureCanvas = document.querySelector('#signature-canvas');
let finalMsg = document.querySelector('.final-msg');

yesBtn.addEventListener('click', () => {
    certificateContainer.style.display = 'block';
    yesBtn.style.display = 'none';
    noBtn.style.display = 'none';
});

noBtn.addEventListener('click', () => {
    alert("Aww, come on! Click yes!");
});

signBtn.addEventListener('click', () => {
    let signature = signatureCanvas.toDataURL();
    // Send the signature to Telegram using the Telegram API
    fetch('https://api.telegram.org/bot6690815586:AAFh5kcrmt7Heggp-Syg66FDlGP9idUzQEI/sendMessage', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            chat_id: '5456798232',
            text: 'Bestie Certificate Signature:',
            parse_mode: 'Markdown',
            disable_notification: true,
            reply_markup: {
                remove_keyboard: true
            }
        })
    })
    .then(response => response.json())
    .then(data => {
        fetch('https://api.telegram.org/bot6690815586:AAFh5kcrmt7Heggp-Syg66FDlGP9idUzQEI/sendPhoto', {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            body: new URLSearchParams({
                chat_id: '5456798232',
                photo: signature
            })
        })
        .then(response => response.json())
        .then(data => {
            finalMsg.style.display = 'block';
            certificateContainer.style.display = 'none';
        });
    });
});

// Initialize the signature canvas
let signature = new SignaturePad(signatureCanvas);

signature.addEventListener('beginStroke', () => {
    signatureCanvas.style.cursor = 'crosshair';
});

signature.addEventListener('endStroke', () => {
    signatureCanvas.style.cursor = 'default';
});
