import types, { Set } from './types';

const initialState: { sets: Set[] } = { sets: [] };

const setsReducer = (state = initialState, action) => {
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

    default:
      return state;
  }
};

export default setsReducer;
