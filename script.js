// script.js

let animationContainer = document.querySelector('.animation-container');
let yesBtn = document.querySelector('#yes-btn');
let noBtn = document.querySelector('#no-btn');
let certificateContainer = document.querySelector('.certificate-container');
let yesCertBtn = document.querySelector('#yes-cert-btn');
let noCertBtn = document.querySelector('#no-cert-btn');
let finalMsg = document.querySelector('.final-msg');

animationContainer.addEventListener('animationend', () => {
    yesBtn.style.display = 'block';
    noBtn.style.display = 'block';
});

yesBtn.addEventListener('click', () => {
    certificateContainer.style.display = 'block';
    yesBtn.style.display = 'none';
    noBtn.style.display = 'none';
});

noBtn.addEventListener('click', () => {
    alert("Aww, come on! Click yes! 😏");
});

yesCertBtn.addEventListener('click', () => {
    finalMsg.style.display = 'block';
    certificateContainer.style.display = 'none';
});

noCertBtn.addEventListener('click', () => {
    alert("No way! You have to say yes! 😂");
});
