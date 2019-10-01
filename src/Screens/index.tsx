// App navigator
import { createStackNavigator } from 'react-navigation-stack';
import ExercisesScreen from './ExercisesScreen/ExercisesScreen';
import WorkoutsScreen from './WorkoutsScreen/WorkoutsScreen';
import SetsScreen from './SetsScreen/SetsScreen';
import { ScreenNames } from './enums';

const AppNavigator = createStackNavigator({
  [ScreenNames.Exercises]: ExercisesScreen,
  [ScreenNames.Workouts]: WorkoutsScreen,
  [ScreenNames.Sets]: SetsScreen,
}, {
  initialRouteName: ScreenNames.Workouts,
});

export default AppNavigator;
