import React from 'react';
import { connect } from 'react-redux';
import { NavigationScreenProp, NavigationState, NavigationParams } from 'react-navigation';
import WorkoutsScreenView from './WorkoutsScreenView';
import { State } from '../../state/types';
import { Workout } from '../../state/ducks/workouts/types';
import actions from '../../state/ducks/workouts/actions';
import api from '../../api';

const resetWorkouts = async () => {
  await api.workouts.debugResetWorkouts();
};

interface WorkoutsScreenProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>,
  workouts: Workout[],
  fetchWorkouts: () => any
}

class WorkoutsScreenContainer extends React.Component<WorkoutsScreenProps> {
  componentDidMount() {
    const { fetchWorkouts } = this.props;

    fetchWorkouts();
  }

  render() {
    const {
      workouts, navigation,
    } = this.props;
    return (
      <WorkoutsScreenView
        workouts={workouts}
        navigation={navigation}
        resetWorkouts={resetWorkouts}
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

const mapDispatchToProps = (dispatch) => ({
  fetchWorkouts: () => {
    dispatch(actions.fetchWorkouts());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(WorkoutsScreenContainer);
