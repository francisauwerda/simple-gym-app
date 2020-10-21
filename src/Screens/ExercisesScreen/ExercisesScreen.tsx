import React from 'react';
import { connect } from 'react-redux';
import {
  NavigationScreenProp, NavigationParams, NavigationState,
} from 'react-navigation';

import ExercisesScreenView from './ExercisesScreenView';
import { Exercise, ExerciseDetails, ExerciseWithLastModified } from '../../state/ducks/exercises/types';
import { exercisesSelectors } from '../../state/ducks/exercises';
import actions from '../../state/ducks/exercises/actions';
import workoutActions from '../../state/ducks/workouts/actions';
import { Workout, WorkoutDetails } from '../../state/ducks/workouts/types';
import { ScreenNames } from '../enums';
import { NavigationParams as ExerciseModalNavigationParams } from './ExerciseModal';
import { getModalProps } from '../helpers';
import { AppState } from '../../state/types';
import { workoutsSelectors } from '../../state/ducks/workouts';

interface ExercisesNavigationState extends NavigationState {
  params: {
    workout: Workout;
  }
}

interface ExercisesScreenProps {
  navigation: NavigationScreenProp<ExercisesNavigationState, NavigationParams>;
}

export interface OpenModalProps {
  id?: Exercise['id'];
  initialValues?: ExerciseDetails;
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

  openModal = ({ id, initialValues }: OpenModalProps) => {
    const {
      navigation, addExercise, workout, editExercise,
    } = this.props;

    const { onSubmitHandler, formMode } = getModalProps({
      id,
      addHandler: addExercise,
      editHandler: editExercise,
    });

    const navigationParams: ExerciseModalNavigationParams = {
      onSubmitHandler,
      formMode,
      initialValues,
      workout,
    };

    navigation.navigate(ScreenNames.ExerciseModal, navigationParams);
  }


  render() {
    const {
      navigation, exercises, workout, deleteExercise, editWorkout, fetchExercises,
    } = this.props;

    return (
      <ExercisesScreenView
        navigation={navigation}
        exercises={exercises}
        workout={workout}
        openModal={this.openModal}
        deleteExercise={deleteExercise}
        editWorkout={editWorkout}
        fetchExercises={fetchExercises}
      />
    );
  }
}

interface StateProps {
  exercises: ExerciseWithLastModified[];
  workout: Workout;
}

const mapStateToProps = (state: AppState, ownProps: ExercisesScreenProps): StateProps => {
  const passedWorkout: Workout = ownProps.navigation.getParam('workout');
  const workout = workoutsSelectors.selectWorkouts(state)
    .find((w) => w.id === passedWorkout.id);
  const exercises = exercisesSelectors.selectExercisesWithLastModified(state, workout);

  return {
    exercises,
    workout,
  };
};

export interface DispatchProps {
  fetchExercises: () => void;
  addExercise: (exercise: ExerciseDetails) => void;
  deleteExercise: (id: Exercise['id']) => void;
  editExercise: (id: Exercise['id'], fields: ExerciseDetails) => void;
  editWorkout: (id: Exercise['workoutId'], fields: Partial<WorkoutDetails>) => void;
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
  editExercise: (id: Exercise['id'], fields: ExerciseDetails) => {
    dispatch(actions.editExercise(id, fields));
  },
  editWorkout: (id: Exercise['workoutId'], fields: Partial<WorkoutDetails>) => {
    dispatch(workoutActions.editWorkout(id, fields));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ExercisesScreenContainer);
