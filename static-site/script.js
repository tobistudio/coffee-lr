// Contact Form Handler
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');
    const successMessage = document.getElementById('success-message');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(form);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            message: formData.get('message') || ''
        };
        
        // Basic validation
        if (!data.name || !data.email) {
            alert('Please fill in your name and email.');
            return;
        }
        
        // Disable submit button
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        // Simulate API call (replace with actual backend call later)
        setTimeout(() => {
            // For now, just log the data (in production, send to backend)
            console.log('Contact form submission:', data);
            
            // Show success message
            form.style.display = 'none';
            successMessage.classList.remove('hidden');
            
            // You can replace this with actual API call:
            // fetch('/api/contact', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(data)
            // }).then(response => response.json())
            //   .then(result => {
            //       // Handle success
            //   }).catch(error => {
            //       // Handle error
            //   });
            
        }, 1000);
    });
});

// Add some visual feedback for form interactions
document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('.form-input');
    
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.style.transform = 'scale(1.02)';
        });
        
        input.addEventListener('blur', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Add smooth scrolling for any future navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
