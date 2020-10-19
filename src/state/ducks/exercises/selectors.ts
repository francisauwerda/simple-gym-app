import { AppState } from '../../types';
import { Exercise, ExerciseWithLastModified } from './types';
import { setsSelectors } from '../sets';
import { sortItems } from '../../utils';
import { Workout } from '../workouts/types';

// TODO: Think about removing this or making it redundent.
const selectExercises = (state: AppState, workoutId: Exercise['workoutId']) => {
  const allExercises = state.exercisesReducer.exercises;
  return allExercises.filter((e) => e.workoutId === workoutId);
};

const selectExercisesWithLastModified = (
  state: AppState,
  workout: Workout,
): ExerciseWithLastModified[] => {
  const exercises = selectExercises(state, workout.id);
  const settings = workout.exerciseSettings;

  const exercisesWithLastModified = exercises.map((exercise) => {
    const lastModified = setsSelectors
      .selectExerciseLastModified(state, exercise.id);

    return {
      ...exercise,
      lastModified,
    };
  });

  const exercisesSorted = sortItems(exercisesWithLastModified, settings);

  return (exercisesSorted as ExerciseWithLastModified[]);
};

export default {
  selectExercises,
  selectExercisesWithLastModified,
};
