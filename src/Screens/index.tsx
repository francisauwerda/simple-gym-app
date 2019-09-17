// App navigator
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from './HomeScreen';

const AppNavigator = createStackNavigator({
  Home: HomeScreen,
});

export default AppNavigator;
