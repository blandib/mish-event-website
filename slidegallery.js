 // Global variables for slideshow functionality
        let currentSlideIndex = 1;
        let filteredImages = [];
        
        // Get all gallery items and filter buttons
        const galleryItems = document.querySelectorAll('.gallery-item');
        const filterButtons = document.querySelectorAll('.filter-btn');
        const viewSlideshowBtn = document.getElementById('viewSlideshow');
        const slideshowModal = document.getElementById('slideshowModal');
        const closeModalBtn = document.getElementById('closeModal');
        const dotsContainer = document.getElementById('dotsContainer');
        
        // Store all images for slideshow
        let allImages = [];
        
        // Initialize the images array from gallery items
        galleryItems.forEach(item => {
            const img = item.querySelector('img');
            const category = item.getAttribute('data-category');
            
            allImages.push({
                src: img.src.replace('&w=600', '&w=1200'), // Higher resolution for slideshow
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
            currentSlideIndex = 1;
            showSlides(currentSlideIndex);
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
        
        // Generate slideshow content
        function generateSlideshow() {
            const slideshowContent = document.querySelector('.slideshow-content');
            
            // Remove existing slides
            const existingSlides = document.querySelectorAll('.mySlides');
            existingSlides.forEach(slide => slide.remove());
            
            // Remove existing dots
            const existingDots = document.querySelectorAll('.dot');
            existingDots.forEach(dot => dot.remove());
            
            // Create slides
            filteredImages.forEach((image, index) => {
                const slide = document.createElement('div');
                slide.className = 'mySlides';
                slide.innerHTML = `
                    <div class="numbertext">${index + 1} / ${filteredImages.length}</div>
                    <img src="${image.src}" style="width:100%">
                `;
                slideshowContent.insertBefore(slide, document.querySelector('.prev'));
                
                // Create dots
                const dot = document.createElement('span');
                dot.className = 'dot';
                dot.onclick = function() { currentSlide(index + 1); };
                dotsContainer.appendChild(dot);
            });
        }
        
        // Next/previous controls - MUST be in global scope for onclick attributes
        function plusSlides(n) {
            showSlides(currentSlideIndex += n);
        }
        
        // Thumbnail image controls - MUST be in global scope for onclick attributes
        function currentSlide(n) {
            showSlides(currentSlideIndex = n);
        }
        
        function showSlides(n) {
            let i;
            const slides = document.getElementsByClassName("mySlides");
            const dots = document.getElementsByClassName("dot");
            const captionText = document.getElementById("caption");
            
            if (n > slides.length) { currentSlideIndex = 1; }
            if (n < 1) { currentSlideIndex = slides.length; }
            
            for (i = 0; i < slides.length; i++) {
                slides[i].style.display = "none";
            }
            
            for (i = 0; i < dots.length; i++) {
                dots[i].className = dots[i].className.replace(" active", "");
            }
            
            if (slides.length > 0) {
                slides[currentSlideIndex-1].style.display = "block";
                dots[currentSlideIndex-1].className += " active";
                captionText.innerHTML = filteredImages[currentSlideIndex-1].caption;
            }
        }
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (slideshowModal.style.display === 'block') {
                if (e.key === 'ArrowLeft') {
                    plusSlides(-1);
                } else if (e.key === 'ArrowRight') {
                    plusSlides(1);
                } else if (e.key === 'Escape') {
                    slideshowModal.style.display = 'none';
                    document.body.style.overflow = '';
                }
            }
        });