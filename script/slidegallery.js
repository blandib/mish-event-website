 /*document.addEventListener('DOMContentLoaded', function() {
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
        });*/
         document.addEventListener('DOMContentLoaded', function() {
            // Filter functionality
            const filterButtons = document.querySelectorAll('.filter-btn');
            const galleryItems = document.querySelectorAll('.gallery-item');
            
            filterButtons.forEach(button => {
                button.addEventListener('click', () => {
                    // Remove active class from all buttons
                    filterButtons.forEach(btn => btn.classList.remove('active'));
                    
                    // Add active class to clicked button
                    button.classList.add('active');
                    
                    const filterValue = button.getAttribute('data-filter');
                    
                    galleryItems.forEach(item => {
                        if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                            item.style.display = 'block';
                        } else {
                            item.style.display = 'none';
                        }
                    });
                });
            });
            
            // Slideshow functionality
            const slideshowModal = document.getElementById('slideshowModal');
            const slideImage = document.getElementById('slideImage');
            const slideCaption = document.getElementById('slideCaption');
            const categoryIndicator = document.getElementById('categoryIndicator');
            const closeSlideshowBtn = document.getElementById('closeSlideshow');
            const prevSlideBtn = document.getElementById('prevSlide');
            const nextSlideBtn = document.getElementById('nextSlide');
            const viewSlideshowBtn = document.getElementById('viewSlideshow');
            
            let currentSlideIndex = 0;
            let filteredItems = [];
            
            // Function to open slideshow
            function openSlideshow() {
                // Get current filter
                const activeFilter = document.querySelector('.filter-btn.active').getAttribute('data-filter');
                
                // Get all visible items based on filter
                filteredItems = [];
                galleryItems.forEach(item => {
                    if (activeFilter === 'all' || item.getAttribute('data-category') === activeFilter) {
                        if (item.style.display !== 'none') {
                            filteredItems.push(item);
                        }
                    }
                });
                
                if (filteredItems.length > 0) {
                    currentSlideIndex = 0;
                    showSlide(currentSlideIndex);
                    slideshowModal.style.display = 'block';
                    document.body.style.overflow = 'hidden';
                }
            }
            
            // Function to show a specific slide
            function showSlide(index) {
                if (filteredItems.length === 0) return;
                
                const item = filteredItems[index];
                const img = item.querySelector('img');
                
                slideImage.src = img.src;
                slideImage.alt = img.alt;
                slideCaption.textContent = img.alt;
                
                // Set category indicator
                const category = item.getAttribute('data-category');
                const categoryMap = {
                    'baby': 'Baby Showers',
                    'birthday': 'Birthdays',
                    'corporate': 'Corporate Events',
                    'seasonal': 'Seasonal Events'
                };
                categoryIndicator.textContent = categoryMap[category] || 'Event';
            }
            
            // Event listeners
            viewSlideshowBtn.addEventListener('click', openSlideshow);
            
            closeSlideshowBtn.addEventListener('click', () => {
                slideshowModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            });
            
            prevSlideBtn.addEventListener('click', () => {
                currentSlideIndex = (currentSlideIndex - 1 + filteredItems.length) % filteredItems.length;
                showSlide(currentSlideIndex);
            });
            
            nextSlideBtn.addEventListener('click', () => {
                currentSlideIndex = (currentSlideIndex + 1) % filteredItems.length;
                showSlide(currentSlideIndex);
            });
            
            // Keyboard navigation
            document.addEventListener('keydown', (e) => {
                if (slideshowModal.style.display === 'block') {
                    if (e.key === 'ArrowLeft') {
                        currentSlideIndex = (currentSlideIndex - 1 + filteredItems.length) % filteredItems.length;
                        showSlide(currentSlideIndex);
                    } else if (e.key === 'ArrowRight') {
                        currentSlideIndex = (currentSlideIndex + 1) % filteredItems.length;
                        showSlide(currentSlideIndex);
                    } else if (e.key === 'Escape') {
                        slideshowModal.style.display = 'none';
                        document.body.style.overflow = 'auto';
                    }
                }
            });
            
            // Click on gallery items to open slideshow at that image
            galleryItems.forEach((item, index) => {
                item.addEventListener('click', () => {
                    // Get current filter
                    const activeFilter = document.querySelector('.filter-btn.active').getAttribute('data-filter');
                    
                    // Get all visible items based on filter
                    filteredItems = [];
                    galleryItems.forEach(item => {
                        if (activeFilter === 'all' || item.getAttribute('data-category') === activeFilter) {
                            if (item.style.display !== 'none') {
                                filteredItems.push(item);
                            }
                        }
                    });
                    
                    // Find the index of the clicked item in the filtered array
                    currentSlideIndex = filteredItems.indexOf(item);
                    
                    if (currentSlideIndex !== -1) {
                        showSlide(currentSlideIndex);
                        slideshowModal.style.display = 'block';
                        document.body.style.overflow = 'hidden';
                    }
                });
            });
        });