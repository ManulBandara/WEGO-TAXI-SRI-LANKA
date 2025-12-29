/* ============================================
   WEGO TAXI SRI LANKA - JAVASCRIPT
   Professional Interactive Features with Hero Slider
   ============================================ */

// ===== CONFIGURATION =====
const CONFIG = {
    whatsappNumber: '+393455363479', // Change to your actual WhatsApp number
    businessEmail: 'Info@wegosrilanka.com',
    businessPhone: '+393455363479'
};

// ===== DOM ELEMENTS =====
const elements = {
    mainNav: document.getElementById('mainNav'),
    navMenu: document.getElementById('navMenu'),
    mobileMenuBtn: document.getElementById('mobileMenuBtn'),
    scrollToTopBtn: document.getElementById('scrollToTop'),
    bookingForm: document.getElementById('bookingForm')
};

// ===== HERO IMAGE SLIDER AUTO-PLAY =====
let currentSlide = 0;
let slideInterval;
const slides = document.querySelectorAll('.hero-slide');
const indicators = document.querySelectorAll('.indicator');
const slideDelay = 5000; // 5 seconds per slide

function showSlide(index) {
    // Remove active class from all slides and indicators
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));

    // Add active class to current slide and indicator
    slides[index].classList.add('active');
    indicators[index].classList.add('active');

    currentSlide = index;
}

function nextSlide() {
    let next = (currentSlide + 1) % slides.length;
    showSlide(next);
}

function goToSlide(index) {
    clearInterval(slideInterval);
    showSlide(index);
    startSlideShow();
}

function startSlideShow() {
    slideInterval = setInterval(nextSlide, slideDelay);
}

// Start automatic slideshow when page loads
window.addEventListener('load', () => {
    if (slides.length > 0) {
        startSlideShow();
    }
});

// Pause slideshow on hover
const heroSection = document.querySelector('.hero-modern');
if (heroSection) {
    heroSection.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });

    heroSection.addEventListener('mouseleave', () => {
        startSlideShow();
    });
}


// ===== GALLERY LIGHTBOX FUNCTIONALITY =====
const galleryImages = [
    {
        src: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200',
        title: 'Sigiriya Rock - Ancient Wonder'
    },
    {
        src: 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=1200',
        title: 'Tropical Beaches - Coastal Paradise'
    },
    {
        src: 'https://images.unsplash.com/photo-1588413181332-01de799b92d6?w=1200',
        title: 'Sacred Temples - Cultural Heritage'
    },
    {
        src: 'https://images.unsplash.com/photo-1604926288183-7226b90300fa?w=1200',
        title: 'Tea Plantations - Highland Beauty'
    },
    {
        src: 'https://images.unsplash.com/photo-1587974928442-77dc3e0dba72?w=1200',
        title: 'Wildlife Safari - Nature Adventures'
    },
    {
        src: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=1200',
        title: 'Nine Arch Bridge - Scenic Railways'
    }
];

function openGalleryImage(index) {
    const lightbox = document.getElementById('galleryLightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxCaption = document.getElementById('lightboxCaption');
    
    const imageData = galleryImages[index - 1];
    
    lightboxImage.src = imageData.src;
    lightboxCaption.textContent = imageData.title;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeGalleryLightbox() {
    const lightbox = document.getElementById('galleryLightbox');
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

// Close lightbox on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeGalleryLightbox();
    }
});

// Close lightbox when clicking outside image
document.getElementById('galleryLightbox')?.addEventListener('click', (e) => {
    if (e.target.id === 'galleryLightbox') {
        closeGalleryLightbox();
    }
});

// Make functions globally available
window.openGalleryImage = openGalleryImage;
window.closeGalleryLightbox = closeGalleryLightbox;


// Make goToSlide available globally for inline onclick handlers
window.goToSlide = goToSlide;

