import { put, takeEvery } from 'redux-saga/effects';

import types, { Set } from './types';
import SetActions from './actions';
import api from '../../../api';

function* fetchSets({ payload }: ReturnType<typeof SetActions.fetchSets>) {
  const { exerciseId } = payload;
  const sets: Set[] = yield api.sets.getSets(exerciseId);

  yield put({ type: types.FETCH_SUCCESS, payload: { sets } });
}

function* addSet({ payload }: ReturnType<typeof SetActions.addSet>) {
  try {
    const sets = yield api.sets.addSet(payload);

    yield put({ type: types.ADD_SUCCESS, payload: { sets } });
  } catch (error) {
    yield put({ type: types.ADD_FAILURE, error });
  }
}

function* deleteSet({ payload }: ReturnType<typeof SetActions.deleteSet>) {
  try {
    const { id } = payload;
    const sets = yield api.sets.deleteSet(id);

    yield put({ type: types.DELETE_SUCCESS, payload: { sets } });
  } catch (error) {
    yield put({ type: types.DELETE_FAILURE, error });
  }
}

function* editSet({ payload }: ReturnType<typeof SetActions.editSet>) {
  try {
    const { id, fields } = payload;
    const set = yield api.sets.editSet(id, fields);

    yield put({ type: types.EDIT_SUCCESS, payload: { set } });
  } catch (error) {
    yield put({ type: types.EDIT_FAILURE, error });
  }
}

export function* watchFetchSets() {
  yield takeEvery(types.FETCH, fetchSets);
}

export function* watchAddSet() {
  yield takeEvery(types.ADD, addSet);
}

export function* watchDeleteSet() {
  yield takeEvery(types.DELETE, deleteSet);
}

export function* watchEditSet() {
  yield takeEvery(types.EDIT, editSet);
}

export const watcherSagas = [
  watchFetchSets(),
  watchAddSet(),
  watchDeleteSet(),
  watchEditSet(),
];
