import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavigationScreenProp, NavigationParams, NavigationState } from 'react-navigation';
import { Set, SetDetails, SetInputs } from '../../state/ducks/sets/types';
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
      title: `${exercise.name} sets`,
    };
  }

  componentDidMount() {
    const { fetchSets } = this.props;
    fetchSets();
  }

  openModal = ({ initialValues }: { initialValues: SetInputs }) => {
    const { navigation, addSet, exercise } = this.props;

    navigation.navigate(ScreenNames.AddSet, {
      [AddSetParams.AddSetParam]: addSet,
      [AddSetParams.ExerciseParam]: exercise,
      [AddSetParams.InitialValues]: initialValues,
    });
  }

  render() {
    const {
      todaysSets, lastSessionSets, exercise, addSet, deleteSet,
    } = this.props;
    return (
      <SetsScreenView
        todaysSets={todaysSets}
        lastSessionSets={lastSessionSets}
        exercise={exercise}
        addSet={addSet}
        deleteSet={deleteSet}
        openModal={this.openModal}
      />
    );
  }
}

interface StateProps {
  todaysSets: Set[],
  lastSessionSets: Set[],
  exercise: Exercise
}

const mapStateToProps = (state: State, ownProps: SetsScreenProps): StateProps => {
  const { exercise } = ownProps.navigation.state.params;
  const { today, lastSession } = setsSelectors.selectSetsTodayAndLastSession(state, exercise.id);

  return {
    todaysSets: today,
    lastSessionSets: lastSession,
    exercise,
  };
};

interface DispatchProps {
  fetchSets: () => void;
  addSet: (set: SetDetails) => void;
  deleteSet: (id: Set['id']) => void;
}

const mapDispatchToProps = (dispatch): DispatchProps => ({
  fetchSets: () => {
    dispatch(actions.fetchSets());
  },
  addSet: (set: SetDetails) => {
    dispatch(actions.addSet(set));
  },
  deleteSet: (id: Set['id']) => {
    dispatch(actions.deleteSet(id));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SetsScreenContainer);
