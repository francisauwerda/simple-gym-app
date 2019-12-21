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

    default:
      return state;
  }
};


export default workoutsReducer;
