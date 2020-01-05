import React from 'react';
import {
  SafeAreaView, FlatList, StyleSheet,
} from 'react-native';
import {
  NavigationScreenProp, NavigationParams, NavigationState,
} from 'react-navigation';

import { ScreenNames } from '../enums';
import { Exercise } from '../../state/ducks/exercises/types';
import { Workout } from '../../state/ducks/workouts/types';
import Card from '../../components/Card';
import Button from '../../components/Button';
import BottomWrapper from '../../components/BottomWrapper';
import { DispatchProps, OpenModalProps } from './ExercisesScreen';

type Props = {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
  exercises: Exercise[];
  workout: Workout;
  openModal: (props: OpenModalProps) => void;
} & Partial<DispatchProps>;

export default function ExercisesScreenView(props: Props) {
  const {
    exercises, navigation, openModal, deleteExercise,
  } = props;
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        style={styles.flatListContainer}
        data={exercises}
        renderItem={({ item }) => (
          <Card
            mainText={item.name}
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

      <BottomWrapper>
        <Button
          title="Add an exercise"
          onPress={() => openModal({})}
        />
      </BottomWrapper>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    marginBottom: 10,
  },
  flatListContainer: {
    flex: 1,
    flexDirection: 'column',
    paddingTop: 8,
    marginHorizontal: 16,
  },
});
