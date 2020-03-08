import React from 'react';
import {
  FlatList, StyleSheet, View,
} from 'react-native';
import {
  NavigationScreenProp, NavigationParams, NavigationState,
} from 'react-navigation';

import { ScreenNames } from '../enums';
import { ExerciseWithLastModified } from '../../state/ducks/exercises/types';
import { Workout } from '../../state/ducks/workouts/types';
import Card from '../../components/Card';
import AddButton from '../../components/AddButton';
import BottomWrapper from '../../components/BottomWrapper';
import { DispatchProps, OpenModalProps } from './ExercisesScreen';
import { getLastModifiedText } from '../helpers';
import colors from '../../styles/colors';
import ScreenLayout from '../layout/ScreenLayout';

type Props = {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
  exercises: ExerciseWithLastModified[];
  workout: Workout;
  openModal: (props: OpenModalProps) => void;
} & Partial<DispatchProps>;

export default function ExercisesScreenView(props: Props) {
  const {
    exercises, navigation, openModal, deleteExercise,
    workout,
  } = props;
  return (
    <ScreenLayout>
      <>
        {exercises.length ? (
          <FlatList
            style={styles.flatListContainer}
            data={exercises}
            renderItem={({ item }) => (
              <Card
                mainText={item.name}
                secondaryText={getLastModifiedText(item.lastModified)}
                onClickHandler={() => navigation.navigate(ScreenNames.Sets, { exercise: item })}
                optionsActionSheetProps={{
                  onEditHandler: () => {
                    openModal({
                      id: item.id,
                      initialValues: {
                        name: item.name,
                        workoutId: item.workoutId,
                      },
                    });
                  },
                  onDeleteHandler: () => {
                    deleteExercise(item.id);
                  },
                }}
              />
            )}
            keyExtractor={(item) => item.id}
          />
        ) : (
          <View style={styles.flatListContainer}>
            <Card
              mainText="Add an exercise! 🏋️‍♀️"
              secondaryText={`Click the button below to create your ${workout.name} exercises`}
              onClickHandler={() => openModal({})}
            />
          </View>
        )}

        <BottomWrapper>
          <AddButton text="NEW EXERCISE" onPressHandler={() => openModal({})} />
        </BottomWrapper>
      </>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  flatListContainer: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: 16,
    backgroundColor: colors.lightGrey,
  },
});
