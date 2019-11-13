import React from 'react';
import { connect } from 'react-redux';
import {
  NavigationScreenProp, NavigationParams, NavigationState,
} from 'react-navigation';

import { State } from '../../state/types';
import ExercisesScreenView from './ExercisesScreenView';
import { Exercise, ExerciseDetails } from '../../state/ducks/exercises/types';
import { exercisesSelectors } from '../../state/ducks/exercises';
import actions from '../../state/ducks/exercises/actions';
import { Workout } from '../../state/ducks/workouts/types';
import { ScreenNames } from '../enums';
import { AddExerciseParams } from './AddExerciseModal';

interface ExercisesNavigationState extends NavigationState {
  params: {
    workout: Workout;
  }
}

interface ExercisesScreenProps {
  navigation: NavigationScreenProp<ExercisesNavigationState, NavigationParams>;
}

type ExercisesScreenContainerProps = ExercisesScreenProps & StateProps & DispatchProps;

class ExercisesScreenContainer extends React.Component<ExercisesScreenContainerProps> {
  componentDidMount() {
    const { fetchExercises, workout } = this.props;

    fetchExercises(workout.id);
  }

  openModal = () => {
    const { navigation, addExercise, workout } = this.props;

    navigation.navigate(ScreenNames.AddExercise, {
      [AddExerciseParams.AddExercise]: addExercise,
      [AddExerciseParams.WorkoutId]: workout.id,
    });
  }


  render() {
    const {
      navigation, exercises, workout,
    } = this.props;

    return (
      <ExercisesScreenView
        navigation={navigation}
        exercises={exercises}
        workout={workout}
        openModal={this.openModal}
      />
    );
  }
}

interface StateProps {
  exercises: Exercise[];
  workout: Workout;
}

const mapStateToProps = (state: State, ownProps: ExercisesScreenProps): StateProps => {
  const workout: Workout = ownProps.navigation.getParam('workout');
  const exercises: Exercise[] = exercisesSelectors.selectExercises(state, workout.id);

  return {
    exercises,
    workout,
  };
};

interface DispatchProps {
  fetchExercises: (workoutId: Exercise['workoutId']) => void;
  addExercise: (exercise: ExerciseDetails) => void;
}

const mapDispatchToProps = (dispatch): DispatchProps => ({
  fetchExercises: (workoutId: Exercise['workoutId']) => {
    dispatch(actions.fetchExercises(workoutId));
  },
  addExercise: (exercise: ExerciseDetails) => {
    dispatch(actions.addExercise(exercise));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ExercisesScreenContainer);
