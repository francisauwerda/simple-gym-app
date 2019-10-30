import { State } from '../../types';
import { Exercise } from './types';

const selectExercises = (state: State, workoutId: Exercise['workoutId']) => {
  const allExercises = state.exercisesReducer.exercises;
  return allExercises.filter((e) => e.workoutId === workoutId);
};

export default {
  selectExercises,
};
