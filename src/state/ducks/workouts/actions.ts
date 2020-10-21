import types, {
  GlobalWorkoutSettings, Workout, WorkoutDetails,
} from './types';

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

const fetchGlobalWorkoutSettings = () => ({
  type: types.FETCH_GLOBAL_WORKOUT_SETTINGS,
});

const setGlobalWorkoutSettings = (globalWorkoutSettings: GlobalWorkoutSettings) => ({
  type: types.SET_GLOBAL_WORKOUT_SETTINGS,
  payload: { globalWorkoutSettings },
});


export default {
  fetchWorkouts,
  addWorkout,
  deleteWorkout,
  editWorkout,
  fetchGlobalWorkoutSettings,
  setGlobalWorkoutSettings,
};
