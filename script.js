// Example JavaScript for smooth scrolling (optional)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const themeToggleCheckbox = document.querySelector('.toggle input[type="checkbox"]');
    const label = document.querySelector('.toggle .label');

    // Initialize the correct theme based on the current setting
    const currentTheme = document.body.getAttribute('data-theme');
    if (currentTheme === 'dark') {
        themeToggleCheckbox.checked = true;
    } else {
        themeToggleCheckbox.checked = false;
    }

    themeToggleCheckbox.addEventListener('change', () => {
        if (themeToggleCheckbox.checked) {
            document.body.setAttribute('data-theme', 'dark');
        } else {
            document.body.setAttribute('data-theme', 'light');
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('lang-toggle');
    const img = toggleBtn.querySelector('img'); // Ensure the image is correctly targeted
    let isAnimating = false; // Flag to block clicks during animation

    toggleBtn.addEventListener('click', () => {
        // If an animation is currently in progress, ignore the click
        if (isAnimating) return;

        // Set the animation flag
        isAnimating = true;

        // Start the slide-out animation
        img.classList.add('slide-out');

        // Wait for the slide-out animation to finish before switching the flag and updating the image
        setTimeout(() => {
            const isEnglish = img.alt.includes('Change Language');
            const newSrc = isEnglish ? 'images/br-flag.png' : 'images/us-flag.png';
            const newAlt = isEnglish ? 'Mudar idioma para Português' : 'Change Language';

            // Update the image src and alt text
            img.src = newSrc;
            img.alt = newAlt;

            // Switch the language attribute on the body
            const langData = isEnglish ? 'pt' : 'en';
            document.body.setAttribute('lang', langData);

            // Iterate over all elements that need to be updated with language data
            document.querySelectorAll('[data-en], [data-pt]').forEach(el => {
                if (el.tagName === 'P' && el.querySelector('a[href^="mailto:"]')) {
                    const emailLink = el.querySelector('a');
                    const emailHtml = emailLink.outerHTML;
                    el.innerHTML = el.getAttribute(`data-${langData}`) + ' ' + emailHtml;
                } else if (el.tagName === 'TITLE') {
                    document.title = el.getAttribute(`data-${langData}`);
                } else {
                    el.textContent = el.dataset[langData];
                }
            });

            // After setting the new src, start the slide-in animation
            img.classList.remove('slide-out');
            img.classList.add('slide-in');

            // Remove the slide-in class after the animation finishes and allow clicking again
            setTimeout(() => {
                img.classList.remove('slide-in');
                isAnimating = false; // Reset the animation flag
            }, 500);
        }, 500);

        // Debug: log the image source to console
        console.log(`Switching to image: ${newSrc}`);
    });
});