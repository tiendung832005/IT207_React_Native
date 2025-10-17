import axios from 'axios';

const BASE = 'https://nest-api-public.ixe-agent.io.vn/api/v1';

// Add product to cart
export async function addToCart(payload: { productId: number | string; quantity: number }) {
  const res = await axios.post(`${BASE}/carts/carts/add`, payload);
  return res.data;
}

// Get user's cart
export async function getCart() {
  const res = await axios.get(`${BASE}/carts/carts`);
  return res.data;
}

// Update cart item quantity
export async function updateCartItem(cartItemId: string | number, payload: { quantity: number }) {
  const res = await axios.put(`${BASE}/carts/carts/items/${cartItemId}`, payload);
  return res.data;
}

// Delete a cart item
export async function deleteCartItem(cartItemId: string | number) {
  const res = await axios.delete(`${BASE}/carts/carts/items/${cartItemId}`);
  return res.data;
}

// Clear entire cart
export async function clearCart() {
  const res = await axios.delete(`${BASE}/carts/carts/clear`);
  return res.data;
}
