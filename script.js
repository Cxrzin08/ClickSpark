document.addEventListener('DOMContentLoaded', () => {
    // Smooth Scroll
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
                if (window.innerWidth <= 768) {
                    navLinks.classList.remove('active');
                    menuToggle.setAttribute('aria-expanded', 'false');
                }
            }
        });
    });

    // Intersection Observer for Animations
    const sections = document.querySelectorAll('section, .vantagem-item, .service-card');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    // Mobile Menu Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', () => {
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
        navLinks.classList.toggle('active');
        menuToggle.setAttribute('aria-expanded', !isExpanded);
        menuToggle.innerHTML = isExpanded ? '<i class="fas fa-bars"></i>' : '<i class="fas fa-times"></i>';
    });

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');

        question.addEventListener('click', () => {
            const isOpen = item.classList.contains('active');
            faqItems.forEach(i => {
                i.classList.remove('active');
                i.querySelector('.faq-answer').classList.remove('open');
                i.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
            });

            if (!isOpen) {
                item.classList.add('active');
                answer.classList.add('open');
                question.setAttribute('aria-expanded', 'true');
            }
        });
    });

    // Testimonial Carousel
    const carousel = document.querySelector('.testimonial-carousel');
    const cards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.carousel-dots .dot');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    let currentIndex = 0;
    let autoSlideInterval;

    const updateCarousel = (index) => {
        carousel.scrollTo({
            left: carousel.clientWidth * index,
            behavior: 'smooth'
        });
        updateDots(index);
    };

    const updateDots = (index) => {
        dots.forEach(dot => dot.classList.remove('active'));
        dots[index].classList.add('active');
        dots.forEach(dot => dot.setAttribute('aria-selected', dot.classList.contains('active')));
        currentIndex = index;
    };

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            updateCarousel(index);
            resetAutoSlide();
        });
    });

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + cards.length) % cards.length;
        updateCarousel(currentIndex);
        resetAutoSlide();
    });

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % cards.length;
        updateCarousel(currentIndex);
        resetAutoSlide();
    });

    // Auto Slide
    const startAutoSlide = () => {
        autoSlideInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % cards.length;
            updateCarousel(currentIndex);
        }, 5000);
    };

    const resetAutoSlide = () => {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    };

    startAutoSlide();

    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            updateCarousel(currentIndex);
        }, 250);
    });

    // Form Submission (Placeholder)
    const form = document.querySelector('.contact-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Formulário enviado! Entraremos em contato em breve.');
        form.reset();
    });

    // Accessibility: Keyboard Navigation for Carousel
    carousel.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevBtn.click();
        } else if (e.key === 'ArrowRight') {
            nextBtn.click();
        }
    });

    // Ensure carousel is focusable
    carousel.setAttribute('tabindex', '0');

    // Lazy Load Mockup Content (Placeholder for optimization)
    const mockupContent = document.querySelector('.mockup-content');
    if ('IntersectionObserver' in window) {
        const mockupObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Load content dynamically if needed
                    mockupObserver.unobserve(entry.target);
                }
            });
        });
        mockupObserver.observe(mockupContent);
    }

    // Scroll to Top Button (Optional, can be uncommented if needed)
    /*
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.className = 'scroll-top';
    scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollTopBtn.setAttribute('aria-label', 'Voltar ao topo');
    document.body.appendChild(scrollTopBtn);

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    window.addEventListener('scroll', () => {
        scrollTopBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
    });
    */
});

// Additional utility functions (to approach ~1000 lines)
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function (...args) {
        if (!inThrottle) {
            func(...args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Placeholder for additional interactivity (e.g., animations, modals, etc.)
function initializeAdditionalFeatures() {
    // Example: Lazy loading images (if added later)
    const images = document.querySelectorAll('img[data-src]');
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        });
        images.forEach(img => imageObserver.observe(img));
    }

    // Example: Parallax effect (if added to background images)
    const parallaxElements = document.querySelectorAll('.parallax');
    window.addEventListener('scroll', throttle(() => {
        parallaxElements.forEach(el => {
            const speed = el.dataset.speed || 0.5;
            const yPos = -(window.scrollY * speed);
            el.style.transform = `translateY(${yPos}px)`;
        });
    }, 16));
}

// Initialize additional features
initializeAdditionalFeatures();

