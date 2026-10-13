/*=============== PROJECTS SWIPER ===============*/
document.addEventListener('componentsLoaded', () => {
    const slider = document.querySelector(".projects-swiper");
    if (slider && !slider.dataset.swiperInitialized) {
        slider.dataset.swiperInitialized = 'true';
        var projectsSwiper = new Swiper(".projects-swiper", {
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

        /*=============== PROJECTS FILTER LOGIC ===============*/
        const filterItems = document.querySelectorAll('.work-item');
        const swiperSlides = document.querySelectorAll('.projects-swiper .swiper-slide');

        filterItems.forEach(item => {
            item.addEventListener('click', () => {
                filterItems.forEach(i => i.classList.remove('active-work'));
                item.classList.add('active-work');

                const filterValue = item.getAttribute('data-filter');

                swiperSlides.forEach(slide => {
                    if (filterValue === 'all' || slide.classList.contains(filterValue)) {
                        slide.style.display = '';
                    } else {
                        slide.style.display = 'none';
                    }
                });

                projectsSwiper.update();
            });
        });
    }
});
