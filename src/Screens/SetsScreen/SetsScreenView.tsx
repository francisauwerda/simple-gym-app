import React from 'react';
import {
  SafeAreaView, StyleSheet, Text, SectionList, View,
} from 'react-native';
import moment from 'moment';

import { Set } from '../../state/ducks/sets/types';
import { Exercise } from '../../state/ducks/exercises/types';
import Card from '../../components/Card';
import Button from '../../components/Button';
import BottomWrapper from '../../components/BottomWrapper';
import { DispatchProps, OpenModalProps } from './SetsScreen';
import { getLastModifiedText } from '../helpers';

type Props = {
  todaysSets: Set[],
  lastSessionSets: Set[],
  exercise: Exercise;
  openModal: (props: OpenModalProps) => void;
} & Partial<DispatchProps>

const renderRepsAndWeight = (weight: Set['weight'], reps: Set['reps']) => (
  <View style={styles.weightRepsContainer}>
    <View style={styles.repsContainer}>
      <Text style={styles.weight}>
        {reps}
      </Text>
      <Text> reps</Text>
    </View>
    <View style={styles.weightContainer}>
      <Text style={styles.weight}>
        {weight}
      </Text>
      <Text> kg</Text>
    </View>
  </View>
);

export default function SetsScreenView(props: Props) {
  const {
    todaysSets,
    lastSessionSets,
    openModal,
    deleteSet,
  } = props;

  // TODO: Move this out of the render function
  const myData: { title: string, subtitle?: string, data: Set[] }[] = [];
  if (todaysSets.length) {
    myData.push({
      title: 'Today',
      data: todaysSets,
    });
  }

  if (lastSessionSets.length) {
    myData.push({
      title: 'Last session',
      subtitle: getLastModifiedText(lastSessionSets[0].date),
      data: lastSessionSets,
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      {myData.length ? (
        <SectionList
          style={styles.sectionListContainer}
          sections={myData}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }: {
          item: Set, index: number, section: any
        }) => (
          <Card
            difficulty={item.difficulty}
            leftAccessory={index + 1}
            mainText={renderRepsAndWeight(item.weight, item.reps)}
            onClickHandler={() => {
              openModal({
                initialValues: {
                  date: moment(),
                  difficulty: item.difficulty,
                  weight: item.weight,
                  reps: item.reps,
                  exerciseId: item.exerciseId,
                },
              });
            }}
            optionsActionSheetProps={{
              onEditHandler: () => {
                openModal({
                  id: item.id,
                  initialValues: {
                    date: item.date,
                    difficulty: item.difficulty,
                    weight: item.weight,
                    reps: item.reps,
                    exerciseId: item.exerciseId,
                  },
                });
              },
              onDeleteHandler: () => {
                deleteSet(item.id);
              },
            }}
          />
          )}
          renderSectionHeader={({ section: { title, subtitle } }) => (
            <View style={styles.sectionTitles}>
              <Text style={styles.sectionTitle}>{title}</Text>
              {!!subtitle && <Text style={styles.sectionSubtitle}>{subtitle}</Text>}
            </View>
          )}
        />
      ) : (
        <View style={styles.sectionListContainer}>
          <Card
            mainText="Add a set!"
            secondaryText="Here is where we will keep track of your progress"
            onClickHandler={() => openModal({})}
          />
        </View>
      )}

      <BottomWrapper>
        <Button
          title="Add a set"
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
  sectionListContainer: {
    flex: 1,
    flexDirection: 'column',
    marginTop: 8,
    marginHorizontal: 16,
  },
  sectionTitles: {
    backgroundColor: 'white',
    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: '500',
  },
  sectionSubtitle: {
    fontSize: 16,
  },
  weightContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  weight: {
    fontSize: 32,
    fontWeight: '500',
  },
  repsContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 20,
  },
  reps: {
    fontSize: 24,
    fontWeight: '500',
  },
  weightRepsContainer: {
    flexDirection: 'row',
  },
});
