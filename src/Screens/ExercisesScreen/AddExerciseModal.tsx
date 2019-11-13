import React from 'react';
import { SafeAreaView } from 'react-native';
import { NavigationScreenProp, NavigationState, NavigationParams } from 'react-navigation';
import AddExerciseForm from './AddExerciseForm';
import { WorkoutDetails } from '../../state/ducks/workouts/types';
import { ExerciseDetails } from '../../state/ducks/exercises/types';

export enum AddExerciseParams {
  AddExercise = 'ADD_EXERCISE',
  WorkoutId = 'WORKOUT_ID'
}

interface AddWorkoutModalNavigationState extends NavigationState {
  params: {
    [AddExerciseParams.AddExercise]: (workoutDetails: WorkoutDetails) => void;
    [AddExerciseParams.WorkoutId]: ExerciseDetails['workoutId'];
  }
}

interface Props {
  navigation: NavigationScreenProp<AddWorkoutModalNavigationState, NavigationParams>,
}

const AddExerciseModal = (props: Props) => {
  const { navigation } = props;

  const addExercise = navigation.getParam(AddExerciseParams.AddExercise);
  const workoutId = navigation.getParam(AddExerciseParams.WorkoutId);

  const dismissModal = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <AddExerciseForm
        addExercise={addExercise}
        dismissModal={dismissModal}
        workoutId={workoutId}
      />
    </SafeAreaView>
  );
};

export default AddExerciseModal;
