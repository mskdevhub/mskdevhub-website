/*=============== RESUME ACCORDION ===============*/
document.addEventListener('componentsLoaded', () => {
    const resumeItems = document.querySelectorAll('.resume-item');
    
    resumeItems.forEach((item) => {
        const header = item.querySelector('.resume-header');
        const content = item.querySelector('.resume-content');
        const icon = item.querySelector('.resume-icon i');
        
        if (header && content) {
            header.addEventListener('click', () => {
                const isOpen = item.classList.contains('resume-active');
                
                // Close all other items
                resumeItems.forEach((otherItem) => {
                    otherItem.classList.remove('resume-active');
                    const otherContent = otherItem.querySelector('.resume-content');
                    const otherIcon = otherItem.querySelector('.resume-icon i');
                    if (otherContent) otherContent.style.height = '0';
                    if (otherIcon) {
                        otherIcon.classList.remove('ri-subtract-line');
                        otherIcon.classList.add('ri-add-line');
                    }
                });

                // Toggle current item
                if (!isOpen) {
                    item.classList.add('resume-active');
                    content.style.height = content.scrollHeight + 'px';
                    if (icon) {
                        icon.classList.remove('ri-add-line');
                        icon.classList.add('ri-subtract-line');
                    }
                }
            });
        }
    });
});
