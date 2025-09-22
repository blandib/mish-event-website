 // Dark Mode Toggle Functionality
        document.addEventListener('DOMContentLoaded', function() {
            const modeToggle = document.getElementById('modeToggle');
            const body = document.body;
            
            // Check for saved dark mode preference
            const isDarkMode = localStorage.getItem('darkMode') === 'true';
            
            // Apply dark mode if previously enabled
            if (isDarkMode) {
                body.classList.add('dark-mode');
                if (modeToggle) {
                    modeToggle.innerHTML = '<i class="fas fa-sun"></i>';
                }
            }
            
            // Toggle dark mode when button is clicked
            if (modeToggle) {
                modeToggle.addEventListener('click', function() {
                    body.classList.toggle('dark-mode');
                    
                    // Update button icon
                    if (body.classList.contains('dark-mode')) {
                        modeToggle.innerHTML = '<i class="fas fa-sun"></i>';
                        localStorage.setItem('darkMode', 'true');
                    } else {
                        modeToggle.innerHTML = '<i class="fas fa-moon"></i>';
                        localStorage.setItem('darkMode', 'false');
                    }
                });
            }
            
            console.log('Hire page loaded successfully!');
        });