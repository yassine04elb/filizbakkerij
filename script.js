// ===========================
// Filiz Bakkerij & Pizzaria
// ===========================

document.addEventListener('DOMContentLoaded', () => {

  // --- Navbar scroll effect ---
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });

  // --- Mobile menu toggle ---
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const spans = navToggle.querySelectorAll('span');
    if (navLinks.classList.contains('open')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    }
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      const spans = navToggle.querySelectorAll('span');
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    });
  });

  // --- Menu items ---
  const menuItems = document.querySelectorAll('.menu-item');

  function filterMenu(category) {
    menuItems.forEach(item => {
      if (item.dataset.category === category) {
        item.classList.remove('hidden');
        item.style.animation = 'none';
        item.offsetHeight;
        item.style.animation = 'fadeInUp 0.35s ease forwards';
      } else {
        item.classList.add('hidden');
      }
    });
  }

  // --- Menu tabs ---
  function activateTab(tab) {
    document.querySelectorAll('.menu-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    filterMenu(tab.dataset.category);
  }

  document.querySelectorAll('.menu-tab').forEach(tab => {
    tab.addEventListener('click', () => activateTab(tab));
  });

  // Default: show snacks
  const firstTab = document.querySelector('.menu-tab');
  if (firstTab) activateTab(firstTab);

  // --- Highlight today's opening hours ---
  const days = ['zondag', 'maandag', 'dinsdag', 'woensdag', 'donderdag', 'vrijdag', 'zaterdag'];
  const today = days[new Date().getDay()];

  document.querySelectorAll('.hours-row').forEach(row => {
    const dayText = row.querySelector('.day').textContent.toLowerCase();
    if (dayText === today) {
      row.classList.add('today');
      // highlight only via CSS — no extra text
    }
  });

  // --- Smooth scroll ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const offset = navbar.offsetHeight;
        window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - offset, behavior: 'smooth' });
      }
    });
  });

  // --- Scroll animations ---
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.contact-card, .about-grid, .hours-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(28px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
  });

});
