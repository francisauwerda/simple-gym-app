// App navigator
import { createStackNavigator } from 'react-navigation-stack';
import ExercisesScreen from './ExercisesScreen';
import WorkoutsScreen from './WorkoutsScreen';
import SessionScreen from './SessionScreen';
import { ScreenNames } from './enums';

const AppNavigator = createStackNavigator({
  [ScreenNames.Exercises]: ExercisesScreen,
  [ScreenNames.Workouts]: WorkoutsScreen,
  [ScreenNames.Session]: SessionScreen,
}, {
  initialRouteName: ScreenNames.Exercises,
});

export default AppNavigator;
