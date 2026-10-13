/*=============== SKILLS SWIPER ===============*/
document.addEventListener('componentsLoaded', () => {
    const slider = document.querySelector(".skills-swiper");
    if (slider && !slider.dataset.swiperInitialized) {
        slider.dataset.swiperInitialized = 'true';
        var skillsSwiper = new Swiper(".skills-swiper", {
            spaceBetween: 24,
            slidesPerView: 1.15,
            grabCursor: true,
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
            breakpoints: {
                576: {
                    slidesPerView: 1.5,
                    spaceBetween: 24,
                },
                768: {
                    slidesPerView: 2.2,
                    spaceBetween: 28,
                },
                1024: {
                    slidesPerView: 3.2,
                    spaceBetween: 32,
                },
                2560: {
                    slidesPerView: 4.2,
                    spaceBetween: 36,
                },
            },
        });
    }
});
