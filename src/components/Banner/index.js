const slides = document.querySelectorAll('.banner__slide');
const dots = document.querySelectorAll('.banner__dot');
const left = document.querySelector('.banner__arrow--left');
const right = document.querySelector('.banner__arrow--right');
let current = 0;

function showSlide(idx) {
  slides.forEach((slide, i) => {
    slide.classList.toggle('banner__slide--active', i === idx);
  });
  dots.forEach((dot, i) => {
    dot.classList.toggle('banner__dot--active', i === idx);
  });
  current = idx;
}

left.addEventListener('click', () => {
  let idx = (current - 1 + slides.length) % slides.length;
  showSlide(idx);
});
right.addEventListener('click', () => {
  let idx = (current + 1) % slides.length;
  showSlide(idx);
});
dots.forEach((dot, i) => {
  dot.addEventListener('click', () => showSlide(i));
});

// Инициализация
showSlide(0); 