'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect } from 'react';

function MockProvider() {
  useEffect(() => {
    if (typeof window != 'undefined') {
      import('@/mocks')
        .then(({ setupMocks }) => {
          setupMocks();
        })
        .catch((error) => {
          console.error('Failed to initialize MSW:', error);
        });
    }
  }, []);

  return null;
}

export default function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        throwOnError: false,
        retry: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <MockProvider />
      {children}
    </QueryClientProvider>
  );
}
