// Smooth fade-in animation when scrolling
const fadeEls = document.querySelectorAll('.fade-in');

function showOnScroll() {
  const triggerBottom = window.innerHeight * 0.85;
  fadeEls.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < triggerBottom) {
      el.classList.add('visible');
    }
  });
}

window.addEventListener('scroll', showOnScroll);
window.addEventListener('load', showOnScroll);

