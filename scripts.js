document.addEventListener('DOMContentLoaded', function() {
    const swiper = new Swiper('.swiper-container', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });

    // Loading animation visibility toggle
    window.addEventListener('load', function() {
        document.getElementById('loading').style.display = 'none';
        document.getElementById('content').style.display = 'block';
    });
});
