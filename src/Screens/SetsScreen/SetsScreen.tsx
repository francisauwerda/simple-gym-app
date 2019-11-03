import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavigationScreenProp, NavigationParams, NavigationState } from 'react-navigation';
import { Set, SetDetails } from '../../state/ducks/sets/types';
import actions from '../../state/ducks/sets/actions';
import { State } from '../../state/types';
import { Exercise } from '../../state/ducks/exercises/types';
import { setsSelectors } from '../../state/ducks/sets';
import SetsScreenView from './SetsScreenView';

interface SetsNavigationState extends NavigationState {
  params: {
    exercise: Exercise
  }
}

interface SetsScreenProps {
  navigation: NavigationScreenProp<SetsNavigationState, NavigationParams>;
}

type SetsScreenContainerProps = SetsScreenProps & StateProps & DispatchProps;

class SetsScreenContainer extends Component<SetsScreenContainerProps> {
  componentDidMount() {
    const { fetchSets, exercise } = this.props;
    fetchSets(exercise.id);
  }

  render() {
    const { sets, exercise, addSet } = this.props;
    return (
      <SetsScreenView
        sets={sets}
        exercise={exercise}
        addSet={addSet}
      />
    );
  }
}

interface StateProps {
  sets: Set[],
  exercise: Exercise
}

const mapStateToProps = (state: State, ownProps: SetsScreenProps): StateProps => {
  const exercise: Exercise = ownProps.navigation.getParam('exercise');
  const sets: Set[] = setsSelectors.selectSets(state, exercise.id);

  return {
    sets,
    exercise,
  };
};

interface DispatchProps {
  fetchSets: (exerciseId: Set['exerciseId']) => void;
  addSet: (set: SetDetails) => void;
}

const mapDispatchToProps = (dispatch): DispatchProps => ({
  fetchSets: (exerciseId: Set['exerciseId']) => {
    dispatch(actions.fetchSets(exerciseId));
  },
  addSet: (set: SetDetails) => {
    dispatch(actions.addSet(set));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SetsScreenContainer);
