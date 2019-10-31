import React from 'react';
import {
  View, Text, Button, StyleSheet,
} from 'react-native';
import { NavigationScreenProp, NavigationState, NavigationParams } from 'react-navigation';

import { Workout, WorkoutDetails } from '../../state/ducks/workouts/types';
import AddWorkoutForm from './AddWorkoutForm';

const texts = {
  title: 'Workouts Screen',
  button: 'Go to exercises',
};

interface WorkoutsScreenProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>,
  workouts: Workout[],
  resetWorkouts: () => void,
  addWorkout: (workoutDetails: WorkoutDetails) => void;
  navigateToExercises: ({ workout }: { workout: Workout }) => void;
}

const WorkoutsScreenView = (props: WorkoutsScreenProps) => {
  const {
    workouts,
    resetWorkouts,
    addWorkout,
    navigateToExercises,
  } = props;


  return (
    <View style={styles.container}>

      <Text>{texts.title}</Text>
      <Text>List of workouts</Text>
      {workouts.map((workout) => (
        <Button
          key={`${workout.id}.${workout.name}`}
          title={`Go to ${workout.name} with ID: ${workout.id}`}
          onPress={() => navigateToExercises({ workout })}
        />
      ))}
      <Button
        title="Debug Reset Workouts"
        onPress={resetWorkouts}
      />

      <AddWorkoutForm addWorkout={addWorkout} />

    </View>
  );
};

export default WorkoutsScreenView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
