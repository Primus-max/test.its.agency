// Простой store для состояния приложения
const store = {
  state: {
    products: [], // <--- добавлено для каталога
    cart: [],
  },
  listeners: [],
  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.listeners.forEach(fn => fn(this.state));
  },
  subscribe(fn) {
    this.listeners.push(fn);
    return () => {
      this.listeners = this.listeners.filter(l => l !== fn);
    };
  },
  addToCart(product) {
    const cart = [...this.state.cart];
    const idx = cart.findIndex(item => item.id === product.id);
    if (idx > -1) {
      cart[idx].count += 1;
    } else {
      cart.push({ ...product, count: 1 });
    }
    this.setState({ cart });
  },
  removeFromCart(productId) {
    const cart = this.state.cart.filter(item => item.id !== productId);
    this.setState({ cart });
  },
  changeCartCount(productId, delta) {
    const cart = this.state.cart.map(item =>
      item.id === productId ? { ...item, count: Math.max(1, item.count + delta) } : item
    );
    this.setState({ cart });
  },
  clearCart() {
    this.setState({ cart: [] });
  },
};

export default store; 