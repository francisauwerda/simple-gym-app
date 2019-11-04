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

export function* watchFetchSets() {
  yield takeEvery(types.FETCH, fetchSets);
}

export function* watchAddSet() {
  yield takeEvery(types.ADD, addSet);
}

export const watcherSagas = [
  watchFetchSets(),
  watchAddSet(),
];
