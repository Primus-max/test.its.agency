import './style.scss';
import './components/Navbar/Navbar.scss';
import { initNavbar } from './components/Navbar/Navbar.js';
import './components/Banner/index.js';
import { initCatalog } from './components/Catalog/index.js';
import './components/Sort/index.js';

initNavbar();
initCatalog();

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