import { fetchProducts } from '../../api';
import store from '../../store';

const catalogList = document.querySelector('.catalog-list');

function renderProductCard(product) {
  const imgSrc = product.image && product.image !== '' ? product.image : 'https://placehold.co/284x378?text=No+Image';
  return `
    <div class="product-card">
      <div class="product-card__img-wrap">
        <img class="product-card__img" src="${imgSrc}" alt="${product.title}">
      </div>
      <div class="product-card__info">
        <div class="product-card__title">${product.title}</div>
        <div class="product-card__bottom">
          <div class="product-card__price">${product.price} ₽</div>
          <button class="product-card__add" type="button">+</button>
        </div>
      </div>
    </div>
  `;
}

function renderCatalog(products) {
  if (!catalogList) return;
  // Показываем только первые 10 товаров
  catalogList.innerHTML = products.slice(0, 10).map(renderProductCard).join('');
}

export async function initCatalog() {
  store.setState({ loading: true });
  try {
    const products = await fetchProducts();
    store.setState({ products, loading: false });
    renderCatalog(products);
  } catch (e) {
    store.setState({ error: 'Ошибка загрузки товаров', loading: false });
    catalogList.innerHTML = '<div>Ошибка загрузки товаров</div>';
  }
}

store.subscribe(state => {
  renderCatalog(state.products);
}); 