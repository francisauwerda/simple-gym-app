import React from 'react';
import { connect } from 'react-redux';
import { NavigationScreenProp, NavigationState, NavigationParams } from 'react-navigation';
import WorkoutsScreenView from './WorkoutsScreenView';
import { AppState } from '../../state/types';
import {
  Workout, WorkoutDetails, WorkoutWithLastModified, GlobalWorkoutSettings,
} from '../../state/ducks/workouts/types';
import workoutActions from '../../state/ducks/workouts/actions';
import exerciseActions from '../../state/ducks/exercises/actions';
import setActions from '../../state/ducks/sets/actions';
import { ScreenNames } from '../enums';
import { NavigationParams as WorkoutModalNavigationParams } from './WorkoutModal';
import { workoutsSelectors } from '../../state/ducks/workouts';
import { getModalProps } from '../helpers';

interface WorkoutsScreenProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>,
}

type WorkoutsScreenContainerProps = WorkoutsScreenProps
  & DispatchProps
  & StateProps;

export interface OpenModalProps {
  id?: Workout['id'];
  initialValues?: WorkoutDetails;
}

class WorkoutsScreenContainer extends React.Component<WorkoutsScreenContainerProps> {
  static navigationOptions = {
    title: 'Workouts 🏋️‍♂️',
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

  openModal = ({ id, initialValues }: OpenModalProps) => {
    const { navigation, addWorkout, editWorkout } = this.props;

    const { onSubmitHandler, formMode } = getModalProps({
      id,
      addHandler: addWorkout,
      editHandler: editWorkout,
    });

    const navigationParams: WorkoutModalNavigationParams = {
      onSubmitHandler,
      initialValues,
      formMode,
    };

    navigation.navigate(ScreenNames.WorkoutModal, navigationParams);
  }

  render() {
    const {
      workoutsWithLastModified, navigation, deleteWorkout, editWorkout, settings,
    } = this.props;

    return (
      <WorkoutsScreenView
        workouts={workoutsWithLastModified}
        navigation={navigation}
        navigateToExercises={this.navigateToExercises}
        openModal={this.openModal}
        deleteWorkout={deleteWorkout}
        editWorkout={editWorkout}
        settings={settings}
      />
    );
  }
}

interface StateProps {
  workoutsWithLastModified: WorkoutWithLastModified[];
  settings: GlobalWorkoutSettings;
}

const mapStateToProps = (state: AppState): StateProps => {
  const workoutsWithLastModified = workoutsSelectors.selectWorkoutsWithLastModified(state);
  const settings = workoutsSelectors.selectGlobalWorkoutSettings(state);

  return {
    workoutsWithLastModified,
    settings,
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
