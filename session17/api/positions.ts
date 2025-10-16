// Xóa vị trí
export async function deletePosition(id: string | number) {
  const response = await axios.delete(`https://nest-api-public.ixe-agent.io.vn/api/v1/positions/${id}`);
  return response.data;
}
// Lấy chi tiết một vị trí
export async function fetchPositionById(id: string | number) {
  const response = await axios.get(`https://nest-api-public.ixe-agent.io.vn/api/v1/positions/${id}`);
  return response.data;
}
// Hàm cập nhật vị trí
export async function updatePosition(id: string | number, data: { positionName: string }) {
  const response = await axios.put(`https://nest-api-public.ixe-agent.io.vn/api/v1/positions/${id}`, data);
  return response.data;
}
import axios from 'axios';

export async function fetchPositions() {
  const response = await axios.get('https://nest-api-public.ixe-agent.io.vn/api/v1/positions');
  return response.data;
}

// Hàm tạo mới vị trí
export async function createPosition(data: { positionName: string }) {
  const response = await axios.post('https://nest-api-public.ixe-agent.io.vn/api/v1/positions', data);
  return response.data;
}
