document.addEventListener('componentsLoaded', () => {
/*=============== MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
    navToggle = document.getElementById('nav-toggle');

/* Menu show - hidden */
if (navToggle) {
    navToggle.addEventListener('click', () => {
        const isOpen = navMenu.classList.toggle('show-menu');
        navToggle.classList.toggle('animate-toggle');
        navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav-link');
const linkAction = () => {
    const navMenu = document.getElementById('nav-menu');

    if (navToggle) {
        navToggle.classList.remove('animate-toggle');
        navToggle.setAttribute('aria-expanded', 'false');
    }
    navMenu.classList.remove('show-menu')
};
navLink.forEach((n) => n.addEventListener('click', linkAction))

/*=============== CHANGE BACKGROUND HEADER ===============*/
const scrollHeader = () => {
    const header = document.getElementById('header');
    window.scrollY >= 20 ? header.classList.add('bg-header')
        : header.classList.remove('bg-header');
};

    /*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
    const sections = document.querySelectorAll('section[id]');

    const scrollActive = () => {
        const scrollY = window.pageYOffset;

        sections.forEach((current)=>{
            const sectionHeight = current.offsetHeight,
            sectionTop = current.offsetTop - 58,
            sectionId = current.getAttribute('id'),
            sectionsClass = document.querySelector('.nav-menu a[href*='+ sectionId +']')

            if (sectionsClass) {
                if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
                    sectionsClass.classList.add('active-link');
                }else{
                    sectionsClass.classList.remove('active-link');
                }
            }
        })
    };

    /*=============== OPTIMIZED SCROLL EVENT ===============*/
    let isScrolling = false;
    window.addEventListener('scroll', () => {
        if (!isScrolling) {
            window.requestAnimationFrame(() => {
                scrollHeader();
                scrollActive();
                isScrolling = false;
            });
            isScrolling = true;
        }
    });
});
