import React, { useState } from 'react';
import {
  View, Text, Button, StyleSheet, TextInput,
} from 'react-native';
import { NavigationScreenProp, NavigationState, NavigationParams } from 'react-navigation';

import { ScreenNames } from '../enums';
import { Workout, WorkoutDetails } from '../../state/ducks/workouts/types';

const texts = {
  title: 'Workouts Screen',
  button: 'Go to exercises',
};

interface WorkoutsScreenProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>,
  workouts: Workout[],
  resetWorkouts: () => void,
  addWorkout: (workoutDetails: WorkoutDetails) => void;
}

const WorkoutsScreenView = (props: WorkoutsScreenProps) => {
  const {
    workouts,
    resetWorkouts,
    addWorkout,
  } = props;

  const [workoutValue, onChangeText] = useState('');

  return (
    <View style={styles.container}>
      <Text>{texts.title}</Text>
      <Text>List of workouts</Text>
      {workouts.map((workout) => (
        <Button
          key={`${workout.id}.${workout.name}`}
          title={`Go to ${workout.name} with ID: ${workout.id}`}
          onPress={() => props.navigation.navigate(ScreenNames.Exercises)}
        />
      ))}
      <Button
        title="Debug Reset Workouts"
        onPress={resetWorkouts}
      />

      {/* TODO: Turn this into a form */}
      <TextInput onChangeText={onChangeText} value={workoutValue} placeholder="Enter workout name" />
      <Button
        title="Add workout"
        onPress={() => addWorkout({ name: workoutValue })}
      />
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
