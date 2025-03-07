import { apiPaths } from '@/utils/apiPaths';
import { BASE_API } from '@/utils/routes';
import { http, HttpResponse } from 'msw'
import mockExercisesCountInProgress from '../../__fixtures__/exercisesCountInProgress.json';
import mockExercisesCountClosed from '../../__fixtures__/exercisesCountClosed.json';
import mockScenarioParams from '../../__fixtures__/mockScenarioParams.json';
import mockScenarios from '../../__fixtures__/mockScenarios.json';
import mockExercises from '../../__fixtures__/exercises.json';
import { EXERCISE_STATUS } from '@/utils/constants';

export const handlers = [

    http.get(`${BASE_API}/exercises/count`, async ({ request }) => {
        const url = new URL(request.url)
        const status = url.searchParams.get('status')

        if (status === EXERCISE_STATUS.IN_PROGRESS) {
            return HttpResponse.json(mockExercisesCountInProgress, { status: 200 });
        }

        if (status === EXERCISE_STATUS.CLOSED) {
            return HttpResponse.json(mockExercisesCountClosed, { status: 200 });
        }

        return HttpResponse.json({ message: "Invalid status" }, { status: 400 });
    }),

    http.get(`${BASE_API}/scenarios/data`, async ({ request }) => {
        const url = new URL(request.url);
        const consoDataId = url.searchParams.get('consoDataId');
        if (consoDataId) {
            return HttpResponse.json(mockScenarioParams, { status: 200 });
        }
    }),


    http.get((`${BASE_API}${apiPaths.exercises()}`), async ({ }) => {
        return HttpResponse.json(mockExercises, { status: 200 });
    }),

    http.get(`${BASE_API}${apiPaths.scenarios()}`, async () => {
        return HttpResponse.json(mockScenarios, { status: 200 });
    }),





];