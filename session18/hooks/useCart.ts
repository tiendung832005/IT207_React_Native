import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getCart, addToCart, updateCartItem, deleteCartItem, clearCart } from '../api/cart';

export function useCart() {
  return useQuery({ queryKey: ['cart'], queryFn: getCart });
}

export function useAddToCart() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: addToCart, onSuccess: () => qc.invalidateQueries({ queryKey: ['cart'] }) });
}

export function useUpdateCartItem() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: ({ id, payload }: any) => updateCartItem(id, payload), onSuccess: () => qc.invalidateQueries({ queryKey: ['cart'] }) });
}

export function useDeleteCartItem() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: deleteCartItem, onSuccess: () => qc.invalidateQueries({ queryKey: ['cart'] }) });
}

export function useClearCart() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: clearCart, onSuccess: () => qc.invalidateQueries({ queryKey: ['cart'] }) });
}
