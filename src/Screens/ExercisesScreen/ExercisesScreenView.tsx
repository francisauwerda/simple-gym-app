import React from 'react';
import {
  SafeAreaView, FlatList, StyleSheet, Text, Button,
} from 'react-native';
import {
  NavigationScreenProp, NavigationParams, NavigationState,
} from 'react-navigation';

import { ScreenNames } from '../enums';
import { Exercise } from '../../state/ducks/exercises/types';
import { Workout } from '../../state/ducks/workouts/types';
import Card from '../../components/Card';

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
  exercises: Exercise[];
  workout: Workout;
  openModal: () => void;
}

export default function ExercisesScreenView(props: Props) {
  const {
    exercises, workout, navigation, openModal,
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

      <Button
        title="Add exercise"
        onPress={openModal}
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
