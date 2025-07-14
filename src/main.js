import './style.scss';

console.log('Приложение запущено');
const app = document.getElementById('app');
if (app) {
  const info = document.createElement('div');
  info.textContent = 'JS успешно подключён!';
  info.style.marginTop = '20px';
  info.style.color = '#ff6f61';
  app.appendChild(info);
} 