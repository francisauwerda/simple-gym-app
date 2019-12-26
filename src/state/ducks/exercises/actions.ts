import types, { Exercise, ExerciseDetails } from './types';

const fetchExercises = (workoutId?: Exercise['workoutId']) => ({
  type: types.FETCH,
  payload: { workoutId },
});

const addExercise = (exercise: ExerciseDetails) => ({
  type: types.ADD,
  payload: exercise,
});

const deleteExercise = (id: Exercise['id']) => ({
  type: types.DELETE,
  payload: { id },
});

export default {
  fetchExercises,
  addExercise,
  deleteExercise,
};