// ===== MOBILE MENU TOGGLE =====
if (elements.mobileMenuBtn && elements.navMenu) {
    elements.mobileMenuBtn.addEventListener('click', () => {
        elements.navMenu.classList.toggle('active');
        elements.mobileMenuBtn.classList.toggle('active');
        document.body.style.overflow = elements.navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu when clicking nav items
    const navItems = elements.navMenu.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            elements.navMenu.classList.remove('active');
            elements.mobileMenuBtn.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!elements.navMenu.contains(e.target) &&
            !elements.mobileMenuBtn.contains(e.target) &&
            elements.navMenu.classList.contains('active')) {
            elements.navMenu.classList.remove('active');
            elements.mobileMenuBtn.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// ===== STICKY NAVIGATION =====
let lastScrollTop = 0;
window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Add scrolled class for shadow effect
    if (scrollTop > 50) {
        elements.mainNav?.classList.add('scrolled');
    } else {
        elements.mainNav?.classList.remove('scrolled');
    }

    // Show/hide scroll to top button
    if (scrollTop > 300) {
        elements.scrollToTopBtn?.classList.add('active');
    } else {
        elements.scrollToTopBtn?.classList.remove('active');
    }

    lastScrollTop = scrollTop;
});

// ===== SMOOTH SCROLL FOR NAVIGATION =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed nav
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===== SCROLL TO TOP BUTTON =====
elements.scrollToTopBtn?.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===== ACTIVE NAV ITEM ON SCROLL =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-item');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ===== GENERAL WHATSAPP OPEN =====
function openWhatsApp() {
    const message = "Hi! I'd like to inquire about your taxi services in Sri Lanka.";
    const whatsappUrl = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

// ===== SCROLL TO CONTACT SECTION =====
function scrollToContact() {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
        const offsetTop = contactSection.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// ===== SERVICE BOOKING =====
function openServiceBooking(serviceName) {
    const message = `Hi! I'd like to book the ${serviceName} service. Can you provide more details?`;
    const whatsappUrl = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

// ===== TOUR BOOKING =====
function openTourBooking(tourName) {
    const message = `Hi! I'm interested in the ${tourName}. Can you share the pricing and availability?`;
    const whatsappUrl = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

// ===== VEHICLE BOOKING =====
function openVehicleBooking(vehicleType) {
    const message = `Hi! I'd like to book a ${vehicleType} vehicle. What are the rates?`;
    const whatsappUrl = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

// Make functions available globally
window.openWhatsApp = openWhatsApp;
window.scrollToContact = scrollToContact;
window.openServiceBooking = openServiceBooking;
window.openTourBooking = openTourBooking;
window.openVehicleBooking = openVehicleBooking;

// ===== BOOKING FORM SUBMISSION =====
if (elements.bookingForm) {
    elements.bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const pickup = document.getElementById('pickup').value;
        const destination = document.getElementById('destination').value;
        const date = document.getElementById('date').value;
        const passengers = document.getElementById('passengers').value;
        const message = document.getElementById('message').value;

        // Validate form
        if (!name || !email || !pickup || !destination || !date || !passengers) {
            alert('Please fill in all required fields');
            return;
        }

        // Create WhatsApp message
        const whatsappMessage = `
🚕 *NEW BOOKING REQUEST*

👤 *Name:* ${name}
📧 *Email:* ${email}
📍 *Pickup:* ${pickup}
🏁 *Destination:* ${destination}
📅 *Date:* ${date}
👥 *Passengers:* ${passengers}
${message ? `💬 *Message:* ${message}` : ''}

_Sent from Wego Taxi Website_
        `.trim();

        // Open WhatsApp
        const whatsappUrl = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
        window.open(whatsappUrl, '_blank');

        // Reset form
        elements.bookingForm.reset();

        // Show success message
        showNotification('Redirecting to WhatsApp...', 'success');
    });
}

// ===== NOTIFICATION SYSTEM =====
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#F44336' : '#2196F3'};
        color: white;
        padding: 16px 24px;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        font-weight: 600;
        max-width: 300px;
    `;
    notification.textContent = message;

    // Add to DOM
    document.body.appendChild(notification);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add notification animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOutRight {
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
document.head.appendChild(style);

// ===== LAZY LOADING IMAGES =====
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===== FORM FIELD ANIMATIONS =====
const formInputs = document.querySelectorAll('input, select, textarea');
formInputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
    });

    input.addEventListener('blur', function() {
        if (!this.value) {
            this.parentElement.classList.remove('focused');
        }
    });

    // Check if already has value on load
    if (input.value) {
        input.parentElement.classList.add('focused');
    }
});

// ===== COUNTER ANIMATION FOR STATS =====
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// Trigger counter animation when in viewport
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            entry.target.classList.add('counted');
            const target = parseInt(entry.target.textContent.replace(/\D/g, ''));
            if (target) {
                animateCounter(entry.target, target);
            }
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.trust-number, .stat-number').forEach(stat => {
    statsObserver.observe(stat);
});

// ===== PARALLAX EFFECT FOR HERO =====
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const activeSlide = document.querySelector('.hero-slide.active');
    if (activeSlide && scrolled < window.innerHeight) {
        activeSlide.style.transform = `translateY(${scrolled * 0.5}px) scale(1.1)`;
    }
});

// ===== DATE INPUT MIN DATE (TODAY) =====
const dateInput = document.getElementById('date');
if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
}

// ===== PREVENT FORM DOUBLE SUBMISSION =====
const forms = document.querySelectorAll('form');
forms.forEach(form => {
    form.addEventListener('submit', function(e) {
        const submitBtn = form.querySelector('button[type="submit"]');
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.6';
            const originalHTML = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.style.opacity = '1';
                submitBtn.innerHTML = originalHTML;
            }, 3000);
        }
    });
});

// ===== CONSOLE BRANDING =====
console.log('%c🚕 WEGO TAXI SRI LANKA', 'font-size: 24px; font-weight: bold; color: #FFC107;');
console.log('%cWebsite developed with ❤️ for premium travel experiences', 'font-size: 14px; color: #666;');
console.log('%cContact: hello@wegotaxi.lk', 'font-size: 12px; color: #999;');

// ===== PAGE LOAD ANIMATION =====
window.addEventListener('load', () => {
    document.body.classList.add('loaded');

    // Add fade-in animation to sections
    const allSections = document.querySelectorAll('section');
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    allSections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        sectionObserver.observe(section);
    });
});

// ===== CARD TILT EFFECT (PREMIUM TOUCH) =====
const cards = document.querySelectorAll('.service-card-modern, .tour-card-premium, .fleet-item-modern');
cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// ===== PERFORMANCE OPTIMIZATION =====
// Debounce function for scroll events
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

// Apply debounce to scroll handlers
const debouncedScrollHandler = debounce(() => {
    // Your scroll logic here
}, 10);

// ===== ERROR HANDLING =====
window.addEventListener('error', (e) => {
    console.error('An error occurred:', e.error);
    // You can add error tracking here (e.g., send to analytics)
});

// ===== FINAL LOG =====
console.log('✅ Wego Taxi Website Loaded Successfully!');
console.log('🖼️ Hero image slider active with 5 beautiful Sri Lankan destinations');
console.log('⏱️ Auto-rotating every 5 seconds');