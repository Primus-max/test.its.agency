// Простой store для состояния приложения
const store = {
  state: {
    products: [],
    filters: {},
    sort: 'expensive',
    loading: false,
    error: null,
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
};

export default store; 