import types, { WorkoutDetails } from './types';

const fetchWorkouts = () => ({
  type: types.FETCH,
});

const addWorkout = (workout: WorkoutDetails) => ({
  type: types.ADD,
  payload: workout,
});

export default {
  fetchWorkouts,
  addWorkout,
};
