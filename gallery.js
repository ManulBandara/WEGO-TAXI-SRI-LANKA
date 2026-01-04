// Gallery images data
const galleryImages = [
    {
        src: 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=1600',
        title: 'Mirissa Beach',
        description: 'Southern Coast Paradise',
        category: 'beaches'
    },
    {
        src: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1600',
        title: 'Unawatuna Beach',
        description: 'Tropical Paradise',
        category: 'beaches'
    },
    {
        src: 'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?w=1600',
        title: 'Bentota Beach',
        description: 'Golden Sunset',
        category: 'beaches'
    },
    {
        src: 'https://images.unsplash.com/photo-1588413181332-01de799b92d6?w=1600',
        title: 'Temple of the Tooth',
        description: 'Sacred Buddhist Site - Kandy',
        category: 'temples'
    },
    {
        src: 'https://images.unsplash.com/photo-1598970434795-0c54fe7c0648?w=1600',
        title: 'Buddhist Temple',
        description: 'Ancient Architecture',
        category: 'temples'
    },
    {
        src: 'https://images.unsplash.com/photo-1591702623321-c0690a1ce9c9?w=1600',
        title: 'Dambulla Cave Temple',
        description: 'UNESCO World Heritage',
        category: 'temples'
    },
    {
        src: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1600',
        title: 'Sigiriya Rock',
        description: 'Ancient Rock Fortress',
        category: 'culture'
    },
    {
        src: 'https://images.unsplash.com/photo-1608214624418-d71a11015a3f?w=1600',
        title: 'Polonnaruwa Ruins',
        description: 'Ancient Kingdom',
        category: 'culture'
    },
    {
        src: 'https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=1600',
        title: 'Wild Elephants',
        description: 'Yala National Park',
        category: 'wildlife'
    },
    {
        src: 'https://images.unsplash.com/photo-1587974928442-77dc3e0dba72?w=1600',
        title: 'Sri Lankan Leopard',
        description: 'Rare Wildlife Encounter',
        category: 'wildlife'
    },
    {
        src: 'https://images.unsplash.com/photo-1551316679-9c6ae9dec224?w=1600',
        title: 'Wildlife Safari',
        description: 'Exotic Birds & Animals',
        category: 'wildlife'
    },
    {
        src: 'https://images.unsplash.com/photo-1604926288183-7226b90300fa?w=1600',
        title: 'Tea Plantations',
        description: 'Nuwara Eliya Highlands',
        category: 'tea'
    },
    {
        src: 'https://images.unsplash.com/photo-1563979334088-816d5fad0af4?w=1600',
        title: 'Tea Picking',
        description: 'Traditional Ceylon Tea',
        category: 'tea'
    },
    {
        src: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=1600',
        title: 'Nine Arch Bridge',
        description: 'Iconic Railway Bridge',
        category: 'scenic'
    },
    {
        src: 'https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=1600',
        title: 'Hill Country',
        description: 'Misty Mountains',
        category: 'scenic'
    },
    {
        src: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1600',
        title: 'Coastal Sunset',
        description: 'Southern Province',
        category: 'beaches'
    },
    {
        src: 'https://images.unsplash.com/photo-1578469550956-0e16b69c6a3d?w=1600',
        title: 'Traditional Dance',
        description: 'Cultural Performance',
        category: 'culture'
    },
    {
        src: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1600',
        title: 'Rice Paddies',
        description: 'Rural Landscapes',
        category: 'scenic'
    }
];

let currentLightboxIndex = 0;
let filteredImages = [...galleryImages];

// ===== FILTER FUNCTIONALITY =====
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');

            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Filter gallery items
            galleryItems.forEach((item, index) => {
                const categories = item.getAttribute('data-category');

                if (filter === 'all') {
                    item.classList.remove('hidden');
                    filteredImages = [...galleryImages];
                } else {
                    if (categories.includes(filter)) {
                        item.classList.remove('hidden');
                    } else {
                        item.classList.add('hidden');
                    }
                }
            });

            // Update filtered images for lightbox
            if (filter !== 'all') {
                filteredImages = galleryImages.filter(img => {
                    const itemElement = Array.from(galleryItems).find((item, idx) => {
                        return !item.classList.contains('hidden') && 
                               galleryImages[idx] === img;
                    });
                    return itemElement !== undefined;
                });
            }
        });
    });
});

// ===== LIGHTBOX FUNCTIONALITY =====
function openLightbox(index) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxTitle = document.getElementById('lightboxTitle');
    const lightboxDescription = document.getElementById('lightboxDescription');
    const lightboxCounter = document.getElementById('lightboxCounter');

    currentLightboxIndex = index;

    const imageData = galleryImages[index];

    lightboxImage.src = imageData.src;
    lightboxTitle.textContent = imageData.title;
    lightboxDescription.textContent = imageData.description;
    lightboxCounter.textContent = `${index + 1} / ${galleryImages.length}`;

    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

function changeLightboxImage(direction) {
    currentLightboxIndex += direction;

    // Loop around
    if (currentLightboxIndex < 0) {
        currentLightboxIndex = galleryImages.length - 1;
    } else if (currentLightboxIndex >= galleryImages.length) {
        currentLightboxIndex = 0;
    }

    openLightbox(currentLightboxIndex);
}

// ===== KEYBOARD NAVIGATION =====
document.addEventListener('keydown', function(e) {
    const lightbox = document.getElementById('lightbox');

    if (lightbox.classList.contains('active')) {
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowLeft') {
            changeLightboxImage(-1);
        } else if (e.key === 'ArrowRight') {
            changeLightboxImage(1);
        }
    }
});

// ===== CLOSE LIGHTBOX ON BACKGROUND CLICK =====
document.getElementById('lightbox')?.addEventListener('click', function(e) {
    if (e.target.id === 'lightbox') {
        closeLightbox();
    }
});

// ===== PRELOAD IMAGES FOR BETTER PERFORMANCE =====
function preloadImages() {
    galleryImages.forEach(imageData => {
        const img = new Image();
        img.src = imageData.src;
    });
}

// Preload images when page loads
window.addEventListener('load', preloadImages);

// ===== SMOOTH SCROLL ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all gallery items
document.querySelectorAll('.gallery-item').forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(item);
});

// ===== TOUCH SWIPE FOR MOBILE =====
let touchStartX = 0;
let touchEndX = 0;

const lightbox = document.getElementById('lightbox');

lightbox?.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
}, false);

lightbox?.addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}, false);

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swiped left - next image
            changeLightboxImage(1);
        } else {
            // Swiped right - previous image
            changeLightboxImage(-1);
        }
    }
}

// ===== LAZY LOADING FOR GALLERY IMAGES =====
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    img.classList.remove('loading');
                }
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('.gallery-item img[data-src]').forEach(img => {
        img.classList.add('loading');
        imageObserver.observe(img);
    });
}

// ===== CONSOLE LOG =====
console.log('%c📸 Gallery Page Loaded', 'font-size: 18px; font-weight: bold; color: #FFC107;');
console.log(`✅ ${galleryImages.length} images loaded successfully`);