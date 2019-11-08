import React from 'react';
import {
  SafeAreaView, FlatList, StyleSheet, Text,
} from 'react-native';
import {
  NavigationScreenProp, NavigationParams, NavigationState,
} from 'react-navigation';

import AddExerciseForm from './AddExerciseForm';
import { ScreenNames } from '../enums';
import { Exercise, ExerciseDetails } from '../../state/ducks/exercises/types';
import { Workout } from '../../state/ducks/workouts/types';
import Card from '../../components/Card';

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
  exercises: Exercise[];
  workout: Workout;
  addExercise: (exerciseDetails: ExerciseDetails) => void;
}

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
        style={styles.flatListContainer}
        data={exercises}
        renderItem={({ item }) => (
          <Card
            mainText={item.name}
            onClickHandler={() => navigation.navigate(ScreenNames.Sets, { exercise: item })}
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
  flatListContainer: {
    flex: 1,
    flexDirection: 'column',
    margin: 16,
  },
  title: {
    textAlign: 'center',
  },
});
