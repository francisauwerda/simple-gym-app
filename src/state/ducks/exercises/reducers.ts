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

    default:
      return state;
  }
};

export default exercisesReducer;
