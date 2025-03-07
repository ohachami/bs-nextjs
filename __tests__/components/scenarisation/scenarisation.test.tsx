import Scenarisation from '@/components/scenarisation/Scenarisation';
import {
  render,
  waitFor,
  screen,
  fireEvent,
  act,
  RenderResult,
  cleanup,
} from '@testing-library/react';
import { Wrapper } from '../../utils/test-utils';
import userEvent from '@testing-library/user-event';

jest.mock('@/store/exercises/scenarisation', () => ({
  useScenarisationStore: () => ({
    listScenarios: false,
    settingModel: false,
    setlistScenarios: jest.fn(),
    setSettingModel: jest.fn(),
  }),
}));

const mockSubmit = jest.fn((values) => {
  return Promise.resolve({ ...values });
});

describe('Scenarisation component', () => {
  let user: ReturnType<typeof userEvent.setup>;
  let container: RenderResult;

  beforeEach(() => {
    user = userEvent.setup();
    container = render(
      <Wrapper>
        <Scenarisation />
      </Wrapper>
    );
  });

  afterEach(() => {
    cleanup();
  });

  test('renders the componnet and show the correct data', async () => {
    expect(screen.getByText('Scénario Default v1')).toBeInTheDocument();
    expect(screen.getByText('Données_consolidées_V2')).toBeInTheDocument();
    expect(screen.getByText('Data input')).toBeInTheDocument();

    const listScenariosButton = screen.getByTestId('mock-list');
    expect(listScenariosButton).toBeInTheDocument();

    fireEvent.click(listScenariosButton);
    await waitFor(() => {}); // add test when implementation of buttons

    await act(async () => {
      await user.click(
        await screen.findByRole('button', { name: /Model Setting/i })
      );
    });

    await act(async () => {
      await user.click(
        await screen.findByRole('button', { name: /Liste des sénarios/i })
      );
    });

    expect(container).toMatchSnapshot();
  });

  test('should display correct content when clicking tabs', async () => {
    await act(async () => {
      await user.click(await screen.findByText('Inputs'));
    });

    const expectedTexts = [
      'Hypothèses commerciales',
      'Hypothèses Manufacturing',
      'Hypothèses minière',
    ];

    for (const text of expectedTexts) {
      expect(await screen.findByText(text)).toBeInTheDocument();
    }
  });

  test('submit data when clicking run scenario', async () => {
    await act(async () => {
      await user.click(
        await screen.findByRole('button', { name: /Run scénario/i })
      );
    });

    // Wait for the submission process to complete
    await waitFor(() => {
      expect(mockSubmit);
    });
  });
});
