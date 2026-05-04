// Header scroll effect
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 40);
});

// Mobile menu
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
if (hamburger) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });
}

// Active nav link
const currentPage = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(a => {
  const href = a.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    a.classList.add('active');
  }
});

// Lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
if (lightbox) {
  const imgs = Array.from(document.querySelectorAll('[data-lightbox]'));
  let current = 0;

  function openAt(index) {
    current = ((index % imgs.length) + imgs.length) % imgs.length;
    lightboxImg.src = imgs[current].src;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  imgs.forEach((img, i) => img.addEventListener('click', () => openAt(i)));

  document.getElementById('lightbox-close').addEventListener('click', closeLightbox);

  const prevBtn = document.getElementById('lightbox-prev');
  const nextBtn = document.getElementById('lightbox-next');

  if (prevBtn) {
    prevBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      openAt(current - 1);
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      openAt(current + 1);
    });
  }

  lightbox.addEventListener('click', function(e) {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', function(e) {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') openAt(current - 1);
    if (e.key === 'ArrowLeft') openAt(current + 1);
  });
}

// Contact form
const form = document.getElementById('contact-form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const city = document.getElementById('city').value.trim();
    const message = document.getElementById('message').value.trim();

    const text = `פנייה חדשה מהאתר 🌳\n\nשם: ${name}\nטלפון: ${phone}${city ? '\nעיר: ' + city : ''}${message ? '\nפרטים: ' + message : ''}`;
    window.open('https://wa.me/972525522224?text=' + encodeURIComponent(text), '_blank');

    document.getElementById('form-success').style.display = 'block';
    form.reset();
  });
}
