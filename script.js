// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.offsetTop - navHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background on scroll
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.style.background = 'rgba(10, 10, 15, 0.95)';
    } else {
        navbar.style.background = 'rgba(10, 10, 15, 0.8)';
    }

    lastScroll = currentScroll;
});

// Add active state to navigation links based on scroll position
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveNavLink() {
    const scrollPosition = window.scrollY + 150;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);
window.addEventListener('load', updateActiveNavLink);

// Intersection Observer for fade-in animations
const fadeInObserverOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const fadeInElements = document.querySelectorAll('.job-card, .contact-card, .capability-column, .about-content, .section-title, .section-label');

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, fadeInObserverOptions);

fadeInElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    fadeInObserver.observe(element);
});

// Prevent default behavior for info cards (non-clickable)
document.querySelectorAll('.info-card').forEach(card => {
    card.addEventListener('click', (e) => {
        e.preventDefault();
    });
});

// Number counter animation for stats
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const animateValue = (element, start, end, duration, suffix = '') => {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);

        // Easing function for smooth animation
        const easeOutQuad = progress * (2 - progress);
        const current = Math.floor(easeOutQuad * (end - start) + start);

        element.textContent = current + suffix;

        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            entry.target.classList.add('animated');
            const text = entry.target.textContent;

            // Parse the number from the stat
            if (text.includes('%')) {
                const num = parseInt(text.replace(/[^0-9]/g, ''));
                animateValue(entry.target, 0, num, 2000, '%');
            } else if (text.includes('M')) {
                const num = parseFloat(text.replace(/[^0-9.]/g, ''));
                let current = 0;
                const interval = setInterval(() => {
                    current += 0.1;
                    if (current >= num) {
                        current = num;
                        clearInterval(interval);
                    }
                    entry.target.textContent = '€' + current.toFixed(1) + 'M';
                }, 30);
            } else if (text.includes('+')) {
                const num = parseInt(text.replace(/[^0-9]/g, ''));
                animateValue(entry.target, 0, num, 2000, '+');
            }
        }
    });
}, observerOptions);

// Observe all stat values
document.querySelectorAll('.stat-value').forEach(stat => {
    statsObserver.observe(stat);
});

// Add subtle parallax effect to hero background
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero');
            if (hero && scrolled < window.innerHeight) {
                hero.style.transform = `translateY(${scrolled * 0.3}px)`;
            }
            ticking = false;
        });
        ticking = true;
    }
});
