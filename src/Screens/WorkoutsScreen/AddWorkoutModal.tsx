import React from 'react';
import { SafeAreaView } from 'react-native';
import { NavigationScreenProp, NavigationState, NavigationParams } from 'react-navigation';
import AddWorkoutForm from './AddWorkoutForm';
import { WorkoutDetails } from '../../state/ducks/workouts/types';

export enum AddWorkoutParams {
  AddWorkout = 'ADD_WORKOUT'
}

interface AddWorkoutModalNavigationState extends NavigationState {
  params: {
    [AddWorkoutParams.AddWorkout]: (workoutDetails: WorkoutDetails) => void;
  }
}

interface Props {
  navigation: NavigationScreenProp<AddWorkoutModalNavigationState, NavigationParams>,
}

const AddWorkoutModal = (props: Props) => {
  const { navigation } = props;

  const addWorkout = navigation.getParam(AddWorkoutParams.AddWorkout);

  const dismissModal = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <AddWorkoutForm
        addWorkout={addWorkout}
        dismissModal={dismissModal}
      />
    </SafeAreaView>
  );
};

export default AddWorkoutModal;
