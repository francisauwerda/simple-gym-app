// App navigator
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from './HomeScreen';
import DetailsScreen from './DetailsScreen';

const AppNavigator = createStackNavigator({
  Home: HomeScreen,
  Details: DetailsScreen,
}, {
  initialRouteName: 'Home',
});

export default AppNavigator;
