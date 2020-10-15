import { Direction, Sorting } from '../../types';
import types, {
  Workout, GlobalWorkoutSettings,
} from './types';

export const initialState: {
  workouts: Workout[]
  globalWorkoutSettings: GlobalWorkoutSettings
} = {
  workouts: [],
  globalWorkoutSettings: {
    sorting: Sorting.name,
    direction: Direction.ASC,
  },
};

interface ActionType {
  type: string,
  payload: {
    workout?: Workout,
    workouts?: Workout[]
    globalWorkoutSettings?: GlobalWorkoutSettings
  }
}

const workoutsReducer = (state = initialState, action: ActionType) => {
  switch (action.type) {
    case types.FETCH_SUCCESS: {
      return {
        ...state,
        ...action.payload,
      };
    }

    case types.ADD_SUCCESS: {
      return {
        ...state,
        ...action.payload,
      };
    }

    case types.DELETE_SUCCESS: {
      return {
        ...state,
        workouts: action.payload.workouts,
      };
    }

    case types.EDIT_SUCCESS: {
      const updatedWorkout = action.payload.workout;
      const updatedWorkouts = state.workouts
        .map((workout) => ((workout.id === updatedWorkout.id) ? updatedWorkout : workout));

      return {
        ...state,
        workouts: updatedWorkouts,
      };
    }

    case types.FETCH_GLOBAL_WORKOUT_SETTINGS_SUCCESS: {
      return {
        ...state,
        ...action.payload,
      };
    }

    case types.SET_GLOBAL_WORKOUT_SETTINGS_SUCCESS: {
      return {
        ...state,
        ...action.payload,
      };
    }

    default:
      return state;
  }
};


export default workoutsReducer;
