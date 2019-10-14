import {
  all, call, put, takeEvery,
} from 'redux-saga/effects';

import types from './workouts/types';
import api from '../../api';

export function* fetchWorkouts() {
  const workouts = yield api.workouts.getWorkouts();

  yield put({ type: types.FETCH_SUCCESS, payload: { workouts } });
}

export function* watchFetchWorkouts() {
  yield takeEvery(types.FETCH, fetchWorkouts);
}

export default function* rootSaga() {
  yield all([
    call(watchFetchWorkouts),
  ]);
}
