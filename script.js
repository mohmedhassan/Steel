// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const mobileNav = document.getElementById('mobileNav');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    mobileNav.classList.toggle('active');
});

// Close mobile menu when clicking a link
const mobileLinks = document.querySelectorAll('.nav-link-mobile, .nav-mobile .btn');
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        mobileNav.classList.remove('active');
    });
});

// Smooth Scrolling for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerOffset = 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Header scroll effect
const header = document.getElementById('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// Contact Form Submission
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Show toast notification
    showToast('Thank you! We\'ll get back to you within 24 hours.');
    
    // Reset form
    contactForm.reset();
});

// Toast Notification Function
function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Add fade-in animation to cards
const animateElements = document.querySelectorAll('.product-card, .value-card, .process-step, .testimonial-card, .news-card');
animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Newsletter subscription
const newsletterInput = document.querySelector('.newsletter-input');
const newsletterBtn = document.querySelector('.newsletter-btn');

if (newsletterBtn) {
    newsletterBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const email = newsletterInput.value;
        
        if (email && email.includes('@')) {
            showToast('Thank you for subscribing to our newsletter!');
            newsletterInput.value = '';
        } else {
            showToast('Please enter a valid email address.');
        }
    });
}

// Add active state to navigation based on scroll position
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link, .nav-link-mobile');

function setActiveNav() {
    const scrollPosition = window.pageYOffset + 150;
    
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

window.addEventListener('scroll', setActiveNav);

// Add hover effect to product cards
const productCards = document.querySelectorAll('.product-card');
productCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Add hover effect to testimonial cards
const testimonialCards = document.querySelectorAll('.testimonial-card');
testimonialCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Add hover effect to news cards
const newsCards = document.querySelectorAll('.news-card');
newsCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Set initial active nav
    setActiveNav();
    
    // Add smooth transitions to cards
    productCards.forEach(card => {
        card.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
    });
    
    testimonialCards.forEach(card => {
        card.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
    });
    
    newsCards.forEach(card => {
        card.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
    });
});



// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Stats counter animation
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = formatNumber(target);
            clearInterval(timer);
        } else {
            element.textContent = formatNumber(Math.floor(start));
        }
    }, 16);
}

function formatNumber(num) {
    if (num >= 1000) {
        return (num / 1000).toFixed(0) + 'K+';
    }
    return num + '%';
}

// Animate stats when they come into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            const statNumber = entry.target.querySelector('.stat-number');
            const text = statNumber.textContent;
            const value = parseInt(text.replace(/[^0-9]/g, ''));
            
            if (!isNaN(value)) {
                statNumber.textContent = '0';
                animateCounter(statNumber, value);
                entry.target.classList.add('animated');
            }
        }
    });
}, { threshold: 0.5 });

const stats = document.querySelectorAll('.stat');
stats.forEach(stat => {
    statsObserver.observe(stat);
});
window.addEventListener("load", () => {
    setTimeout(() => {
        document.getElementById("loader").style.opacity = "0";
        setTimeout(() => {
            document.getElementById("loader").style.display = "none";
        }, 600);
    }, 2500);
});

document.querySelector(".btn-outline").addEventListener("click", function (e) {
    e.preventDefault();

    const videoID = "5EnUTUDDwOY";  
    const modal = document.getElementById("videoModal");
    const frame = document.getElementById("youtubeFrame");

    frame.src = `https://www.youtube.com/embed/${videoID}?autoplay=1`;
    modal.style.display = "flex";
});

document.querySelector(".close-btn").onclick = function () {
    const modal = document.getElementById("videoModal");
    const frame = document.getElementById("youtubeFrame");

    modal.style.display = "none";
    frame.src = ""; // stop video
};

window.onclick = function (event) {
    const modal = document.getElementById("videoModal");
    if (event.target === modal) {
        modal.style.display = "none";
        document.getElementById("youtubeFrame").src = "";
    }
}

const miniSelect = document.getElementById("miniSelect");
const miniOptions = document.querySelector(".mini-options");
const miniSelected = document.querySelector(".mini-selected");
const miniHidden = document.getElementById("languageSwitcher");

miniSelect.addEventListener("click", () => {
    miniOptions.style.display = miniOptions.style.display === "block" ? "none" : "block";
});

document.querySelectorAll(".mini-option").forEach(option => {
    option.addEventListener("click", () => {
        miniSelected.textContent = option.textContent;
        miniHidden.value = option.getAttribute("data-value");

        document.querySelectorAll(".mini-option").forEach(opt => opt.classList.remove("selected"));
        option.classList.add("selected");

        miniOptions.style.display = "none";
    });
});

document.addEventListener("click", (e) => {
    if (!e.target.closest(".mini-lang-wrapper")) {
        miniOptions.style.display = "none";
    }
});

