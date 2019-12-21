import { put, takeEvery } from 'redux-saga/effects';

import types from './types';
import api from '../../../api';
import WorkoutActions from './actions';

function* fetchWorkouts() {
  const workouts = yield api.workouts.getWorkouts();

  yield put({ type: types.FETCH_SUCCESS, payload: { workouts } });
}

function* addWorkout({ payload }: ReturnType<typeof WorkoutActions.addWorkout>) {
  try {
    const workouts = yield api.workouts.addWorkout(payload);

    yield put({ type: types.ADD_SUCCESS, payload: { workouts } });
  } catch (error) {
    yield put({ type: types.ADD_FAILURE, error });
  }
}

function* deleteWorkout({ payload }: ReturnType<typeof WorkoutActions.deleteWorkout>) {
  try {
    const { id } = payload;
    const workouts = yield api.workouts.deleteWorkout(id);

    yield put({ type: types.DELETE_SUCCESS, payload: { workouts } });
  } catch (error) {
    yield put({ type: types.DELETE_FAILURE, error });
  }
}

export function* watchFetchWorkouts() {
  yield takeEvery(types.FETCH, fetchWorkouts);
}

export function* watchAddWorkout() {
  yield takeEvery(types.ADD, addWorkout);
}

export function* watchDeleteWorkout() {
  yield takeEvery(types.DELETE, deleteWorkout);
}

export const watcherSagas = [
  watchFetchWorkouts(),
  watchAddWorkout(),
  watchDeleteWorkout(),
];
