import './style.scss';
import './components/Navbar/Navbar.scss';
import './components/Banner/index.js';
import './components/Sort/index.js';

import { initCatalog } from './components/Catalog/index.js';
import { initNavbar } from './components/Navbar/Navbar.js';

initNavbar();
initCatalog();

// Мобильные фильтры
const filtersOpenBtn = document.querySelector('.filters-mobile__open');
const filtersMobile = document.querySelector('.filters-mobile');
const filtersOverlay = document.querySelector('.filters-mobile__overlay');

if (filtersOpenBtn && filtersMobile && filtersOverlay) {
  filtersOpenBtn.addEventListener('click', () => {
    filtersMobile.classList.add('filters-mobile--open');
    filtersOverlay.style.display = 'block';
  });
  filtersOverlay.addEventListener('click', () => {
    filtersMobile.classList.remove('filters-mobile--open');
    filtersOverlay.style.display = 'none';
  });
  // Свайп вниз для закрытия (минимально)
  let startY = null;
  filtersMobile.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1) startY = e.touches[0].clientY;
  });
  filtersMobile.addEventListener('touchmove', (e) => {
    if (startY !== null && e.touches.length === 1) {
      const deltaY = e.touches[0].clientY - startY;
      if (deltaY > 60) {
        filtersMobile.classList.remove('filters-mobile--open');
        filtersOverlay.style.display = 'none';
        startY = null;
      }
    }
  });
  filtersMobile.addEventListener('touchend', () => {
    startY = null;
  });
}

// Здесь будет инициализация приложения
console.log('Приложение запущено');
const app = document.getElementById('app');
if (app) {
  const info = document.createElement('div');
  info.textContent = 'JS успешно подключён!';
  info.style.marginTop = '20px';
  info.style.color = '#ff6f61';
  app.appendChild(info);
} 