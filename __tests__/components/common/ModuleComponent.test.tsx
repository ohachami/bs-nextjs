import ModuleComponent from '@/components/common/ModuleComponent';
import { render, screen } from '@testing-library/react';
import { ChartLine } from 'lucide-react';

describe('ModuleComponent', () => {
  it('renders title and description', () => {
    const { container } = render(
      <ModuleComponent
        icon={ChartLine}
        title="Market"
        description="A description"
        variant="primary"
      />
    );
    expect(container).toMatchSnapshot();
    expect(screen.getByText('Market')).toBeInTheDocument();
    expect(screen.getByText('A description')).toBeInTheDocument();
  });
});

describe('ModuleComponent', () => {
  it('should render a link when `to` prop is provided', () => {
    const { container } = render(
      <ModuleComponent
        icon={ChartLine}
        title="Market"
        description="A description"
        variant="primary"
        to="/modules/tacticalPlanning/exercises"
      />
    );

    const link = container.querySelector('a');
    expect(link).toHaveAttribute('href', '/modules/tacticalPlanning/exercises');
  });

  it('should not render a link when `to` prop is not provided', () => {
    const { container } = render(
      <ModuleComponent
        icon={ChartLine}
        title="Market"
        description="A description"
        variant="primary"
      />
    );

    const link = container.querySelector('a');
    expect(link).toBeNull();
  });
});

describe('ModuleComponent', () => {
  it('should render children when passed', () => {
    render(
      <ModuleComponent
        icon={ChartLine}
        title="Market"
        description="A description"
        variant="primary"
      >
        <p>Additional content</p>
      </ModuleComponent>
    );

    expect(screen.getByText('Additional content')).toBeInTheDocument();
  });

  it('should not render children if not passed', () => {
    render(
      <ModuleComponent
        icon={ChartLine}
        title="Market"
        description="A description"
        variant="primary"
      />
    );

    const children = screen.queryByText('Additional content');
    expect(children).toBeNull();
  });
});
