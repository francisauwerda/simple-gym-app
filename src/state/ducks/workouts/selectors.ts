import moment from 'moment';
import { Set } from '../sets/types';
import { exercisesSelectors } from '../exercises';
import { setsSelectors } from '../sets';
import { Workout, WorkoutWithLastModified } from './types';
import { AppState } from '../../types';

const selectWorkouts = (state: AppState) => state.workoutsReducer.workouts;

export const getLastModifiedFromExerciseIds = (state: AppState, exerciseIds: Set['exerciseId'][]): Set['date'] => {
  const setDates = exerciseIds
    .map((exerciseId: Set['exerciseId']) => setsSelectors
      .selectExerciseLastModified(state, exerciseId))
    .sort((a, b) => moment(b).valueOf() - moment(a).valueOf());

  return setDates[0];
};

const getLastModifiedWorkout = (state: AppState, workout: Workout): Set['date'] => {
  const exerciseIds = exercisesSelectors
    .selectExercises(state, workout.id)
    .map((exercise) => exercise.id);

  const lastModified = getLastModifiedFromExerciseIds(state, exerciseIds);
  return lastModified;
};

const selectWorkoutsWithLastModified = (state: AppState): WorkoutWithLastModified[] => {
  const workouts = selectWorkouts(state);

  const result = workouts.map((workout) => {
    const lastModified = getLastModifiedWorkout(state, workout);
    return {
      ...workout,
      lastModified,
    };
  });

  return result;
};

export default {
  selectWorkouts,
  selectWorkoutsWithLastModified,
};
