import { apiPaths } from '@/utils/apiPaths';
import { BASE_API } from '@/utils/routes';
import { http, HttpResponse } from 'msw'
import mockExercisesCount from '../../__fixtures__/exercisesCount.json';
import mockExercises from '../../__fixtures__/exercises.json';

export const handlers = [
    http.get((`${BASE_API}${apiPaths.exercisesCount()}`), async ({ }) => {
        return HttpResponse.json(mockExercisesCount, { status: 200 });
    }),
    http.get((`${BASE_API}${apiPaths.exercises()}`), async ({ }) => {
        return HttpResponse.json(mockExercises, { status: 200 });
    }),
];