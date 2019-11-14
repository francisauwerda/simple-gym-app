import React from 'react';
import { SafeAreaView, Text } from 'react-native';
import { NavigationScreenProp, NavigationState, NavigationParams } from 'react-navigation';
import AddExerciseForm from './AddExerciseForm';
import { Workout } from '../../state/ducks/workouts/types';
import { ExerciseDetails } from '../../state/ducks/exercises/types';

export enum AddExerciseParams {
  AddExerciseParam = 'ADD_EXERCISE',
  WorkoutParam = 'WORKOUT'
}

interface AddWorkoutModalNavigationState extends NavigationState {
  params: {
    [AddExerciseParams.AddExerciseParam]: (exerciseDetails: ExerciseDetails) => void;
    [AddExerciseParams.WorkoutParam]: Workout;
  }
}

interface Props {
  navigation: NavigationScreenProp<AddWorkoutModalNavigationState, NavigationParams>,
}

const AddExerciseModal = (props: Props) => {
  const { navigation } = props;

  const addExercise = navigation.getParam(AddExerciseParams.AddExerciseParam);
  const workout: Workout = navigation.getParam(AddExerciseParams.WorkoutParam);

  const dismissModal = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>{`Exercises for ${workout.name}`}</Text>
      <AddExerciseForm
        addExercise={addExercise}
        dismissModal={dismissModal}
        workoutId={workout.id}
      />
    </SafeAreaView>
  );
};

export default AddExerciseModal;
