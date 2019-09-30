// App navigator
import { createStackNavigator } from 'react-navigation-stack';
import ExercisesScreen from './ExercisesScreen';
import WorkoutsScreen from './WorkoutsScreen';
import SetsScreen from './SetsScreen';
import { ScreenNames } from './enums';

const AppNavigator = createStackNavigator({
  [ScreenNames.Exercises]: ExercisesScreen,
  [ScreenNames.Workouts]: WorkoutsScreen,
  [ScreenNames.Sets]: SetsScreen,
}, {
  initialRouteName: ScreenNames.Exercises,
});

export default AppNavigator;
