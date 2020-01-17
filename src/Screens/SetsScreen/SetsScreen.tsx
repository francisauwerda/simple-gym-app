import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavigationScreenProp, NavigationParams, NavigationState } from 'react-navigation';
import { Set, SetDetails } from '../../state/ducks/sets/types';
import actions from '../../state/ducks/sets/actions';
import { AppState } from '../../state/types';
import { Exercise } from '../../state/ducks/exercises/types';
import { setsSelectors } from '../../state/ducks/sets';
import SetsScreenView from './SetsScreenView';
import { ScreenNames } from '../enums';
import { NavigationParams as SetModalNavigationParams } from './SetModal';
import { getModalProps } from '../helpers';

interface SetsNavigationState extends NavigationState {
  params: {
    exercise: Exercise
  }
}

interface SetsScreenProps {
  navigation: NavigationScreenProp<SetsNavigationState, NavigationParams>;
}

export interface OpenModalProps {
  id?: Set['id'];
  initialValues?: SetDetails;
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

  openModal = ({ id, initialValues }: OpenModalProps) => {
    const {
      navigation, addSet, exercise, editSet,
    } = this.props;

    const { onSubmitHandler, formMode } = getModalProps({
      id,
      addHandler: addSet,
      editHandler: editSet,
    });

    const navigationParams: SetModalNavigationParams = {
      onSubmitHandler,
      formMode,
      exercise,
      initialValues,
    };

    navigation.navigate(ScreenNames.SetModal, navigationParams);
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

const mapStateToProps = (state: AppState, ownProps: SetsScreenProps): StateProps => {
  const { exercise } = ownProps.navigation.state.params;
  const { today, lastSession } = setsSelectors.selectSetsTodayAndLastSession(state, exercise.id);

  return {
    todaysSets: today,
    lastSessionSets: lastSession,
    exercise,
  };
};

export interface DispatchProps {
  fetchSets: () => void;
  addSet: (set: SetDetails) => void;
  deleteSet: (id: Set['id']) => void;
  editSet: (id: Set['id'], fields: SetDetails) => void;
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
  editSet: (id: Set['id'], fields: SetDetails) => {
    dispatch(actions.editSet(id, fields));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SetsScreenContainer);
