import { combineReducers } from 'redux';
import types, { Workout } from './types';

/*
Colour State shape

{
  {
    color: 'white'
  }
}

Workouts State shape

[{
  id: 1,
  name: 'legs',
}]

*/
const initialState: Workout[] = [];
const initialColourState: { colour: string } = { colour: 'white' };

const colourReducer = (state = initialColourState, action) => {
  switch (action.type) {
    case types.CHANGE_COLOUR: {
      return { ...state, colour: action.colour };
    }

    default:
      return state;
  }
};

const workoutsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH: {
      return state;
    }

    default:
      return state;
  }
};

const fullWorkoutsReducer = combineReducers({
  colourReducer,
  workoutsReducer,
});

export default fullWorkoutsReducer;
