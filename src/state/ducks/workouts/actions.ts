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

const editWorkout = (id: Workout['id'], fields: Partial<WorkoutDetails>) => ({
  type: types.EDIT,
  payload: { id, fields },
});

export default {
  fetchWorkouts,
  addWorkout,
  deleteWorkout,
  editWorkout,
};
