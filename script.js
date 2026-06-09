// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
  const menuButton = document.querySelector('.menu-button');
  const siteNav = document.querySelector('.site-nav');
  
  if (menuButton && siteNav) {
    menuButton.addEventListener('click', function() {
      const isOpen = siteNav.classList.contains('is-open');
      siteNav.classList.toggle('is-open');
      menuButton.setAttribute('aria-expanded', !isOpen);
    });

    // Close menu when link clicked
    const navLinks = siteNav.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        siteNav.classList.remove('is-open');
        menuButton.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Set current year in footer
  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // Contact form handling
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const nameInput = this.querySelector('input[name="name"]');
      const contactInput = this.querySelector('input[name="contact"]');
      const messageInput = this.querySelector('textarea[name="message"]');
      
      const name = nameInput.value.trim();
      const contact = contactInput.value.trim();
      const message = messageInput.value.trim();
      
      if (!name || !contact || !message) {
        const formNote = this.querySelector('.form-note');
        formNote.textContent = '❌ कृपया सभी fields भरें / Please fill all fields';
        formNote.style.color = '#e74c3c';
        return;
      }

      const formNote = this.querySelector('.form-note');
      formNote.textContent = '✅ आपका संदेश तैयार है! / Your inquiry is ready!';
      formNote.style.color = '#2ecc71';
      
      // Auto-clear after 3 seconds
      setTimeout(() => {
        formNote.textContent = '';
      }, 3000);

      // Reset form
      this.reset();
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href !== '#' && document.querySelector(href)) {
        e.preventDefault();
        const target = document.querySelector(href);
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Add scroll animation for elements
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe product cards
  document.querySelectorAll('.product-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 600ms ease, transform 600ms ease';
    observer.observe(card);
  });
});