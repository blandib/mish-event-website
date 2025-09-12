document.addEventListener('DOMContentLoaded', function() {
            const video = document.getElementById('myVideo');
            const playBtn = document.getElementById('playBtn');
            const pauseBtn = document.getElementById('pauseBtn');
            const muteBtn = document.getElementById('muteBtn');
            const volumeTooltip = document.getElementById('volumeTooltip');
            
            // Set initial state for mute button (video starts muted)
            muteBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
            volumeTooltip.textContent = 'Click to unmute';
            
            // Play button functionality
            playBtn.addEventListener('click', function() {
                video.play();
                playBtn.innerHTML = '<i class="fas fa-play"></i>';
                pauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
            });
            
            // Pause button functionality
            pauseBtn.addEventListener('click', function() {
                video.pause();
                playBtn.innerHTML = '<i class="fas fa-play"></i>';
                pauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
            });
            
            // Mute button functionality - FIXED
            muteBtn.addEventListener('click', function() {
                if (video.muted) {
                    video.muted = false;
                    muteBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
                    volumeTooltip.textContent = 'Click to mute';
                } else {
                    video.muted = true;
                    muteBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
                    volumeTooltip.textContent = 'Click to unmute';
                }
                
                // Show tooltip
                volumeTooltip.classList.add('show');
                setTimeout(() => {
                    volumeTooltip.classList.remove('show');
                }, 2000);
            });
            
            // Show tooltip on hover
            muteBtn.addEventListener('mouseenter', function() {
                volumeTooltip.classList.add('show');
            });
            
            muteBtn.addEventListener('mouseleave', function() {
                volumeTooltip.classList.remove('show');
            });
            
            // Automatically show pause icon when video is playing
            video.addEventListener('play', function() {
                playBtn.innerHTML = '<i class="fas fa-play"></i>';
                pauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
            });
            
            // Automatically show play icon when video is paused
            video.addEventListener('pause', function() {
                playBtn.innerHTML = '<i class="fas fa-play"></i>';
                pauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
            });
        });