import React from 'react';
import {
  SafeAreaView, FlatList, Button, StyleSheet,
} from 'react-native';
import { NavigationScreenProp, NavigationState, NavigationParams } from 'react-navigation';

import { Workout } from '../../state/ducks/workouts/types';
import Card from '../../components/Card';

interface WorkoutsScreenProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>,
  workouts: Workout[],
  resetWorkouts: () => void,
  navigateToExercises: ({ workout }: { workout: Workout }) => void;
  openModal: () => void;
}

const WorkoutsScreenView = (props: WorkoutsScreenProps) => {
  const {
    workouts,
    resetWorkouts,
    navigateToExercises,
    openModal,
  } = props;

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        style={styles.flatListContainer}
        data={workouts}
        renderItem={({ item }) => (
          <Card
            mainText={item.name}
            onClickHandler={() => navigateToExercises({ workout: item })}
          />
        )}
        keyExtractor={(item) => item.id}
      />

      <Button
        title="Add a Workout"
        onPress={openModal}
      />

      <Button
        title="Debug Reset Workouts"
        onPress={resetWorkouts}
      />

    </SafeAreaView>
  );
};

export default WorkoutsScreenView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  flatListContainer: {
    flex: 1,
    flexDirection: 'column',
    marginHorizontal: 16,
  },
});
