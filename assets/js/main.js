/* ===========================
   Global Variables
   =========================== */
const state = {
    currentTestimonial: 0,
    currentStep: 0,
    mobileMenuOpen: false,
    cookiesAccepted: false
};

/* ===========================
   DOM Elements
   =========================== */
const elements = {
    mobileMenuToggle: document.querySelector('.mobile-menu-toggle'),
    navLinks: document.querySelector('.nav-links'),
    testimonialSlides: document.querySelectorAll('.testimonial-slide'),
    testimonialPrevBtn: document.querySelector('.testimonials-carousel .carousel-btn.prev'),
    testimonialNextBtn: document.querySelector('.testimonials-carousel .carousel-btn.next'),
    stepSlides: document.querySelectorAll('.step-slide'),
    paginationDots: document.querySelectorAll('.pagination-dot'),
    contactForm: document.getElementById('contactForm'),
    cookieBanner: document.getElementById('cookieBanner'),
    acceptCookiesBtn: document.getElementById('acceptCookies')
};

/* ===========================
   Mobile Navigation
   =========================== */
function initMobileNavigation() {
    if (!elements.mobileMenuToggle || !elements.navLinks) return;
    
    elements.mobileMenuToggle.addEventListener('click', toggleMobileMenu);
    
    // Close mobile menu when clicking on nav links
    const navLinkItems = elements.navLinks.querySelectorAll('a');
    navLinkItems.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (state.mobileMenuOpen && 
            !elements.mobileMenuToggle.contains(e.target) && 
            !elements.navLinks.contains(e.target)) {
            closeMobileMenu();
        }
    });
}

function toggleMobileMenu() {
    state.mobileMenuOpen = !state.mobileMenuOpen;
    elements.navLinks.classList.toggle('active', state.mobileMenuOpen);
    
    // Animate hamburger icon
    const spans = elements.mobileMenuToggle.querySelectorAll('span');
    if (state.mobileMenuOpen) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
    }
}

function closeMobileMenu() {
    state.mobileMenuOpen = false;
    elements.navLinks.classList.remove('active');
    
    // Reset hamburger icon
    const spans = elements.mobileMenuToggle.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
}

/* ===========================
   Smooth Scrolling
   =========================== */
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if href is just "#"
            if (href === '#') {
                e.preventDefault();
                return;
            }
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* ===========================
   Testimonials Carousel
   =========================== */
function initTestimonialsCarousel() {
    if (!elements.testimonialSlides || elements.testimonialSlides.length === 0) return;
    
    if (elements.testimonialPrevBtn) {
        elements.testimonialPrevBtn.addEventListener('click', showPreviousTestimonial);
    }
    
    if (elements.testimonialNextBtn) {
        elements.testimonialNextBtn.addEventListener('click', showNextTestimonial);
    }
    
    // Auto-advance every 5 seconds
    setInterval(showNextTestimonial, 5000);
}

function showTestimonial(index) {
    elements.testimonialSlides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });
    state.currentTestimonial = index;
}

function showNextTestimonial() {
    const nextIndex = (state.currentTestimonial + 1) % elements.testimonialSlides.length;
    showTestimonial(nextIndex);
}

function showPreviousTestimonial() {
    const prevIndex = (state.currentTestimonial - 1 + elements.testimonialSlides.length) % elements.testimonialSlides.length;
    showTestimonial(prevIndex);
}

/* ===========================
   Steps Carousel
   =========================== */
function initStepsCarousel() {
    if (!elements.stepSlides || elements.stepSlides.length === 0) return;
    
    elements.paginationDots.forEach((dot, index) => {
        dot.addEventListener('click', () => showStep(index));
    });
    
    // Auto-advance every 4 seconds
    setInterval(() => {
        const nextIndex = (state.currentStep + 1) % elements.stepSlides.length;
        showStep(nextIndex);
    }, 4000);
}

function showStep(index) {
    elements.stepSlides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });
    
    elements.paginationDots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
    
    state.currentStep = index;
}

/* ===========================
   Contact Form
   =========================== */
function initContactForm() {
    if (!elements.contactForm) return;
    
    elements.contactForm.addEventListener('submit', handleFormSubmit);
    
    // Add real-time validation
    const inputs = elements.contactForm.querySelectorAll('input[required], textarea[required]');
    inputs.forEach(input => {
        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('input', () => {
            if (input.classList.contains('invalid')) {
                validateField(input);
            }
        });
    });
}

function validateField(field) {
    const isValid = field.checkValidity();
    field.classList.toggle('invalid', !isValid);
    field.classList.toggle('valid', isValid);
    return isValid;
}

function validateForm() {
    const inputs = elements.contactForm.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });
    
    return isValid;
}

