import { AppState } from '../../types';
import { Exercise, ExerciseWithLastModified } from './types';
import { setsSelectors } from '../sets';

const selectExercises = (state: AppState, workoutId: Exercise['workoutId']) => {
  const allExercises = state.exercisesReducer.exercises;
  return allExercises.filter((e) => e.workoutId === workoutId);
};

const selectExercisesWithLastModified = (
  state: AppState,
  workoutId: Exercise['workoutId'],
): ExerciseWithLastModified[] => {
  const exercises = selectExercises(state, workoutId);

  return exercises.map((exercise) => {
    const lastModified = setsSelectors
      .selectExerciseLastModified(state, exercise.id);

    return {
      ...exercise,
      lastModified,
    };
  });
};

export default {
  selectExercises,
  selectExercisesWithLastModified,
};
