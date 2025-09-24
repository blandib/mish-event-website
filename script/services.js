document.addEventListener('DOMContentLoaded', function() {
    const video = document.getElementById('myVideo');
    const playBtn = document.getElementById('playBtn');
    const pauseBtn = document.getElementById('pauseBtn');
    const muteBtn = document.getElementById('muteBtn');
    const volumeTooltip = document.getElementById('volumeTooltip');
    
    // Check if elements exist
    if (!video || !playBtn || !pauseBtn || !muteBtn) {
        console.error('One or more video control elements not found');
        return;
    }
    
    // Set initial state
    function updateButtonStates() {
        // Update play/pause buttons based on video state
        if (video.paused) {
            playBtn.style.display = 'block';
            pauseBtn.style.display = 'none';
        } else {
            playBtn.style.display = 'none';
            pauseBtn.style.display = 'block';
        }
        
        // Update mute button
        if (video.muted) {
            muteBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
            if (volumeTooltip) volumeTooltip.textContent = 'Click to unmute';
        } else {
            muteBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
            if (volumeTooltip) volumeTooltip.textContent = 'Click to mute';
        }
    }
    
    // Initialize button states
    updateButtonStates();
    
    // Play button functionality
    playBtn.addEventListener('click', function() {
        video.play().catch(error => {
            console.error('Error playing video:', error);
        });
    });
    
    // Pause button functionality
    pauseBtn.addEventListener('click', function() {
        video.pause();
    });
    
    // Mute button functionality
    muteBtn.addEventListener('click', function() {
        video.muted = !video.muted;
        updateButtonStates();
        
        // Show tooltip if it exists
        if (volumeTooltip) {
            volumeTooltip.classList.add('show');
            setTimeout(() => {
                volumeTooltip.classList.remove('show');
            }, 2000);
        }
    });
    
    // Tooltip hover events
    if (volumeTooltip) {
        muteBtn.addEventListener('mouseenter', function() {
            volumeTooltip.classList.add('show');
        });
        
        muteBtn.addEventListener('mouseleave', function() {
            volumeTooltip.classList.remove('show');
        });
    }
    
    // Video event listeners
    video.addEventListener('play', updateButtonStates);
    video.addEventListener('pause', updateButtonStates);
    video.addEventListener('volumechange', updateButtonStates);
    
    // Handle video loading errors
    video.addEventListener('error', function() {
        console.error('Video loading error:', video.error);
    });
    
    // Handle cases where autoplay might be blocked
    video.play().catch(error => {
        console.log('Autoplay was blocked:', error);
        // Show play button if autoplay is blocked
        playBtn.style.display = 'block';
        pauseBtn.style.display = 'none';
    });
});
        /**parkages */
         // Add subtle animations to elements when they come into view
        document.addEventListener('DOMContentLoaded', function() {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = 1;
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            }, { threshold: 0.1 });
            
            // Animate highlight cards
            const cards = document.querySelectorAll('.highlight-card');
            cards.forEach(card => {
                card.style.opacity = 0;
                card.style.transform = 'translateY(20px)';
                card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                observer.observe(card);
            });
            
            // Animate table rows with a slight delay
            const rows = document.querySelectorAll('.package-table tbody tr');
            rows.forEach((row, index) => {
                row.style.opacity = 0;
                row.style.transform = 'translateX(-20px)';
                row.style.transition = `opacity 0.5s ease ${index * 0.05}s, transform 0.5s ease ${index * 0.05}s`;
                observer.observe(row);
            });
        });