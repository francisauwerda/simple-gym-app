import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavigationScreenProp, NavigationParams, NavigationState } from 'react-navigation';
import { Set, SetDetails } from '../../state/ducks/sets/types';
import actions from '../../state/ducks/sets/actions';
import { State } from '../../state/types';
import { Exercise } from '../../state/ducks/exercises/types';
import { setsSelectors } from '../../state/ducks/sets';
import SetsScreenView from './SetsScreenView';
import { ScreenNames } from '../enums';
import { AddSetParams } from './AddSetModal';

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
  static navigationOptions = ({ navigation }) => {
    const exercise: Exercise = navigation.getParam('exercise');
    return {
      title: `${exercise.name}`,
    };
  }

  componentDidMount() {
    const { fetchSets, exercise } = this.props;
    fetchSets(exercise.id);
  }

  openModal = () => {
    const { navigation, addSet, exercise } = this.props;

    navigation.navigate(ScreenNames.AddSet, {
      [AddSetParams.AddSetParam]: addSet,
      [AddSetParams.ExerciseParam]: exercise,
    });
  }

  render() {
    const { sets, exercise, addSet } = this.props;
    return (
      <SetsScreenView
        sets={sets}
        exercise={exercise}
        addSet={addSet}
        openModal={this.openModal}
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
