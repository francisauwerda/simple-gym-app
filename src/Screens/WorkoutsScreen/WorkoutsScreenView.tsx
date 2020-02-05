import React from 'react';
import {
  SafeAreaView, FlatList, StyleSheet, View,
} from 'react-native';
import { NavigationScreenProp, NavigationState, NavigationParams } from 'react-navigation';

import { Workout, WorkoutWithLastModified } from '../../state/ducks/workouts/types';
import Card from '../../components/Card';
import Button from '../../components/Button';
import BottomWrapper from '../../components/BottomWrapper';
import { DispatchProps, OpenModalProps } from './WorkoutsScreen';
import { getLastModifiedText } from '../helpers';

type WorkoutsScreenProps = {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>,
  workouts: WorkoutWithLastModified[],
  navigateToExercises: ({ workout }: { workout: Workout }) => void;
  openModal: (props: OpenModalProps) => void;
} & Partial<DispatchProps>;

const WorkoutsScreenView = (props: WorkoutsScreenProps) => {
  const {
    workouts,
    navigateToExercises,
    openModal,
    deleteWorkout,
  } = props;

  return (
    <SafeAreaView style={styles.container}>
      {workouts.length ? (
        <FlatList
          style={styles.flatListContainer}
          data={workouts}
          renderItem={({ item }) => (
            <Card
              mainText={item.name}
              secondaryText={getLastModifiedText(item.lastModified)}
              onClickHandler={() => navigateToExercises({ workout: item })}
              optionsActionSheetProps={{
                onEditHandler: () => {
                  openModal({
                    id: item.id,
                    initialValues: {
                      name: item.name,
                    },
                  });
                },
                onDeleteHandler: () => {
                  deleteWorkout(item.id);
                },
              }}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <View style={styles.flatListContainer}>
          <Card
            mainText="Add a workout! 💪"
            secondaryText="Start by clicking the button below"
            onClickHandler={() => openModal({})}
          />
        </View>
      )}


      <BottomWrapper>
        <View>
          <Button
            title="Add new Workout"
            onPress={() => openModal({})}
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
