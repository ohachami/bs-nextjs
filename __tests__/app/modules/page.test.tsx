import { render, renderHook, waitFor, screen } from '@testing-library/react';
import { useExercisesCountByStatus } from '@/services/exercises.service';
import Module from '@/app/modules/[module]/page';
import { EXERCISE_STATUS } from '@/utils/constants';
import { Wrapper } from '../../utils/test-utils';

describe('Module page', () => {
  test('renders the component and shows the correct count', async () => {
    const { result: countInProgress } = renderHook(
      () => useExercisesCountByStatus(EXERCISE_STATUS.IN_PROGRESS),
      {
        wrapper: Wrapper,
      }
    );
    //Wait for data to be available
    await waitFor(() => expect(countInProgress.current.isSuccess).toBe(true));
    expect(countInProgress.current.data).toBe(9);

    const { result: countClosed } = renderHook(
      () => useExercisesCountByStatus(EXERCISE_STATUS.CLOSED),
      {
        wrapper: Wrapper,
      }
    );
    await waitFor(() => expect(countClosed.current.isSuccess).toBe(true));
    expect(countClosed.current.data).toBe(13);

    render(
      <Wrapper>
        <Module />
      </Wrapper>
    );

    expect(
      screen.getByText('Tactical planning (business steering)')
    ).toBeInTheDocument();

    expect(
      screen.getByText(`${countClosed.current.data} Exercices clôturés`)
    ).toBeInTheDocument();

    expect(
      screen.getByText(`${countInProgress.current.data} Exercices en cours`)
    ).toBeInTheDocument();

    expect(screen.getByText('5 Simulations')).toBeInTheDocument();
  });
});
