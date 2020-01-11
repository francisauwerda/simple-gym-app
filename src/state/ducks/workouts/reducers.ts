import types, { Workout } from './types';

export const initialState: { workouts: Workout[] } = { workouts: [] };

interface ActionType {
  type: string,
  payload: {
    workout?: Workout,
    workouts?: Workout[]
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

    default:
      return state;
  }
};


export default workoutsReducer;
