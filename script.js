// ============================================
// Mobile Menu Toggle
// ============================================
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle mobile menu
if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        mobileMenuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a nav link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    const isClickInsideNav = navMenu.contains(e.target);
    const isClickOnToggle = mobileMenuToggle.contains(e.target);
    
    if (!isClickInsideNav && !isClickOnToggle && navMenu.classList.contains('active')) {
        mobileMenuToggle.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// ============================================
// Smooth Scroll Navigation
// ============================================
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        
        // Only handle smooth scroll for anchor links
        if (href.startsWith('#')) {
            e.preventDefault();
            const targetId = href.substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ============================================
// Sticky Header on Scroll
// ============================================
const header = document.getElementById('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// ============================================
// Active Navigation Link Highlighting
// ============================================
const sections = document.querySelectorAll('section[id]');

function highlightActiveSection() {
    const scrollY = window.pageYOffset;
    const headerHeight = header.offsetHeight;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - headerHeight - 50;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightActiveSection);

// ============================================
// Click-to-Call Functionality
// ============================================
const phoneLinks = document.querySelectorAll('a[href^="tel:"]');

phoneLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        // The tel: protocol will handle the call on mobile devices
        // On desktop, it may open a dialer or do nothing
        // This is expected behavior
        console.log('Calling:', link.getAttribute('href'));
    });
});

// ============================================
// Scroll Animation (Lightweight)
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for scroll animation
const animateElements = document.querySelectorAll('.product-card, .review-card, .contact-item');

animateElements.forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(el);
});

// ============================================
// Form Validation (if contact form is added later)
// ============================================
// This is a placeholder for future form functionality
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.style.borderColor = 'red';
        } else {
            input.style.borderColor = '';
        }
    });
    
    return isValid;
}

// ============================================
// Initialize on DOM Load
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Highlight first section on page load
    highlightActiveSection();
    
    // Set initial header shadow
    if (window.pageYOffset > 100) {
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    }
    
    console.log('Murugan Store website loaded successfully!');
});
