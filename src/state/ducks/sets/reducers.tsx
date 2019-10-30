import { Set } from './types';

/* State shape

[{
  id: 1,
  reps: 10,
  weight: 70,
  difficuly: 5,
  date: '20-09-2019',
  exericiseId: 1,
}]

1. User enters their set data.
2. An action/operation is dispatched to save that into the async storage.
3. An action is called to update the state based on the storage

*/
const initialState: Set[] = [];

const setsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_SET':
      return 1;
    default:
      return state;
  }
};

export default setsReducer;
