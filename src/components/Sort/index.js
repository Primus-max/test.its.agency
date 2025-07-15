const dropdown = document.querySelector('.sort__dropdown');
const toggle = document.querySelector('.sort__toggle');
const list = document.querySelector('.sort__list');

if (dropdown && toggle && list) {
  toggle.addEventListener('click', () => {
    dropdown.classList.toggle('open');
  });
  document.addEventListener('click', (e) => {
    if (!dropdown.contains(e.target)) {
      dropdown.classList.remove('open');
    }
  });
  list.addEventListener('click', (e) => {
    if (e.target.classList.contains('sort__item')) {
      list.querySelectorAll('.sort__item').forEach(i => i.classList.remove('sort__item--active'));
      e.target.classList.add('sort__item--active');
      toggle.textContent = e.target.textContent;
      dropdown.classList.remove('open');
    }
  });
} 