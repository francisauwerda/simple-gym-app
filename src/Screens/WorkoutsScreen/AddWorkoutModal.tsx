import React from 'react';
import { NavigationScreenProp, NavigationState } from 'react-navigation';
import { WorkoutDetails } from '../../state/ducks/workouts/types';
import ModalWrapper from '../../components/ModalWrapper';
import AddWorkoutForm from './AddWorkoutForm';

export enum AddWorkoutParams {
  AddWorkout = 'ADD_WORKOUT'
}

interface NavigationParams {
  [AddWorkoutParams.AddWorkout]: (workoutDetails: WorkoutDetails) => void;
}

type Navigation = NavigationScreenProp<NavigationState, NavigationParams>;


interface Props {
  navigation: Navigation;
}

const AddWorkoutModal = (props: Props) => {
  const { navigation } = props;
  const addWorkout = navigation.state.params[AddWorkoutParams.AddWorkout];

  return (
    <ModalWrapper>
      <AddWorkoutForm
        addWorkout={addWorkout}
        dismissModal={() => navigation.goBack()}
      />
    </ModalWrapper>
  );
};

export default AddWorkoutModal;
