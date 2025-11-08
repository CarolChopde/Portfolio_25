// Initialize Lucide icons
lucide.createIcons();

// Active section tracking
let activeSection = 'about';

// Scroll to section function
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        updateActiveNav(sectionId);
    }
}

// Scroll to top function
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Update active navigation link
function updateActiveNav(sectionId) {
    activeSection = sectionId;
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === sectionId) {
            link.classList.add('active');
        }
    });
}

// Handle scroll events
let scrollTimeout;
window.addEventListener('scroll', () => {
    // Show/hide scroll to top button
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    if (window.scrollY > 400) {
        scrollTopBtn.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('show');
    }
    
    // Update active section based on scroll position
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        const sections = ['about', 'education', 'projects', 'achievements', 'contact'];
        const scrollPosition = window.scrollY + 100;
        
        for (const sectionId of sections) {
            const element = document.getElementById(sectionId);
            if (element) {
                const rect = element.getBoundingClientRect();
                const elementTop = rect.top + window.scrollY;
                const elementBottom = elementTop + rect.height;
                
                if (scrollPosition >= elementTop && scrollPosition < elementBottom) {
                    if (activeSection !== sectionId) {
                        updateActiveNav(sectionId);
                    }
                    break;
                }
            }
        }
    }, 100);
});

// Contact form handling
const contactForm = document.getElementById('contactForm');
const submitText = document.getElementById('submitText');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    if (!name || !email || !message) {
        alert('Please fill in all fields');
        return;
    }
    
    // Simulate form submission
    submitText.textContent = 'Message Sent!';
    
    // Reset form after 3 seconds
    setTimeout(() => {
        contactForm.reset();
        submitText.textContent = 'Send Message';
    }, 3000);
});

// Intersection Observer for animations (optional enhancement)
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

// Observe cards for fade-in animation
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.timeline-card, .project-card, .achievement-card, .social-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
    
    // Initialize icons after DOM is loaded
    lucide.createIcons();
});

// Handle smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});