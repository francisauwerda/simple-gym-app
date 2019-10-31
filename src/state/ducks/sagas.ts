import { all, call } from 'redux-saga/effects';
import { watchFetchWorkouts, watchAddWorkout } from './workouts/sagas';
import { watchFetchExercises, watchAddExercise } from './exercises/sagas';

// TODO: spread all here
export default function* rootSaga() {
  yield all([
    call(watchFetchWorkouts),
    call(watchAddWorkout),
    call(watchFetchExercises),
    call(watchAddExercise),
  ]);
}
