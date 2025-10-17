import { useQuery } from '@tanstack/react-query';
import { fetchProducts, fetchProductById } from '../api/products';

export function useProductsList() {
  return useQuery({ queryKey: ['products'], queryFn: () => fetchProducts() });
}

export function useProductDetails(id?: string | number) {
  return useQuery({ queryKey: ['product', id], queryFn: () => fetchProductById(id as string | number), enabled: !!id });
}
