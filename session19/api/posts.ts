import axios from 'axios';

const BASE = 'https://api.ixe-agent.io.vn/api/v1';

export async function fetchPosts(params?: Record<string, any>) {
  const res = await axios.get(`${BASE}/posts`, { params });
  return res.data;
}

export async function fetchPostById(id: string | number) {
  const res = await axios.get(`${BASE}/posts/${id}`);
  return res.data;
}
