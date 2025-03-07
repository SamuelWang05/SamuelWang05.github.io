document.addEventListener('DOMContentLoaded', function () {
    const observerOptions = {
        root: null, // Observe changes relative to the viewport
        rootMargin: '0px', // No margin around the root
        threshold: 0.1 // Trigger when 10% of the element is visible
    };

    const fadeInObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target); // Stop observing once visible
                }, index * 300); // Stagger the fade-in effect by 300ms per element
            }
        });
    }, observerOptions);

    // Select elements to observe
    const fadeElements = document.querySelectorAll('.intro img, .intro .text-container, .fade-in, .link-box');
    fadeElements.forEach((element, index) => {
        fadeInObserver.observe(element);
    });
});