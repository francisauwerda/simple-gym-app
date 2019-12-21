import React from 'react';
import {
  SafeAreaView, FlatList, StyleSheet, View,
} from 'react-native';
import { NavigationScreenProp, NavigationState, NavigationParams } from 'react-navigation';

import { Workout } from '../../state/ducks/workouts/types';
import Card from '../../components/Card';
import Button from '../../components/Button';
import BottomWrapper from '../../components/BottomWrapper';

interface WorkoutsScreenProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>,
  workouts: Workout[],
  navigateToExercises: ({ workout }: { workout: Workout }) => void;
  openModal: () => void;
  deleteWorkout: (id: Workout['id']) => void;
}

const WorkoutsScreenView = (props: WorkoutsScreenProps) => {
  const {
    workouts,
    navigateToExercises,
    openModal,
    deleteWorkout,
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
            onLongPress={() => {
              console.log('Deleting workout: ', item.id);
              deleteWorkout(item.id);
            }}
          />
        )}
        keyExtractor={(item) => item.id}
      />

      <BottomWrapper>
        <View>
          <Button
            title="Add a Workout"
            onPress={openModal}
          />
        </View>
      </BottomWrapper>
    </SafeAreaView>
  );
};

export default WorkoutsScreenView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    marginBottom: 10,
  },
  flatListContainer: {
    flex: 1,
    flexDirection: 'column',
    paddingTop: 8,
    marginHorizontal: 16,
  },
  buttonsWrapper: {
    marginVertical: 15,
  },
});
