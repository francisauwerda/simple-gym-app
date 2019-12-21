import types, { Workout, WorkoutDetails } from './types';

const fetchWorkouts = () => ({
  type: types.FETCH,
});

const addWorkout = (workout: WorkoutDetails) => ({
  type: types.ADD,
  payload: workout,
});

const deleteWorkout = (id: Workout['id']) => ({
  type: types.DELETE,
  payload: { id },
});

export default {
  fetchWorkouts,
  addWorkout,
  deleteWorkout,
};
