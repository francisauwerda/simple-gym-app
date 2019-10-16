import React from 'react';
import { connect } from 'react-redux';
import { NavigationScreenProp, NavigationState, NavigationParams } from 'react-navigation';
import WorkoutsScreenView from './WorkoutsScreenView';
import { State } from '../../state/types';
import { Workout, WorkoutDetails } from '../../state/ducks/workouts/types';
import actions from '../../state/ducks/workouts/actions';
import api from '../../api';

const resetWorkouts = async () => {
  await api.workouts.debugResetWorkouts();
};

interface WorkoutsScreenProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>,
  workouts: Workout[]
}

type WorkoutsScreenContainerProps = WorkoutsScreenProps & DispatchProps;

class WorkoutsScreenContainer extends React.Component<WorkoutsScreenContainerProps> {
  componentDidMount() {
    const { fetchWorkouts } = this.props;
    fetchWorkouts();
  }

  render() {
    const {
      workouts, navigation, addWorkout,
    } = this.props;

    return (
      <WorkoutsScreenView
        workouts={workouts}
        navigation={navigation}
        resetWorkouts={resetWorkouts}
        addWorkout={addWorkout}
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
  addWorkout: (workout: WorkoutDetails) => void; // TODO: Typeof Actions
}

const mapDispatchToProps = (dispatch): DispatchProps => ({
  fetchWorkouts: () => {
    dispatch(actions.fetchWorkouts());
  },
  addWorkout: (workout: WorkoutDetails) => {
    dispatch(actions.addWorkout(workout));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(WorkoutsScreenContainer);
