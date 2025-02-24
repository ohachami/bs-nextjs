import { render, renderHook, waitFor, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useExercisesCount } from '@/services/exercises.service';
import Module from '@/app/modules/[module]/page';

const queryClient = new QueryClient();
const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('Module page', () => {
  test('renders the component and shows the correct count', async () => {
    const { result } = renderHook(() => useExercisesCount(), { wrapper });
    // // Wait for data to be available
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    console.log({ result: result.current.data });
    expect(result.current.data).toBe(19);

    render(
      <QueryClientProvider client={queryClient}>
        <Module />
      </QueryClientProvider>
    );

    expect(
      screen.getByText('Tactical planning (business steering)')
    ).toBeInTheDocument();
    expect(screen.getByText('19 Exercices publiques')).toBeInTheDocument();
    expect(screen.getByText('0 Exercices locaux')).toBeInTheDocument();
    expect(screen.getByText('5 Simulations')).toBeInTheDocument();
  });
});
