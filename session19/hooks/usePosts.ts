import { useQuery } from '@tanstack/react-query';
import { fetchPosts, fetchPostById } from '../api/posts';

export function usePostsList() {
  return useQuery({ queryKey: ['posts'], queryFn: () => fetchPosts() });
}

export function usePostDetails(id?: string | number) {
  return useQuery({ queryKey: ['post', id], queryFn: () => fetchPostById(id as string | number), enabled: !!id });
}