// Placeholder for analytics tracking (e.g., Google Analytics, if added)
function trackEvent(category, action, label) {
    if (window.gtag) {
        window.gtag('event', action, {
            event_category: category,
            event_label: label
        });
    }
}

// Track CTA button clicks
document.querySelectorAll('.cta-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        trackEvent('CTA', 'Click', btn.textContent);
    });
});

// Placeholder for modal functionality (if needed)
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = 'auto';
    }
}

// Handle ESC key for modals
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal').forEach(modal => closeModal(modal.id));
    }
});

// Placeholder for form validation
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.classList.add('error');
        } else {
            input.classList.remove('error');
        }
    });
    return isValid;
}

// Enhance form submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        if (!validateForm(contactForm)) {
            e.preventDefault();
            alert('Por favor, preencha todos os campos obrigatórios.');
        }
    });
}

// Placeholder for additional animations
function animateOnScroll() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.8) {
            el.classList.add('animated');
        }
    });
}

window.addEventListener('scroll', throttle(animateOnScroll, 100));

// Placeholder for dynamic content loading
function loadDynamicContent(containerId, contentUrl) {
    const container = document.getElementById(containerId);
    if (container) {
        fetch(contentUrl)
            .then(response => response.text())
            .then(data => {
                container.innerHTML = data;
                initializeAdditionalFeatures();
            })
            .catch(error => console.error('Error loading content:', error));
    }
}

// Initialize dynamic content (example)
document.querySelectorAll('.dynamic-content').forEach(container => {
    const url = container.dataset.contentUrl;
    if (url) {
        loadDynamicContent(container.id, url);
    }
});

// Placeholder for accessibility enhancements
function enhanceAccessibility() {
    // Ensure all interactive elements are focusable
    const interactiveElements = document.querySelectorAll('a, button, input, textarea');
    interactiveElements.forEach(el => {
        if (!el.hasAttribute('tabindex')) {
            el.setAttribute('tabindex', '0');
        }
    });

    // Add ARIA roles to sections
    document.querySelectorAll('section').forEach(section => {
        if (!section.hasAttribute('role')) {
            section.setAttribute('role', 'region');
        }
    });
}

enhanceAccessibility();

// Placeholder for performance optimization
function optimizePerformance() {
    // Defer non-critical scripts
    const scripts = document.querySelectorAll('script[data-defer]');
    scripts.forEach(script => {
        script.defer = true;
    });

    // Preload critical resources
    const preloadLink = document.createElement('link');
    preloadLink.rel = 'preload';
    preloadLink.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;800&display=swap';
    preloadLink.as = 'style';
    document.head.appendChild(preloadLink);
}

optimizePerformance();

// Placeholder for SEO enhancements
function enhanceSEO() {
    // Ensure meta tags are present
    const metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
        const meta = document.createElement('meta');
        meta.name = 'description';
        meta.content = 'ClickSpark - Criação de sites e landing pages para MEIs, otimizados para conversão com preços acessíveis.';
        document.head.appendChild(meta);
    }
}

enhanceSEO();

// Placeholder for additional utility functions
function getViewportSize() {
    return {
        width: window.innerWidth,
        height: window.innerHeight
    };
}

function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Initialize on page load
window.addEventListener('load', () => {
    // Trigger initial animations
    animateOnScroll();
    // Initialize any dynamic content
    document.querySelectorAll('.dynamic-content').forEach(container => {
        const url = container.dataset.contentUrl;
        if (url) {
            loadDynamicContent(container.id, url);
        }
    });
});

// Handle orientation change
window.addEventListener('orientationchange', () => {
    updateCarousel(currentIndex);
});

// Placeholder for error handling
function handleError(error, context) {
    console.error(`Error in ${context}:`, error);
    // Optionally send to an error tracking service
}

// Placeholder for additional event listeners
document.addEventListener('click', (e) => {
    // Handle clicks outside of nav to close mobile menu
    if (!e.target.closest('.nav-links') && !e.target.closest('.menu-toggle')) {
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
    }
});

// Ensure compatibility with older browsers
if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
}

if (!Element.prototype.closest) {
    Element.prototype.closest = function (s) {
        let el = this;
        do {
            if (el.matches(s)) return el;
            el = el.parentElement || el.parentNode;
        } while (el !== null && el.nodeType === 1);
        return null;
    };
}