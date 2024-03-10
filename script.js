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
    const img = toggleBtn.querySelector('img');
    let isAnimating = false;

    // Function to update text contents based on the current language
    function updateTextContent(lang) {
        document.querySelectorAll('[data-en], [data-pt]').forEach(el => {
            const content = el.getAttribute(`data-${lang}`); // Get content for the current language
            if (el.querySelector('a[href^="mailto:"]')) {
                const emailLink = el.querySelector('a');
                const wrapper = document.createElement('span'); // Create a span to wrap text content
                wrapper.textContent = content;
                // Replace all child nodes except the email link with the new wrapper
                el.childNodes.forEach(node => {
                    if (node !== emailLink) {
                        el.removeChild(node);
                    }
                });
                el.insertBefore(wrapper, emailLink); // Insert the text content before the email link
            } else {
                el.textContent = content; // Update text content
            }
        });
    }

    // Initialize the page content in English
    updateTextContent('en');

    toggleBtn.addEventListener('click', () => {
        if (isAnimating) return;

        isAnimating = true;
        img.classList.add('slide-out');

        setTimeout(() => {
            const isEnglish = img.alt.includes('Change Language');
            const newSrc = isEnglish ? 'images/br-flag.png' : 'images/us-flag.png';
            const newAlt = isEnglish ? 'Mudar idioma para Português' : 'Change Language';

            img.src = newSrc;
            img.alt = newAlt;

            const langData = isEnglish ? 'pt' : 'en';
            document.body.setAttribute('lang', langData);

            // Update the text contents based on the newly selected language
            updateTextContent(langData);

            img.classList.remove('slide-out');
            img.classList.add('slide-in');

            setTimeout(() => {
                img.classList.remove('slide-in');
                isAnimating = false;
            }, 500);
        }, 500);
    });
});

document.getElementById('linkToAbout').addEventListener('click', function(e) {
    e.preventDefault();
    var aboutSection = document.getElementById('about');
    var offsetPosition = aboutSection.getBoundingClientRect().top + window.scrollY - 117.5;
    window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
    });
});