import types, { Exercise } from './types';

const initialState: { exercises: Exercise[] } = { exercises: [] };

const exercisesReducer = (state = initialState, action) => {
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
      const updatedExercises = state.exercises.map((exercise) => {
        if (exercise.id === updatedExercise.id) {
          return updatedExercise;
        }
        return exercise;
      });

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
