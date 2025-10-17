import axios from 'axios';

const BASE = 'https://nest-api-public.ixe-agent.io.vn/api/v1';

export async function fetchProducts(params?: Record<string, any>) {
  const res = await axios.get(`${BASE}/products`, { params });
  return res.data;
}

export async function fetchProductById(id: string | number) {
  const res = await axios.get(`${BASE}/products/${id}`);
  return res.data;
}
