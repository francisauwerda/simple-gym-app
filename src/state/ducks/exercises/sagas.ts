import { put, takeEvery } from 'redux-saga/effects';

import types, { Exercise } from './types';
import ExercisesActions from './actions';
import api from '../../../api';

function* fetchExercises({ payload }: ReturnType<typeof ExercisesActions.fetchExercises>) {
  const { workoutId } = payload;
  const exercises: Exercise[] = yield api.exercises.getExercises(workoutId);

  yield put({ type: types.FETCH_SUCCESS, payload: { exercises } });
}

function* addExercise({ payload }: ReturnType<typeof ExercisesActions.addExercise>) {
  try {
    const exercises = yield api.exercises.addExercise(payload);

    yield put({ type: types.ADD_SUCCESS, payload: { exercises } });
  } catch (error) {
    yield put({ type: types.ADD_FAILURE, error });
  }
}

function* deleteExercise({ payload }: ReturnType<typeof ExercisesActions.deleteExercise>) {
  try {
    const { id } = payload;
    const exercises = yield api.exercises.deleteExercise(id);

    yield put({ type: types.DELETE_SUCCESS, payload: { exercises } });
  } catch (error) {
    yield put({ type: types.DELETE_FAILURE, error });
  }
}

function* editExercise({ payload }: ReturnType<typeof ExercisesActions.editExercise>) {
  try {
    const { id, fields } = payload;
    const exercise = yield api.exercises.editExercise(id, fields);

    yield put({ type: types.EDIT_SUCCESS, payload: { exercise } });
  } catch (error) {
    yield put({ type: types.EDIT_FAILURE, error });
  }
}

export function* watchFetchExercises() {
  yield takeEvery(types.FETCH, fetchExercises);
}

export function* watchAddExercise() {
  yield takeEvery(types.ADD, addExercise);
}

export function* watchDeleteExercise() {
  yield takeEvery(types.DELETE, deleteExercise);
}

export function* watchEditExercise() {
  yield takeEvery(types.EDIT, editExercise);
}

export const watcherSagas = [
  watchFetchExercises(),
  watchAddExercise(),
  watchDeleteExercise(),
  watchEditExercise(),
];
