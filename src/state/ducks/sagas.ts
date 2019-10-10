import {
  all, call, delay, put, takeEvery,
} from 'redux-saga/effects';
import types, { Workout } from './workouts/types';

export function* fetchWorkouts() {
  const workouts: Workout[] = [{
    id: 1,
    name: 'legs',
  }, {
    id: 2,
    name: 'shoulders',
  }];

  yield delay(1000);
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
