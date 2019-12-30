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
      navigation, exercises, workout, deleteExercise, editExercise,
    } = this.props;

    return (
      <ExercisesScreenView
        navigation={navigation}
        exercises={exercises}
        workout={workout}
        openModal={this.openModal}
        deleteExercise={deleteExercise}
        editExercise={editExercise}
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

export interface DispatchProps {
  fetchExercises: () => void;
  addExercise: (exercise: ExerciseDetails) => void;
  deleteExercise: (id: Exercise['id']) => void;
  editExercise: (id: Exercise['id'], fields: Partial<ExerciseDetails>) => void;
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
  editExercise: (id: Exercise['id'], fields: Partial<ExerciseDetails>) => {
    dispatch(actions.editExercise(id, fields));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ExercisesScreenContainer);
