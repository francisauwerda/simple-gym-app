// App navigator
import { createStackNavigator } from 'react-navigation-stack';
import ExercisesScreen from './ExercisesScreen/ExercisesScreen';
import WorkoutsScreen from './WorkoutsScreen/WorkoutsScreen';
import SetsScreen from './SetsScreen/SetsScreen';
import WorkoutModal from './WorkoutsScreen/WorkoutModal';
import ExerciseModal from './ExercisesScreen/ExerciseModal';
import { ScreenNames } from './enums';
import SetModal from './SetsScreen/SetModal';

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
    navigationOptions: { header: null },
  },
  [ScreenNames.WorkoutModal]: {
    screen: WorkoutModal,
  },
  [ScreenNames.ExerciseModal]: {
    screen: ExerciseModal,
  },
  [ScreenNames.SetModal]: {
    screen: SetModal,
  },
},
{
  mode: 'modal',
});

export default RootStack;
