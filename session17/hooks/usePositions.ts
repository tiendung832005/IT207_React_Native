import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchPositions,
  fetchPositionById,
  createPosition,
  updatePosition,
  deletePosition,
} from '../api/positions';

export function usePositionsList() {
  return useQuery({
    queryKey: ['positions'],
    queryFn: fetchPositions,
  });
}

export function usePositionDetails(id) {
  return useQuery({
    queryKey: ['position', id],
    queryFn: () => fetchPositionById(id),
    enabled: !!id,
  });
}

export function useCreatePosition() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createPosition,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['positions'] });
    },
  });
}

export function useUpdatePosition(id) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => updatePosition(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['positions'] });
    },
  });
}

export function useDeletePosition() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deletePosition,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['positions'] });
    },
  });
}
