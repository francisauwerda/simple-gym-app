import React from 'react';
import { connect } from 'react-redux';
import { NavigationScreenProp, NavigationState, NavigationParams } from 'react-navigation';
import WorkoutsScreenView from './WorkoutsScreenView';
import { State } from '../../state/types';
import { Workout, WorkoutDetails } from '../../state/ducks/workouts/types';
import actions from '../../state/ducks/workouts/actions';
import { ScreenNames } from '../enums';
import { AddWorkoutParams } from './AddWorkoutModal';

interface WorkoutsScreenProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>,
  workouts: Workout[]
}

type WorkoutsScreenContainerProps = WorkoutsScreenProps & DispatchProps;

class WorkoutsScreenContainer extends React.Component<WorkoutsScreenContainerProps> {
  static navigationOptions = {
    title: 'Workouts 💪',
  }

  componentDidMount() {
    const { fetchWorkouts } = this.props;
    fetchWorkouts();
  }

  navigateToExercises = ({ workout }: {workout: Workout}) => {
    const { navigation } = this.props;

    navigation.navigate(ScreenNames.Exercises, { workout });
  }

  openModal = () => {
    const { navigation, addWorkout } = this.props;

    navigation.navigate(
      ScreenNames.AddWorkout,
      { [AddWorkoutParams.AddWorkout]: addWorkout },
    );
  }

  render() {
    const {
      workouts, navigation, deleteWorkout,
    } = this.props;

    return (
      <WorkoutsScreenView
        workouts={workouts}
        navigation={navigation}
        navigateToExercises={this.navigateToExercises}
        openModal={this.openModal}
        deleteWorkout={deleteWorkout}
      />
    );
  }
}

const mapStateToProps = (state: State) => {
  const { workoutsReducer: { workouts } } = state;

  return {
    workouts,
  };
};

interface DispatchProps {
  fetchWorkouts: () => any;
  addWorkout: (workout: WorkoutDetails) => void;
  deleteWorkout: (id: Workout['id']) => void;
}

const mapDispatchToProps = (dispatch): DispatchProps => ({
  fetchWorkouts: () => {
    dispatch(actions.fetchWorkouts());
  },
  addWorkout: (workout: WorkoutDetails) => {
    dispatch(actions.addWorkout(workout));
  },
  deleteWorkout: (id: Workout['id']) => {
    dispatch(actions.deleteWorkout(id));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(WorkoutsScreenContainer);
