/*=============== POST SWIPER ===============*/
document.addEventListener('componentsLoaded', () => {
    initPostSwipers();
});

// Also run immediately in case components are already loaded
initPostSwipers();

function initPostSwipers() {
    if (document.querySelector(".post-hero-swiper") && !document.querySelector(".post-hero-swiper").classList.contains("swiper-initialized")) {
        new Swiper(".post-hero-swiper", {
            spaceBetween: 24,
            slidesPerView: 1,
            grabCursor: true,
            pagination: {
                el: ".hero-pagination",
                clickable: true,
            },
        });
    }

    if (document.querySelector(".post-features-swiper") && !document.querySelector(".post-features-swiper").classList.contains("swiper-initialized")) {
        new Swiper(".post-features-swiper", {
            spaceBetween: 24,
            slidesPerView: 1.15,
            grabCursor: true,
            pagination: {
                el: ".features-pagination",
                clickable: true,
            },
            breakpoints: {
                576: {
                    slidesPerView: 1.5,
                },
                768: {
                    slidesPerView: 2.2,
                },
                1024: {
                    slidesPerView: 3.2,
                },
                2560: {
                    slidesPerView: 4.2,
                }
            },
        });
    }
}
