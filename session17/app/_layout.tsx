import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

// Tạo instance của QueryClient với staleTime mặc định là 5 phút
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 phút
    },
  },
});

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
