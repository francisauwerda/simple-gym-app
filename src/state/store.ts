import { combineReducers, createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import * as reducers from './ducks';
import rootSaga from './ducks/sagas';
import { State } from './types';

export default function configureStore(initialState: State) {
  const sagaMiddleware = createSagaMiddleware();
  const rootReducer = combineReducers(reducers);

  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(sagaMiddleware),
  );

  sagaMiddleware.run(rootSaga);

  return store;
}
