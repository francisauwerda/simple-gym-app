import React from 'react';
import { Provider } from 'react-redux';

import { createAppContainer } from 'react-navigation';
import AppNavigator from './src/Screens';
import configureStore from './src/state/store';
import { State } from './src/state/types';

const initialState: State = {
  exercises: [],
  sets: [],
  workouts: {
    colourReducer: { colour: 'white' },
    workoutsReducer: [{
      id: 1,
      name: 'legs',
    }],
  },
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
