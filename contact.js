const form = document.getElementById('quoteForm');
const result = document.getElementById('form-result');
const submitBtn = form.querySelector('button[type="submit"]');

form.addEventListener('submit', function(e) {
  e.preventDefault(); // stop normal submit

  submitBtn.disabled = true;
  submitBtn.textContent = "Sending...";

  const formData = new FormData(form);

  fetch(form.action, {
    method: 'POST',
    body: formData,
    headers: {
      'Accept': 'application/json'  // stops Web3Forms alert
    }
  })
  .then(async (response) => {
    let data = await response.json();

    if (response.ok) {
      showNotification('✅ Thank you for your message! We will get back to you soon.', 'success');
      form.reset();
    } else {
      showNotification(data.message || '❌ Something went wrong. Please try again.', 'error');
    }
  })
  .catch(() => {
    showNotification('❌ Network error. Please try again.', 'error');
  })
  .finally(() => {
    submitBtn.disabled = false;
    submitBtn.textContent = "Send Message";
  });
});

function showNotification(message, type) {
  result.textContent = message;
  result.className = 'notification ' + type;
  result.style.display = 'block';

  // auto-hide after 5s
  setTimeout(() => {
    result.style.display = 'none';
  }, 5000);
}
// FAQ Accordion
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const item = question.parentElement;
        item.classList.toggle('active');
    });
});
