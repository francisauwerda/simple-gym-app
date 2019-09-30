import { Workout } from './types';

/* State shape

{
  id: 1,
  name: 'legs',
}

*/
const initialState: Workout[] = [];

const workoutsReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default workoutsReducer;
