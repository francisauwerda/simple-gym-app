import { combineReducers, createStore } from 'redux';
import * as reducers from './ducks';
import { State } from './types';

export default function configureStore(initialState: State) {
  const rootReducer = combineReducers(reducers);

  return createStore(
    rootReducer,
    initialState,
    // applyMiddleware
  );
}
