import './style.scss';
import './components/Navbar/Navbar.scss';
import './components/Banner/index.js';
import './components/Sort/index.js';

import { initCartModal } from './components/Cart/index.js';
import { initCatalog } from './components/Catalog/index.js';
import { initNavbar } from './components/Navbar/Navbar.js';
import store from './store.js';

initNavbar();
initCatalog();
// initCartModal();

function renderCartCount() {
  const cartBtn = document.querySelector('.header__cart');
  if (cartBtn) {
    const count = store.state.cart.reduce((acc, item) => acc + item.count, 0);
    cartBtn.textContent = count || '';
  }
}

function openCartModal() {
  if (document.querySelector('.cart-modal')) return;
  const cartModal = document.createElement('div');
  cartModal.className = 'cart-modal';
  cartModal.innerHTML = `
    <div class="cart-modal__overlay"></div>
    <div class="cart-modal__container">
      <div class="cart-modal__header"><span class="cart-modal__title">Корзина</span>
        <button class="cart-modal__close" type="button" aria-label="Закрыть">×</button>
      </div>
      <div class="cart-modal__body">
        <ul class="cart-modal__list"></ul>
      </div>
      <div class="cart-modal__footer">
        <div class="cart-modal__total"><span>Итого</span><span class="cart-modal__sum">0 ₽</span></div>
        <button class="cart-modal__order">Оформить заказ </button>
      </div>
    </div>
  `;
  document.body.appendChild(cartModal);

  function close() {
    cartModal.remove();
    document.body.style.overflow = '';
    document.removeEventListener('keydown', onEsc);
  }
  function onEsc(e) {
    if (e.key === 'Escape') close();
  }
  cartModal.querySelector('.cart-modal__overlay').onclick = close;
  cartModal.querySelector('.cart-modal__close').onclick = close;
  document.addEventListener('keydown', onEsc);
  document.body.style.overflow = 'hidden';

  // Рендерим содержимое корзины
  function renderCart(state) {
    const cartList = cartModal.querySelector('.cart-modal__list');
    const cartSum = cartModal.querySelector('.cart-modal__sum');
    const cart = state.cart || [];
    cartList.innerHTML = cart.length === 0
      ? '<li style="padding: 32px 0; text-align: center; color: #888;">Корзина пуста</li>'
      : cart.map(item => `
        <li class="cart-modal__item" data-id="${item.id}">
          <img class="cart-modal__img" src="${item.image || 'https://placehold.co/60x60'}" alt="${item.title}">
          <div class="cart-modal__info">
            <div class="cart-modal__item-title">${item.title}</div>
            <div class="cart-modal__item-price">${item.price} ₽</div>
          </div>
          <div class="cart-modal__controls">
            <button class="cart-modal__minus" type="button">-</button>
            <span class="cart-modal__count">${item.count}</span>
            <button class="cart-modal__plus" type="button">+</button>
          </div>
          <button class="cart-modal__remove" type="button">×</button>
        </li>
      `).join('');
    // Сумма
    const sum = cart.reduce((acc, item) => acc + item.price * item.count, 0);
    cartSum.textContent = sum + ' ₽';
  }

  cartModal.querySelector('.cart-modal__list').addEventListener('click', (e) => {
    const li = e.target.closest('.cart-modal__item');
    if (!li) return;
    const id = li.getAttribute('data-id');
    if (e.target.classList.contains('cart-modal__plus')) {
      store.changeCartCount(id, 1);
    }
    if (e.target.classList.contains('cart-modal__minus')) {
      store.changeCartCount(id, -1);
    }
    if (e.target.classList.contains('cart-modal__remove')) {
      store.removeFromCart(id);
    }
  });

  const unsubscribe = store.subscribe((state) => {
    renderCart(state);
    renderCartCount();
  });
  renderCart(store.state);

  cartModal.addEventListener('remove', unsubscribe);
}

window.addEventListener('load', () => {
  const cartBtn = document.querySelector('.header__cart');
  if (cartBtn) {
    cartBtn.addEventListener('click', openCartModal);
    renderCartCount();
  }
  initNavbar();
  initCatalog();
});

initNavbar();
initCatalog();
initCartModal();

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