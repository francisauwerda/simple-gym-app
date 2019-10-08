import React from 'react';
import { connect } from 'react-redux';
import { NavigationScreenProp, NavigationState, NavigationParams } from 'react-navigation';
import WorkoutsScreenView from './WorkoutsScreenView';
import { State } from '../../state/types';
import { Workout } from '../../state/ducks/workouts/types';
import actions from '../../state/ducks/workouts/actions';

interface WorkoutsScreenProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>,
  workouts: Workout[],
  colour: string,
  changeColour: (colour: string) => any
}

class WorkoutsScreenContainer extends React.Component<WorkoutsScreenProps> {
  componentDidMount() {
    console.log('Load exercises from async storage');
  }

  render() {
    const {
      workouts, navigation, changeColour, colour,
    } = this.props;
    return (
      <WorkoutsScreenView
        workouts={workouts}
        colour={colour}
        navigation={navigation}
        changeColour={changeColour}
      />
    );
  }
}

const mapStateToProps = (state: State) => {
  const { workouts } = state;

  return {
    colour: workouts.colourReducer.colour,
    workouts: workouts.workoutsReducer,
  };
};

const mapDispatchToProps = (dispatch) => ({
  changeColour: (colour) => {
    dispatch(actions.changeColour(colour));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(WorkoutsScreenContainer);
