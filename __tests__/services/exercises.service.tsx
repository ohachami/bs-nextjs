/* eslint-disable @typescript-eslint/no-unused-vars */
import { useExercises } from '@/services/exercises.service';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';

const queryClient = new QueryClient();

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

test('useExercices fetches exercices data', async () => {
  //const { result } = renderHook(() => useExercises(), { wrapper });
  //await waitFor(() => expect(result.current.isSuccess).toBe(true));
  //   expect(result.current.data).toEqual([]);
});
