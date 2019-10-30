import React from 'react';
import { connect } from 'react-redux';
import {
  NavigationScreenProp, NavigationParams, NavigationState,
} from 'react-navigation';

import { State } from '../../state/types';
import ExercisesScreenView from './ExercisesScreenView';
import { Exercise } from '../../state/ducks/exercises/types';
import { exercisesSelectors } from '../../state/ducks/exercises';
import actions from '../../state/ducks/exercises/actions';

interface ExercisesNavigationState extends NavigationState {
  params: {
    workoutId: Exercise['workoutId'];
  }
}

interface ExercisesScreenProps {
  navigation: NavigationScreenProp<ExercisesNavigationState, NavigationParams>;
}

type ExercisesScreenContainerProps = ExercisesScreenProps & StateProps & DispatchProps;

class ExercisesScreenContainer extends React.Component<ExercisesScreenContainerProps> {
  componentDidMount() {
    const { fetchExercises, navigation } = this.props;
    const workoutId = navigation.getParam('workoutId');
    fetchExercises(workoutId);
  }

  render() {
    const { navigation, exercises } = this.props;

    return (<ExercisesScreenView navigation={navigation} exercises={exercises} />);
  }
}

interface StateProps {
  exercises: Exercise[];
}

const mapStateToProps = (state: State, ownProps: ExercisesScreenProps) => {
  const workoutId = ownProps.navigation.getParam('workoutId');
  const exercises: Exercise[] = exercisesSelectors.selectExercises(state, workoutId);
  return {
    exercises,
  };
};

interface DispatchProps {
  fetchExercises: (workoutId: Exercise['workoutId']) => void;
}

const mapDispatchToProps = (dispatch): DispatchProps => ({
  fetchExercises: (workoutId: Exercise['workoutId']) => {
    dispatch(actions.fetchExercises(workoutId));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ExercisesScreenContainer);
