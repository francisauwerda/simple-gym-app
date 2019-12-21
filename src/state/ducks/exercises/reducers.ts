import types, { Exercise } from './types';

const initialState: { exercises: Exercise[] } = { exercises: [] };

const exercisesReducer = (state = initialState, action) => {
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
        exercises: action.payload.exercises,
      };
    }

    default:
      return state;
  }
};

export default exercisesReducer;
