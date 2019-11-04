import React from 'react';
import {
  SafeAreaView, FlatList, StyleSheet, Text, Button,
} from 'react-native';
import {
  NavigationScreenProp, NavigationParams, NavigationState,
} from 'react-navigation';

import AddExerciseForm from './AddExerciseForm';
import { ScreenNames } from '../enums';
import { Exercise, ExerciseDetails } from '../../state/ducks/exercises/types';
import { Workout } from '../../state/ducks/workouts/types';

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
  exercises: Exercise[];
  workout: Workout;
  addExercise: (exerciseDetails: ExerciseDetails) => void;
}

const ExerciseButton = ({
  exercise,
  navigation,
}: {
  exercise: Exercise,
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}) => (
  <Button
    title={`Go to ${exercise.name} with ID: ${exercise.id.substr(0, 2)}`}
    onPress={() => navigation.navigate(ScreenNames.Sets, { exercise })}
  />
);

export default function ExercisesScreenView(props: Props) {
  const {
    exercises, workout, addExercise, navigation,
  } = props;
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        {`List of Exercises for ${workout.name} ${workout.id.substr(0, 2)}`}
      </Text>

      <FlatList
        data={exercises}
        renderItem={({ item }) => (
          <ExerciseButton
            exercise={item}
            navigation={navigation}
          />
        )}
        keyExtractor={(item) => item.id}
      />

      <AddExerciseForm
        addExercise={addExercise}
        workoutId={workout.id}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
  },
});
