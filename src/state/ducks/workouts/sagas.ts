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

function* editWorkout({ payload }: ReturnType<typeof WorkoutActions.editWorkout>) {
  try {
    const { id, fields } = payload;
    const workout = yield api.workouts.editWorkout(id, fields);

    yield put({ type: types.EDIT_SUCCESS, payload: { workout } });
  } catch (error) {
    yield put({ type: types.EDIT_FAILURE, error });
  }
}

function* fetchGlobalWorkoutSettings() {
  const globalWorkoutSettings = yield api.workouts.getGlobalWorkoutSettings();

  yield put({
    type: types.FETCH_GLOBAL_WORKOUT_SETTINGS_SUCCESS,
    payload: { globalWorkoutSettings },
  });
}

function* setGlobalWorkoutSettings({
  payload,
}: ReturnType<typeof WorkoutActions.setGlobalWorkoutSettings>) {
  const globalWorkoutSettings = yield api
    .workouts.setGlobalWorkoutSettings(payload.globalWorkoutSettings);

  yield put({
    type: types.SET_GLOBAL_WORKOUT_SETTINGS_SUCCESS,
    payload: { globalWorkoutSettings },
  });
}

function* watchFetchWorkouts() {
  yield takeEvery(types.FETCH, fetchWorkouts);
}

function* watchAddWorkout() {
  yield takeEvery(types.ADD, addWorkout);
}

function* watchDeleteWorkout() {
  yield takeEvery(types.DELETE, deleteWorkout);
}

function* watchEditWorkout() {
  yield takeEvery(types.EDIT, editWorkout);
}

function* watchFetchGloablWorkoutSettings() {
  yield takeEvery(types.FETCH_GLOBAL_WORKOUT_SETTINGS, fetchGlobalWorkoutSettings);
}

function* watchSetGloablWorkoutSettings() {
  yield takeEvery(types.SET_GLOBAL_WORKOUT_SETTINGS, setGlobalWorkoutSettings);
}

// eslint-disable-next-line import/prefer-default-export
export const watcherSagas = [
  watchFetchWorkouts(),
  watchAddWorkout(),
  watchDeleteWorkout(),
  watchEditWorkout(),
  watchFetchGloablWorkoutSettings(),
  watchSetGloablWorkoutSettings(),
];
