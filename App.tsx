import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import { createAppContainer } from 'react-navigation';
import AppNavigator from './src/Screens';

const reducer = () => {};

const store = createStore(reducer);

const AppContainer = createAppContainer(AppNavigator);

export default function App() {
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
}
