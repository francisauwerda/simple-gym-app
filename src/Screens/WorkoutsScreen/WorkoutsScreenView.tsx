import React from 'react';
import moment from 'moment';
import {
  SafeAreaView, FlatList, StyleSheet, View,
} from 'react-native';
import { NavigationScreenProp, NavigationState, NavigationParams } from 'react-navigation';

import { Workout, WorkoutWithLastModified } from '../../state/ducks/workouts/types';
import Card from '../../components/Card';
import Button from '../../components/Button';
import BottomWrapper from '../../components/BottomWrapper';

interface WorkoutsScreenProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>,
  workouts: WorkoutWithLastModified[],
  navigateToExercises: ({ workout }: { workout: Workout }) => void;
  openModal: () => void;
  deleteWorkout: (id: Workout['id']) => void;
}

const getLastModifiedText = (lastModified: WorkoutWithLastModified['lastModified']): string => {
  if (lastModified) {
    const daysAgo = moment().diff(lastModified, 'days');
    if (daysAgo) {
      return `${daysAgo} day${daysAgo !== 1 ? 's' : ''} ago`;
    }

    const hoursAgo = moment().diff(lastModified, 'hours');
    if (hoursAgo) {
      return `${hoursAgo} hour${hoursAgo !== 1 ? 's' : ''} ago`;
    }

    const minutesAgo = moment().diff(lastModified, 'minutes');
    return `${minutesAgo} minute${minutesAgo !== 1 ? 's' : ''} ago`;
  }

  return '';
};

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
            secondaryText={getLastModifiedText(item.lastModified)}
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
