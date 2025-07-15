import axios from 'axios';

const API_URL = 'https://687610d4814c0dfa653a769b.mockapi.io/api/v1/products';

export async function fetchProducts() {
  const res = await axios.get(API_URL);
  return res.data;
}
