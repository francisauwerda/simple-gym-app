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
  static navigationOptions = ({ navigation }) => {
    const workout: Workout = navigation.getParam('workout');
    return {
      title: `${workout.name} exercises 🏋️‍♂️`,
    };
  }

  componentDidMount() {
    const { fetchExercises } = this.props;

    fetchExercises();
  }

  openModal = () => {
    const { navigation, addExercise, workout } = this.props;

    navigation.navigate(ScreenNames.AddExercise, {
      [AddExerciseParams.AddExerciseParam]: addExercise,
      [AddExerciseParams.WorkoutParam]: workout,
    });
  }


  render() {
    const {
      navigation, exercises, workout, deleteExercise,
    } = this.props;

    return (
      <ExercisesScreenView
        navigation={navigation}
        exercises={exercises}
        workout={workout}
        openModal={this.openModal}
        deleteExercise={deleteExercise}
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
  fetchExercises: () => void;
  addExercise: (exercise: ExerciseDetails) => void;
  deleteExercise: (id: Exercise['id']) => void;
}

const mapDispatchToProps = (dispatch): DispatchProps => ({
  fetchExercises: () => {
    dispatch(actions.fetchExercises());
  },
  addExercise: (exercise: ExerciseDetails) => {
    dispatch(actions.addExercise(exercise));
  },
  deleteExercise: (id: Exercise['id']) => {
    dispatch(actions.deleteExercise(id));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ExercisesScreenContainer);
