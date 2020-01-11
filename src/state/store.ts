import { combineReducers, createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import * as reducers from './ducks';
import rootSaga from './ducks/sagas';
import { AppState } from './types';

export const rootReducer = combineReducers(reducers);

export default function configureStore(initialState: AppState) {
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(sagaMiddleware),
  );

  sagaMiddleware.run(rootSaga);

  return store;
}
