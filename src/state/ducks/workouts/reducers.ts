import types, { Workout } from './types';

const initialState: { workouts: Workout[] } = { workouts: [] };

const workoutsReducer = (state = initialState, action) => {
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
      const updatedWorkouts = state.workouts.map((workout) => {
        if (workout.id === updatedWorkout.id) {
          return updatedWorkout;
        }
        return workout;
      });

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
