import { combineReducers, createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import ducks from './ducks';
import rootSaga from './ducks/sagas';
import { AppState } from './types';

export const rootReducer = combineReducers(ducks.reducers);

const defaultAppState: AppState = {
  ...ducks.initialState,
};

export default function configureStore(initialState: AppState = defaultAppState) {
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(sagaMiddleware),
  );

  sagaMiddleware.run(rootSaga);

  return store;
}
