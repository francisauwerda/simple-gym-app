import types, { Exercise } from './types';

export const initialState: { exercises: Exercise[] } = { exercises: [] };

interface ActionType {
  type: string,
  payload: {
    exercises?: Exercise[],
    exercise?: Exercise
  }
}

const exercisesReducer = (state = initialState, action: ActionType) => {
  switch (action.type) {
    case types.FETCH_SUCCESS: {
      return {
        ...state,
        exercises: action.payload.exercises,
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

    case types.EDIT_SUCCESS: {
      const updatedExercise = action.payload.exercise;
      const updatedExercises = state.exercises
        .map((exercise) => (exercise.id === updatedExercise.id ? updatedExercise : exercise));

      return {
        ...state,
        exercises: updatedExercises,
      };
    }

    default:
      return state;
  }
};

export default exercisesReducer;
