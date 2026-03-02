/* ═══════════════════════════════════════════════
   Shared Slide Navigation
   Auto-generates nav dots, keyboard nav, counter
   ═══════════════════════════════════════════════ */

(function () {
    const slides = document.querySelectorAll('.slide');
    const navDots = document.getElementById('navDots');
    const navCounter = document.getElementById('navCounter');

    if (!slides.length || !navDots || !navCounter) return;

    // Generate nav dots
    slides.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.className = 'nav-dot' + (i === 0 ? ' active' : '');
        dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
        dot.onclick = () => slides[i].scrollIntoView({ behavior: 'smooth' });
        navDots.appendChild(dot);
    });

    // Assign stagger index to reveal elements (top-to-bottom order)
    slides.forEach(slide => {
        slide.querySelectorAll('.reveal, .reveal-scale, .reveal-left, .reveal-blur')
            .forEach((el, i) => el.style.setProperty('--i', i));
    });

    // Track active slide via IntersectionObserver
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Toggle visible class for reveal animations
            entry.target.classList.toggle('visible', entry.isIntersecting);

            if (entry.isIntersecting) {
                const idx = [...slides].indexOf(entry.target);
                document.querySelectorAll('.nav-dot').forEach((d, i) =>
                    d.classList.toggle('active', i === idx)
                );
                navCounter.textContent = `${idx + 1} / ${slides.length}`;
            }
        });
    }, { threshold: 0.5 });

    slides.forEach(s => observer.observe(s));

    // Keyboard navigation
    document.addEventListener('keydown', e => {
        // Don't intercept when editing content
        if (document.body.classList.contains('edit-active') &&
            e.target.hasAttribute('contenteditable')) return;

        const dots = document.querySelectorAll('.nav-dot');
        const current = [...dots].findIndex(d => d.classList.contains('active'));

        if (e.key === 'ArrowDown' || e.key === 'ArrowRight' || e.key === ' ') {
            e.preventDefault();
            if (current < slides.length - 1)
                slides[current + 1].scrollIntoView({ behavior: 'smooth' });
        } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
            e.preventDefault();
            if (current > 0)
                slides[current - 1].scrollIntoView({ behavior: 'smooth' });
        }
    });
})();
