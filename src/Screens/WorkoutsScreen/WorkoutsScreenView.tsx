import React from 'react';
import {
  FlatList, StyleSheet, View, Text,
} from 'react-native';
import { NavigationScreenProp, NavigationState, NavigationParams } from 'react-navigation';

import {
  Workout, WorkoutWithLastModified, GlobalWorkoutSettings,
} from '../../state/ducks/workouts/types';
import Card from '../../components/Card';
import BottomWrapper from '../../components/BottomWrapper';
import { DispatchProps, OpenModalProps } from './WorkoutsScreen';
import { getLastModifiedText } from '../helpers';
import AddButton from '../../components/AddButton';
import colors from '../../styles/colors';
import ScreenLayout from '../layout/ScreenLayout';
import TouchableComponent from '../../components/TouchableComponent';
import { Direction, Sorting } from '../../state/types';

type WorkoutsScreenProps = {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>,
  workouts: WorkoutWithLastModified[],
  navigateToExercises: ({ workout }: { workout: Workout }) => void;
  openModal: (props: OpenModalProps) => void;
  globalWorkoutSettings: GlobalWorkoutSettings
} & Partial<DispatchProps>;

const WorkoutsScreenView = (props: WorkoutsScreenProps) => {
  const {
    workouts,
    navigateToExercises,
    openModal,
    deleteWorkout,
    globalWorkoutSettings,
    setGlobalWorkoutSettings,
  } = props;

  const { direction, sorting } = globalWorkoutSettings;

  return (
    <ScreenLayout>
      <>
        <TouchableComponent
          onPress={() => {
            setGlobalWorkoutSettings({
              ...globalWorkoutSettings,
              direction: direction === Direction.ASC ? Direction.DESC : Direction.ASC,
            });
          }}
          onLongPress={() => {
            setGlobalWorkoutSettings({
              ...globalWorkoutSettings,
              sorting: sorting === Sorting.name ? Sorting.lastModified : Sorting.name,
            });
          }}
        >
          <View style={styles.sortContainer}>
            <Text style={styles.sortText}>
              {sorting === Sorting.name ? 'Sort by name' : 'Sort by date'}
            </Text>
            <Text style={styles.sortText}>
              {direction === Direction.ASC ? '☝️' : '👇'}
            </Text>
          </View>
        </TouchableComponent>
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
          <AddButton text="NEW WORKOUT" onPressHandler={() => openModal({})} />
        </BottomWrapper>
      </>
    </ScreenLayout>
  );
};

export default WorkoutsScreenView;

const styles = StyleSheet.create({
  flatListContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: colors.lightGrey,
  },
  sortContainer: {
    flexDirection: 'row',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sortText: {
    fontSize: 26,
  },
});
