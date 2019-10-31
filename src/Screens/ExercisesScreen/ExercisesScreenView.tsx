import React from 'react';
import {
  StyleSheet, Text, View, Button,
} from 'react-native';
import {
  NavigationScreenProp, NavigationParams, NavigationState,
} from 'react-navigation';
import { ScreenNames } from '../enums';
import { Exercise, ExerciseDetails } from '../../state/ducks/exercises/types';
import { Workout } from '../../state/ducks/workouts/types';

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
  exercises: Exercise[];
  workout: Workout;
  addExercise: (exerciseDetails: ExerciseDetails) => void;
}

export default function ExercisesScreenView(props: Props) {
  const { exercises, workout, addExercise } = props;
  return (
    <View style={styles.container}>
      <Text>{`List of Exercises for ${workout.name}`}</Text>

      {exercises.map((exercise) => (
        <Button
          key={`${exercise.id}.${exercise.name}`}
          title={`Go to ${exercise.name} with ID: ${exercise.id}`}
          onPress={() => props.navigation.navigate(ScreenNames.Sets)}
        />
      ))}

      <Button
        title="Add a dummy exercise"
        onPress={() => addExercise({ name: 'Fake exercise', workoutId: workout.id })}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
