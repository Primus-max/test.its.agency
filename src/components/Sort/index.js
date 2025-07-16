const dropdown = document.querySelector('.sort__dropdown');
const toggle = document.querySelector('.sort__toggle');
const list = document.querySelector('.sort__list');
const toggleText = toggle ? toggle.querySelector('.sort__toggle-text') : null;
const overlay = document.querySelector('.sort__overlay');

if (dropdown && toggle && list && toggleText && overlay) {
  // По умолчанию выбран первый пункт
  const firstItem = list.querySelector('.sort__item');
  if (firstItem) {
    firstItem.classList.add('sort__item--active');
    toggleText.textContent = firstItem.textContent;
  }

  toggle.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = dropdown.classList.toggle('open');
    overlay.style.display = isOpen ? 'block' : 'none';
  });

  list.addEventListener('click', (e) => {
    if (e.target.classList.contains('sort__item')) {
      list.querySelectorAll('.sort__item').forEach(i => i.classList.remove('sort__item--active'));
      e.target.classList.add('sort__item--active');
      toggleText.textContent = e.target.textContent;
      dropdown.classList.remove('open');
      overlay.style.display = 'none';
    }
  });

  overlay.addEventListener('click', () => {
    dropdown.classList.remove('open');
    overlay.style.display = 'none';
  });

  document.addEventListener('click', (e) => {
    if (!dropdown.contains(e.target) && e.target !== overlay) {
      dropdown.classList.remove('open');
      overlay.style.display = 'none';
    }
  });
} 