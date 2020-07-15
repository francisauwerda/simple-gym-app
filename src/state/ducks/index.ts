import workoutsReducer, { workoutsInitialState } from './workouts';
import exercisesReducer, { exercisesInitialState } from './exercises';
import setsReducer, { setsInitialState } from './sets';

export default {
  reducers: {
    workoutsReducer,
    exercisesReducer,
    setsReducer,
  },
  initialState: {
    workoutsReducer: workoutsInitialState,
    exercisesReducer: exercisesInitialState,
    setsReducer: setsInitialState,
  },
};
