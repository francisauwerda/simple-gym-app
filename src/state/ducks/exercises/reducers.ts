import { Exercise } from './types';

/* State shape

{
  id: 1,
  name: 'squats',
  workoutId: 1,
}

*/
const initialState: Exercise[] = [];

const exercisesReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default exercisesReducer;