async function handleFormSubmit(e) {
    e.preventDefault();
    
    // Check honeypot field (spam protection)
    const honeypot = elements.contactForm.querySelector('input[name="website"]');
    if (honeypot && honeypot.value !== '') {
        // Likely a bot submission, silently ignore
        console.log('Spam detected');
        return;
    }
    
    // Validate form
    if (!validateForm()) {
        showNotification('Please fill in all required fields correctly', 'error');
        return;
    }
    
    // Get form data
    const formData = new FormData(elements.contactForm);
    const data = {
        name: formData.get('name'),
        company: formData.get('company') || null,
        email: formData.get('email'),
        phone: formData.get('phone') || null,
        message: formData.get('message'),
        source: 'website' // Optional: track form source
    };
    
    // Disable submit button
    const submitBtn = elements.contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
    
    try {
        // Send to Supabase backend
        await submitContactForm(data);
        
        showNotification('Message sent successfully! We will get back to you soon.', 'success');
        elements.contactForm.reset();
        
        // Remove validation classes
        const inputs = elements.contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.classList.remove('valid', 'invalid');
        });
        
    } catch (error) {
        showNotification('Failed to send message. Please try again later.', 'error');
        console.error('Form submission error:', error);
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
    }
}

async function submitContactForm(data) {
    try {
        console.log('Submitting form data:', data);
        
        // Use anon key for public client-side requests (service_role key should be server-side only)
        const response = await fetch('https://efjlxcrlttzwussbbjnw.supabase.co/functions/v1/save-contact-info', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVmamx4Y3JsdHR6d3Vzc2Jiam53Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzEyNDE3NTgsImV4cCI6MjA0NjgxNzc1OH0.MHlHqNj3AUYQ0eoX8bfz-4MPZe6oDuSv-ybElRG8kVY',
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVmamx4Y3JsdHR6d3Vzc2Jiam53Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzEyNDE3NTgsImV4cCI6MjA0NjgxNzc1OH0.MHlHqNj3AUYQ0eoX8bfz-4MPZe6oDuSv-ybElRG8kVY'
            },
            body: JSON.stringify(data)
        });
        
        console.log('Response status:', response.status);
        console.log('Response headers:', response.headers);
        
        if (!response.ok) {
            let errorMessage;
            try {
                const errorData = await response.json();
                errorMessage = errorData.error || errorData.message || JSON.stringify(errorData);
                console.error('Error response data:', errorData);
            } catch (e) {
                const errorText = await response.text();
                errorMessage = errorText;
                console.error('Error response text:', errorText);
            }
            throw new Error(`API Error (${response.status}): ${errorMessage}`);
        }
        
        const result = await response.json();
        console.log('Form submitted successfully:', result);
        return result;
    } catch (error) {
        console.error('Full error details:', error);
        
        // Check for specific error types
        if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
            throw new Error('Network error: Unable to connect to server. Please check your internet connection or try again later.');
        }
        
        throw error;
    }
}

/* ===========================
   Notifications
   =========================== */
function showNotification(message, type = 'info') {
    // Remove existing notification if any
    const existing = document.querySelector('.notification');
    if (existing) {
        existing.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 16px 24px;
        background-color: ${type === 'success' ? '#27AE60' : type === 'error' ? '#E74C3C' : '#3498DB'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        animation: slideIn 0.3s ease;
        max-width: 400px;
        font-size: 14px;
        font-weight: 500;
    `;
    
    // Add animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
    `;
    
    if (!document.querySelector('style[data-notification]')) {
        style.setAttribute('data-notification', '');
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

/* ===========================
   Cookie Banner
   =========================== */
function initCookieBanner() {
    if (!elements.cookieBanner || !elements.acceptCookiesBtn) return;
    
    // Check if cookies were already accepted
    const cookiesAccepted = localStorage.getItem('cookiesAccepted');
    
    if (!cookiesAccepted) {
        // Show cookie banner after a short delay
        setTimeout(() => {
            elements.cookieBanner.classList.add('show');
        }, 1000);
    }
    
    elements.acceptCookiesBtn.addEventListener('click', acceptCookies);
}

function acceptCookies() {
    localStorage.setItem('cookiesAccepted', 'true');
    state.cookiesAccepted = true;
    elements.cookieBanner.classList.remove('show');
    
    // Fade out animation
    elements.cookieBanner.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => {
        elements.cookieBanner.style.display = 'none';
    }, 300);
}

/* ===========================
   Scroll Animations
   =========================== */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe sections and cards
    const animatedElements = document.querySelectorAll('.section, .feature-card, .pricing-card, .comparison-column');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Add animation class styles
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
}

/* ===========================
   Utility Functions
   =========================== */
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
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/* ===========================
   Initialization
   =========================== */
function init() {
    // Initialize all components
    initMobileNavigation();
    initSmoothScrolling();
    initTestimonialsCarousel();
    initStepsCarousel();
    initContactForm();
    initCookieBanner();
    initScrollAnimations();
    
    console.log('theprote.in website initialized');
}

// Run initialization when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

/* ===========================
   Export for potential module use
   =========================== */
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        init,
        showNotification
    };
}
