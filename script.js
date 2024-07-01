// Hamburger Menu Toggle
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    nav.classList.toggle('active');
});

// Scroll Animation
const scrollFadeElements = document.querySelectorAll('.scroll-fade');

window.addEventListener('scroll', () => {
    scrollFadeElements.forEach((element) => {
        const elementTop = element.offsetTop;
        const elementHeight = element.offsetHeight;
        const windowHeight = window.innerHeight;
        const windowScrollTop = window.scrollY;

        if (windowScrollTop > (elementTop + elementHeight - windowHeight)) {
            element.classList.add('in-view');
        } else {
            element.classList.remove('in-view');
        }
    });
});

// Contact Form Submission
const form = document.getElementById('contact-form');
const submitButton = document.getElementById('submit-button');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const xhr = new XMLHttpRequest();

    xhr.open('POST', 'https://example.com/contact', true);
    xhr.send(formData);

    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';

    xhr.onload = () => {
        if (xhr.status === 200) {
            submitButton.disabled = false;
            submitButton.textContent = 'Send';
            alert('Message sent successfully!');
        } else {
            submitButton.disabled = false;
            submitButton.textContent = 'Send';
            alert('Error sending message. Please try again.');
        }
    };
});
