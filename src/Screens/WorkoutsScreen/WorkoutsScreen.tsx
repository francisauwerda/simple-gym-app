import React from 'react';
import { connect } from 'react-redux';
import { NavigationScreenProp, NavigationState, NavigationParams } from 'react-navigation';
import WorkoutsScreenView from './WorkoutsScreenView';
import { State } from '../../state/types';
import { Workout, WorkoutDetails, WorkoutWithLastModified } from '../../state/ducks/workouts/types';
import workoutActions from '../../state/ducks/workouts/actions';
import exerciseActions from '../../state/ducks/exercises/actions';
import setActions from '../../state/ducks/sets/actions';
import { ScreenNames } from '../enums';
import { AddWorkoutParams } from './AddWorkoutModal';
import { workoutsSelectors } from '../../state/ducks/workouts';

interface WorkoutsScreenProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>,
}

type WorkoutsScreenContainerProps = WorkoutsScreenProps
  & DispatchProps
  & StateProps;

class WorkoutsScreenContainer extends React.Component<WorkoutsScreenContainerProps> {
  static navigationOptions = {
    title: 'Workouts',
  }

  componentDidMount() {
    const { fetchWorkouts, fetchSets, fetchExercises } = this.props;
    fetchWorkouts();
    fetchExercises();
    fetchSets();
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
      workoutsWithLastModified, navigation, deleteWorkout, editWorkout,
    } = this.props;

    return (
      <WorkoutsScreenView
        workouts={workoutsWithLastModified}
        navigation={navigation}
        navigateToExercises={this.navigateToExercises}
        openModal={this.openModal}
        deleteWorkout={deleteWorkout}
        editWorkout={editWorkout}
      />
    );
  }
}

interface StateProps {
  workoutsWithLastModified: WorkoutWithLastModified[];
}

const mapStateToProps = (state: State): StateProps => {
  const workoutsWithLastModified = workoutsSelectors.selectWorkoutsWithLastModified(state);

  return {
    workoutsWithLastModified,
  };
};

export interface DispatchProps {
  fetchWorkouts: () => any;
  fetchExercises: () => any;
  fetchSets: () => any;
  addWorkout: (workout: WorkoutDetails) => void;
  deleteWorkout: (id: Workout['id']) => void;
  editWorkout: (id: Workout['id'], fields: WorkoutDetails) => void;
}

const mapDispatchToProps = (dispatch): DispatchProps => ({
  fetchWorkouts: () => {
    dispatch(workoutActions.fetchWorkouts());
  },
  fetchExercises: () => {
    dispatch(exerciseActions.fetchExercises());
  },
  fetchSets: () => {
    dispatch(setActions.fetchSets());
  },
  addWorkout: (workout: WorkoutDetails) => {
    dispatch(workoutActions.addWorkout(workout));
  },
  deleteWorkout: (id: Workout['id']) => {
    dispatch(workoutActions.deleteWorkout(id));
  },
  editWorkout: (id: Workout['id'], fields: WorkoutDetails) => {
    dispatch(workoutActions.editWorkout(id, fields));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(WorkoutsScreenContainer);
