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

    default:
      return state;
  }
};


export default workoutsReducer;
