import { put, takeEvery } from 'redux-saga/effects';

import types, { Exercise } from './types';
import ExercisesActions from './actions';
import api from '../../../api';

function* fetchExercises({ payload }: ReturnType<typeof ExercisesActions.fetchExercises>) {
  const { workoutId } = payload;
  const exercises: Exercise[] = yield api.exercises.getExercises(workoutId);

  yield put({ type: types.FETCH_SUCCESS, payload: { exercises } });
}

// eslint-disable-next-line import/prefer-default-export
export function* watchFetchExercises() {
  yield takeEvery(types.FETCH, fetchExercises);
}
