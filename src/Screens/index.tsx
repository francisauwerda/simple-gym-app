// App navigator
import { createStackNavigator } from 'react-navigation-stack';
import ExercisesScreen from './ExercisesScreen/ExercisesScreen';
import WorkoutsScreen from './WorkoutsScreen/WorkoutsScreen';
import SetsScreen from './SetsScreen/SetsScreen';
import AddWorkoutModal from './WorkoutsScreen/AddWorkoutModal';
import AddExerciseModal from './ExercisesScreen/AddExerciseModal';
import { ScreenNames } from './enums';

const MainStack = createStackNavigator({
  [ScreenNames.Exercises]: ExercisesScreen,
  [ScreenNames.Workouts]: WorkoutsScreen,
  [ScreenNames.Sets]: SetsScreen,
}, {
  initialRouteName: ScreenNames.Workouts,
});

const RootStack = createStackNavigator({
  Main: {
    screen: MainStack,
  },
  [ScreenNames.AddWorkout]: {
    screen: AddWorkoutModal,
  },
  [ScreenNames.AddExercise]: {
    screen: AddExerciseModal,
  },
},
{
  mode: 'modal',
  headerMode: 'none',
});

export default RootStack;
