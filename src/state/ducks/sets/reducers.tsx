import types, { Set } from './types';

export const initialState: { sets: Set[] } = { sets: [] };

interface ActionType {
  type: string,
  payload: {
    set?: Set,
    sets?: Set[]
  }
}

const setsReducer = (state = initialState, action: ActionType) => {
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
      const updatedSets = state.sets
        .map((set) => (set.id === updatedSet.id ? updatedSet : set));

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
