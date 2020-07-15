import React from 'react';
import { Provider } from 'react-redux';
import { ActionSheetProvider } from '@expo/react-native-action-sheet'; // TODO: Check if we can remove press delay for android

import { createAppContainer } from 'react-navigation';
import RootStack from './src/Screens';
import configureStore from './src/state/store';

const AppContainer = createAppContainer(RootStack);
const reduxStore = configureStore();

export default function App() {
  return (
    <Provider store={reduxStore}>
      <ActionSheetProvider>
        <AppContainer />
      </ActionSheetProvider>
    </Provider>
  );
}
