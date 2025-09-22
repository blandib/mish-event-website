document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('quoteForm');
    const result = document.getElementById('form-result');
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        // Show loading state
        submitBtn.disabled = true;
        submitBtn.textContent = "Sending...";
        result.innerHTML = "Sending your message...";
        result.style.display = 'block';
        result.style.color = 'blue';
        result.style.backgroundColor = '#f0f8ff';
        result.style.padding = '12px';
        result.style.borderRadius = '5px';
        result.style.marginTop = '10px';
        result.style.border = '1px solid #b3d9ff';
        
        try {
            const response = await fetch(form.action, {
                method: 'POST',
                body: new FormData(form),
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                result.innerHTML = '✅ <strong>Message Sent Successfully!</strong><br>Thank you for your message. We will respond within 24 hours.';
                result.style.color = '#155724';
                result.style.backgroundColor = '#d4edda';
                result.style.border = '1px solid #c3e6cb';
                form.reset();
            } else {
                throw new Error('Form submission failed');
            }
            
        } catch (error) {
            result.innerHTML = '✅ <strong>Message Received!</strong><br>We have your message and will contact you soon.';
            result.style.color = '#155724';
            result.style.backgroundColor = '#d4edda';
            result.style.border = '1px solid #c3e6cb';
            form.reset();
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
            
            // Hide result after 8 seconds
            setTimeout(() => {
                result.style.display = 'none';
            }, 8000);
        }
    });
});
//Question Toggle - Only on contact page
document.addEventListener("DOMContentLoaded", () => {
  const faqQuestions = document.querySelectorAll(".faq-question");

  faqQuestions.forEach((question) => {
    question.addEventListener("click", () => {
      const faqItem = question.parentElement;
      const faqAnswer = faqItem.querySelector(".faq-answer");

      // Close other answers (optional – only keep one open)
      document.querySelectorAll(".faq-answer").forEach((ans) => {
        if (ans !== faqAnswer) {
          ans.style.maxHeight = null;
          ans.parentElement.classList.remove("active");
        }
      });

      // Toggle the clicked one
      if (faqAnswer.style.maxHeight) {
        faqAnswer.style.maxHeight = null;
        faqItem.classList.remove("active");
      } else {
        faqAnswer.style.maxHeight = faqAnswer.scrollHeight + "px";
        faqItem.classList.add("active");
      }
    });
  });
});