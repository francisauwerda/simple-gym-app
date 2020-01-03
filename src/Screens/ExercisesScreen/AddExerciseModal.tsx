import React from 'react';
import { NavigationScreenProp, NavigationState } from 'react-navigation';
import AddExerciseForm from './AddExerciseForm';
import { Workout } from '../../state/ducks/workouts/types';
import { ExerciseDetails } from '../../state/ducks/exercises/types';
import ModalWrapper from '../../components/ModalWrapper';

export enum AddExerciseParams {
  AddExerciseParam = 'ADD_EXERCISE',
  WorkoutParam = 'WORKOUT'
}

interface NavigationParams {
  [AddExerciseParams.AddExerciseParam]: (exerciseDetails: ExerciseDetails) => void;
  [AddExerciseParams.WorkoutParam]: Workout;
}

type Navigation = NavigationScreenProp<NavigationState, NavigationParams>;

interface Props {
  navigation: Navigation;
}

const AddExerciseModal = (props: Props) => {
  const { navigation } = props;

  const addExercise = navigation.state.params[AddExerciseParams.AddExerciseParam];
  const workout = navigation.state.params[AddExerciseParams.WorkoutParam];

  return (
    <ModalWrapper>
      <AddExerciseForm
        addExercise={addExercise}
        dismissModal={() => navigation.goBack()}
        workout={workout}
      />
    </ModalWrapper>
  );
};

export default AddExerciseModal;
