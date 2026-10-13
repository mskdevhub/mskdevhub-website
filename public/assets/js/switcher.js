/*=============== STYLE SWITCHER ===============*/
document.addEventListener('componentsLoaded', () => {
    const styleSwitcher = document.getElementById('style-switcher'),
        switcherToggle = document.getElementById('switcher-toggle'),
        switcherClose = document.getElementById('switcher-close');

    /* Switcher show */
    if (switcherToggle) {
        switcherToggle.addEventListener('click', () => {
            styleSwitcher.classList.add('show-switcher');
        });
    }
    /* Switcher hidden */
    if (switcherClose) {
        switcherClose.addEventListener('click', () => {
            styleSwitcher.classList.remove('show-switcher');
        });
    }

    /*=============== THEME COLORS ===============*/
    const colors = document.querySelectorAll('.style-switcher-color');

    colors.forEach((color) => {
        color.onclick = () => {
            const activeColor = color.style.getPropertyValue('--hue');
            colors.forEach((c) => c.classList.remove('active-color'));
            color.classList.add('active-color');

            document.documentElement.style.setProperty('--hue', activeColor);
        };
    });

    /*=============== LIGHT/DARK MODE ===============*/
    let currentTheme = 'light';

    const applyTheme = (theme) => {
        // Preserve any existing body classes; only toggle the theme class.
        document.body.classList.remove('light', 'dark');
        document.body.classList.add(theme);
    };

    applyTheme(currentTheme);

    document.querySelectorAll('input[name="body-theme"]').forEach((input) => {
        input.addEventListener('change', () => {
            currentTheme = input.value;
            applyTheme(currentTheme);
        });
    });
});
