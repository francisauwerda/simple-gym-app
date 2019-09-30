import React from 'react';
import { Provider } from 'react-redux';

import { createAppContainer } from 'react-navigation';
import AppNavigator from './src/Screens';
import configureStore from './src/state/store';

const initialState = {
  exercises: [],
  sets: [],
  workouts: [],
};

const AppContainer = createAppContainer(AppNavigator);
const reduxStore = configureStore(initialState);

export default function App() {
  return (
    <Provider store={reduxStore}>
      <AppContainer />
    </Provider>
  );
}
