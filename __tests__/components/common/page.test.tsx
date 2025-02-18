import { render, screen } from '@testing-library/react';
import HomePage from '@/app/page';

describe('HomePage', () => {
  test('renders all components correctly', () => {
    render(<HomePage />);
    // Add further assertions or checks as needed
    expect(screen.getByText('Bienvenue au SteerLinX')).toBeInTheDocument();
  });
});
