/*=============== CONTACT ===============*/
document.addEventListener('componentsLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm || contactForm.dataset.bound === 'true') return;
    contactForm.dataset.bound = 'true';

    // Prefer EmailJS when the site is configured with it.
    if (typeof sendEmail === 'function') {
        contactForm.addEventListener('submit', sendEmail);
        return;
    }

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const message = document.getElementById('message');
        const name = document.getElementById('contact-name')?.value.trim();
        const email = document.getElementById('contact-email')?.value.trim();
        const subject = document.getElementById('contact-subject')?.value.trim();
        const msg = document.getElementById('contact-message')?.value.trim();

        const setMessage = (text, color) => {
            if (message) {
                message.textContent = text;
                message.style.color = color;
            }
        };

        if (!name || !email || !subject || !msg) {
            setMessage('Please fill out all required fields.', 'red');
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setMessage('Please enter a valid email address.', 'red');
            return;
        }

        const submitBtn = contactForm.querySelector('button[type="submit"]');
        if (submitBtn) submitBtn.disabled = true;
        setMessage('Sending message...', 'var(--text-color)');

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, subject, message: msg })
            });

            if (!response.ok) throw new Error(`Request failed with status ${response.status}`);

            setMessage('Message sent successfully! I will get back to you soon.', 'green');
            contactForm.reset();
            setTimeout(() => setMessage('', ''), 6000);
        } catch (error) {
            console.error('Contact form submission failed:', error);
            setMessage('Sorry, the message could not be sent. Please email mskreallabs@gmail.com instead.', 'red');
        } finally {
            if (submitBtn) submitBtn.disabled = false;
        }
    });
});
