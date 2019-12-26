import moment from 'moment';
import { State } from '../../types';
import { Set } from '../sets/types';
import { exercisesSelectors } from '../exercises';
import { setsSelectors } from '../sets';
import { Workout, WorkoutWithLastModified } from './types';


const selectWorkouts = (state: State) => state.workoutsReducer.workouts;

const getLastModified = (state: State, workout: Workout): Set['date'] => {
  // Get an array of all exercise IDs
  const exerciseIds = exercisesSelectors
    .selectExercises(state, workout.id)
    .map((exercise) => exercise.id);

  // Create an array of all set dates for all these exercises.
  const setDates: Set['date'][] = exerciseIds
    .reduce((acc, exerciseId) => {
      const allExerciseSetsDates = setsSelectors
        .selectExerciseSets(state, exerciseId)
        .map((set) => set.date);

      return [
        ...acc,
        ...allExerciseSetsDates,
      ];
    }, [])
    .sort((a, b) => moment(b).valueOf() - moment(a).valueOf());

  return setDates[0];
};

const selectWorkoutsWithLastModified = (state: State): WorkoutWithLastModified[] => {
  const workouts = selectWorkouts(state);

  const result = workouts.map((workout) => {
    const lastModified = getLastModified(state, workout);
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
