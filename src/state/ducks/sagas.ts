import { all } from 'redux-saga/effects';

import { watcherSagas as watcherWorkoutsSagas } from './workouts/sagas';
import { watcherSagas as watcherExercisesSagas } from './exercises/sagas';
import { watcherSagas as watcherSetsSagas } from './sets/sagas';

export default function* rootSaga() {
  yield all([
    ...watcherWorkoutsSagas,
    ...watcherExercisesSagas,
    ...watcherSetsSagas,
  ]);
}
