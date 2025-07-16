import store from '../../store';

export function initCartModal() {
  const cartModal = document.querySelector('.cart-modal');
  const cartOverlay = document.querySelector('.cart-modal__overlay');
  const cartClose = document.querySelector('.cart-modal__close');
  const cartBtn = document.querySelector('.header__cart');
  const cartList = document.querySelector('.cart-modal__list');
  const cartSum = document.querySelector('.cart-modal__sum');
  const cartCountBtn = document.querySelector('.header__cart');

  function openCart() {
    cartModal.classList.add('cart-modal--open');
    document.body.style.overflow = 'hidden';
  }
  function closeCart() {
    cartModal.classList.remove('cart-modal--open');
    document.body.style.overflow = '';
  }

  function renderCart(state) {
    if (!cartList || !cartSum || !cartCountBtn) return;
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
    // Счётчик на кнопке
    cartCountBtn.textContent = cart.reduce((acc, item) => acc + item.count, 0) || '';
  }

  if (cartBtn && cartModal && cartOverlay && cartClose) {
    cartBtn.addEventListener('click', openCart);
    cartOverlay.addEventListener('click', closeCart);
    cartClose.addEventListener('click', closeCart);
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeCart();
    });
  }

  // Обработка кнопок внутри корзины
  cartList?.addEventListener('click', (e) => {
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

  store.subscribe(renderCart);
  renderCart(store.state);
} 