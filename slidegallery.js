 document.addEventListener('DOMContentLoaded', function() {
            // Get all gallery items and filter buttons
            const galleryItems = document.querySelectorAll('.gallery-item');
            const filterButtons = document.querySelectorAll('.filter-btn');
            const viewSlideshowBtn = document.getElementById('viewSlideshow');
            const slideshowModal = document.getElementById('slideshowModal');
            const closeModalBtn = document.getElementById('closeModal');
            const dotsContainer = document.getElementById('dotsContainer');
            const prevButton = document.getElementById('prevSlide');
            const nextButton = document.getElementById('nextSlide');
            const slidesWrapper = document.querySelector('.slides-wrapper');
            const captionElement = document.getElementById('caption');
            
            // Store all images for slideshow
            let allImages = [];
            let filteredImages = [];
            let currentSlideIndex = 0;
            
            // Initialize the images array from gallery items
            galleryItems.forEach(item => {
                const img = item.querySelector('img');
                const category = item.getAttribute('data-category');
                
                allImages.push({
                    src: img.src,
                    caption: img.alt,
                    category: category
                });
            });
            
            // Set filtered images to all images initially
            filteredImages = [...allImages];
            
            // Filter functionality
            filterButtons.forEach(button => {
                button.addEventListener('click', () => {
                    // Update active button
                    filterButtons.forEach(btn => btn.classList.remove('active'));
                    button.classList.add('active');
                    
                    // Filter items
                    const filter = button.getAttribute('data-filter');
                    
                    // Show/hide gallery items
                    galleryItems.forEach(item => {
                        if (filter === 'all' || item.getAttribute('data-category') === filter) {
                            item.style.display = 'block';
                        } else {
                            item.style.display = 'none';
                        }
                    });
                    
                    // Update filtered images for slideshow
                    if (filter === 'all') {
                        filteredImages = [...allImages];
                    } else {
                        filteredImages = allImages.filter(img => img.category === filter);
                    }
                });
            });
            
            // Function to open the slideshow
            viewSlideshowBtn.addEventListener('click', () => {
                // Generate slideshow content
                generateSlideshow();
                
                // Show the slideshow
                slideshowModal.style.display = 'block';
                document.body.style.overflow = 'hidden'; // Prevent scrolling
                
                // Show the first slide
                currentSlideIndex = 0;
                showSlide(currentSlideIndex);
            });
            
            // Function to close the slideshow
            closeModalBtn.addEventListener('click', () => {
                slideshowModal.style.display = 'none';
                document.body.style.overflow = ''; // Enable scrolling
            });
            
            // Close modal when clicking outside the image
            slideshowModal.addEventListener('click', (e) => {
                if (e.target === slideshowModal) {
                    slideshowModal.style.display = 'none';
                    document.body.style.overflow = '';
                }
            });
            
            // Next and previous buttons
            prevButton.addEventListener('click', () => {
                showSlide(currentSlideIndex - 1);
            });
            
            nextButton.addEventListener('click', () => {
                showSlide(currentSlideIndex + 1);
            });
            
            // Generate slideshow content
            function generateSlideshow() {
                // Clear existing slides and dots
                slidesWrapper.innerHTML = '';
                dotsContainer.innerHTML = '';
                
                // Create slides and dots
                filteredImages.forEach((image, index) => {
                    // Create slide
                    const slide = document.createElement('div');
                    slide.className = 'slide';
                    slide.innerHTML = `
                        <div class="numbertext">${index + 1} / ${filteredImages.length}</div>
                        <img src="${image.src}" alt="${image.caption}">
                    `;
                    slidesWrapper.appendChild(slide);
                    
                    // Create dot
                    const dot = document.createElement('span');
                    dot.className = 'dot';
                    dot.addEventListener('click', () => {
                        showSlide(index);
                    });
                    dotsContainer.appendChild(dot);
                });
            }
            
            // Show specific slide
            function showSlide(index) {
                const slides = document.querySelectorAll('.slide');
                const dots = document.querySelectorAll('.dot');
                
                // Handle index out of bounds
                if (index >= filteredImages.length) index = 0;
                if (index < 0) index = filteredImages.length - 1;
                
                // Update current slide index
                currentSlideIndex = index;
                
                // Hide all slides and remove active class from dots
                slides.forEach(slide => slide.classList.remove('active'));
                dots.forEach(dot => dot.classList.remove('active'));
                
                // Show selected slide and activate corresponding dot
                if (slides.length > 0) {
                    slides[index].classList.add('active');
                    dots[index].classList.add('active');
                    
                    // Update caption
                    captionElement.textContent = filteredImages[index].caption;
                }
            }
            
            // Keyboard navigation
            document.addEventListener('keydown', (e) => {
                if (slideshowModal.style.display === 'block') {
                    if (e.key === 'ArrowLeft') {
                        showSlide(currentSlideIndex - 1);
                    } else if (e.key === 'ArrowRight') {
                        showSlide(currentSlideIndex + 1);
                    } else if (e.key === 'Escape') {
                        slideshowModal.style.display = 'none';
                        document.body.style.overflow = '';
                    }
                }
            });
        });