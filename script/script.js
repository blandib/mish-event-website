
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

// Set current page as active in navigation
function setActiveNavLink() {
    const navLinks = document.querySelectorAll('.nav-link');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// Hamburger Menu Toggle
if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.innerHTML = navMenu.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });
}

// Dark Mode Toggle
const modeToggle = document.getElementById('modeToggle');

if (modeToggle) {
    // Check for saved dark mode preference
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
        modeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    modeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        
        // Save preference
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('darkMode', 'enabled');
            modeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            localStorage.setItem('darkMode', 'disabled');
            modeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
    });
}

/*FAQ Toggle - Only on contact page
const faqQuestions = document.querySelectorAll('.faq-question');

if (faqQuestions.length > 0) {
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            answer.style.display = answer.style.display === 'block' ? 'none' : 'block';
            const icon = question.querySelector('i');
            icon.className = icon.className.includes('down') ? 'fas fa-chevron-up' : 'fas fa-chevron-down';
        });
    });
}

// Form Submission - Only on contact page
const quoteForm = document.getElementById('quoteForm');

if (quoteForm) {
    quoteForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your inquiry! We will get back to you shortly.');
        quoteForm.reset();
    });
}*/

// Gallery Filtering - Only on gallery page
const filterBtns = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

if (filterBtns.length > 0 && galleryItems.length > 0) {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            
            galleryItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

// Initialize page-specific features when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    setActiveNavLink();
});

 // Hero image slideshow
        let currentSlide = 0;
        const slides = document.querySelectorAll('.hero-slide');
        
        function showSlide(index) {
            // Hide all slides
            slides.forEach(slide => slide.classList.remove('active'));
            
            // Show the selected slide
            slides[index].classList.add('active');
        }
        
        function nextSlide() {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }
        
        // Change slide every 5 seconds
        setInterval(nextSlide, 5000);
        

         // Simple script to ensure the page loads correctly
        document.addEventListener('DOMContentLoaded', function() {
            console.log('Birthday decor section loaded successfully!');
        });