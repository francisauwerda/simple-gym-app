import React from 'react';
import { Provider } from 'react-redux';

import { createAppContainer } from 'react-navigation';
import RootStack from './src/Screens';
import configureStore from './src/state/store';
import { State } from './src/state/types';

const initialState: State = {
  exercisesReducer: { exercises: [] },
  setsReducer: { sets: [] },
  workoutsReducer: {
    workouts: [],
  },
};

const AppContainer = createAppContainer(RootStack);
const reduxStore = configureStore(initialState);

export default function App() {
  return (
    <Provider store={reduxStore}>
      <AppContainer />
    </Provider>
  );
}
