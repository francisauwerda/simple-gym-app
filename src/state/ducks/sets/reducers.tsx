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
        // Here do the same as delete. Override all sets with what came from server.
        ...action.payload,
      };
    }

    case types.DELETE_SUCCESS: {
      return {
        ...state,
        sets: action.payload.sets,
      };
    }

    case types.EDIT_SUCCESS: {
      const updatedSet = action.payload.set;
      const updatedSets = state.sets.map((set) => {
        if (set.id === updatedSet.id) {
          return updatedSet;
        }
        return set;
      });

      return {
        ...state,
        sets: updatedSets,
      };
    }

    default:
      return state;
  }
};

export default setsReducer;
