import types, { Exercise } from './types';

const fetchExercises = (workoutId: Exercise['workoutId']) => ({
  type: types.FETCH,
  payload: { workoutId },
});

export default {
  fetchExercises,
};
