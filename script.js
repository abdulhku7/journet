// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Get DOM elements
    const modal = document.getElementById('signupModal');
    const ctaButtons = document.querySelectorAll('.cta-button:not(.submit-btn)'); // Exclude submit button
    const closeModal = document.querySelector('.close-modal');
    const signupForm = document.getElementById('signupForm');

    console.log('Modal element:', modal);
    console.log('CTA buttons:', ctaButtons);
    console.log('Close button:', closeModal);
    console.log('Signup form:', signupForm);

    // Add click event listeners to CTA buttons (excluding submit button)
    ctaButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            console.log('CTA button clicked');
            e.preventDefault();
            modal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });
    });

    // Close modal when clicking the close button
    closeModal.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    });

    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = ''; // Restore scrolling
        }
    });

    // Handle form submission
    if (signupForm) {
        signupForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            console.log('Form submission started');

            // Get form data
            const formData = {
                firstName: document.getElementById('firstName').value.trim(),
                lastName: document.getElementById('lastName').value.trim(),
                email: document.getElementById('email').value.trim(),
                signupDate: new Date().toISOString()
            };

            console.log('Form data:', formData);

            // Validate form data
            if (!formData.firstName || !formData.lastName || !formData.email) {
                alert('Please fill in all fields');
                return;
            }

            try {
                // Show loading state
                const submitBtn = signupForm.querySelector('.submit-btn');
                submitBtn.textContent = 'Signing up...';
                submitBtn.disabled = true;

                // Add data to Firestore
                console.log('Attempting to add to Firestore...');
                const docRef = await window.db.collection('users').add(formData);
                console.log('Successfully added to Firestore with ID:', docRef.id);

                // Show success message
                alert('Thank you for signing up!');

                // Close modal and reset form
                modal.classList.remove('active');
                document.body.style.overflow = ''; // Restore scrolling
                signupForm.reset();
            } catch (error) {
                console.error('Error signing up:', error);
                alert('Sorry, there was an error signing up. Please try again.');
            } finally {
                // Reset button state
                const submitBtn = signupForm.querySelector('.submit-btn');
                submitBtn.textContent = 'Sign Up';
                submitBtn.disabled = false;
            }
        });
    }

    // Add smooth hover effect to the CTA buttons (excluding submit button)
    ctaButtons.forEach(button => {
        button.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Update the glow position based on mouse movement
            this.style.setProperty('--x', `${x}px`);
            this.style.setProperty('--y', `${y}px`);
        });
    });

    // Handle logo and goals section animations
    const fixedLogo = document.querySelector('.fixed-logo');
    const mainLogo = document.querySelector('.main-logo');
    const goalsSection = document.querySelector('.goals');

    // Duplicate carousel items for infinite scroll
    const carousel = document.querySelector('.carousel');
    const items = [...carousel.children];
    items.forEach(item => {
        const clone = item.cloneNode(true);
        carousel.appendChild(clone);
    });

    // Handle scroll events
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        const heroHeight = window.innerHeight * 0.5;

        if (scrollPosition > heroHeight) {
            fixedLogo.classList.add('visible');
            mainLogo.classList.add('hide');
        } else {
            fixedLogo.classList.remove('visible');
            mainLogo.classList.remove('hide');
        }

        const goalsSectionTop = goalsSection.offsetTop;
        if (scrollPosition + window.innerHeight > goalsSectionTop) {
            goalsSection.classList.add('fade-in-up');
        }
    });

    // Pause carousel animation on hover
    carousel.addEventListener('mouseenter', () => {
        carousel.style.animationPlayState = 'paused';
    });

    carousel.addEventListener('mouseleave', () => {
        carousel.style.animationPlayState = 'running';
    });
});
