import React from 'react';
import {
  StyleSheet, Text, SectionList, View,
} from 'react-native';
import moment from 'moment';

import { Set, SetWithExtras } from '../../state/ducks/sets/types';
import Card from '../../components/Card';
import BottomWrapper from '../../components/BottomWrapper';
import { SetsScreenContainerProps, OpenModalProps } from './SetsScreen';
import { getLastModifiedText } from '../helpers';
import ScreenLayout from '../layout/ScreenLayout';
import colors from '../../styles/colors';
import AddButton from '../../components/AddButton';

// const icon = require('../../assets/multiplication-symbol.png');

type Props = {
  openModal: (props: OpenModalProps) => void;
} & Partial<SetsScreenContainerProps>

const renderRepsAndWeight = (weight: Set['weight'], reps: Set['reps']) => (
  <View style={styles.weightRepsContainer}>
    <View style={styles.repsContainer}>
      <Text style={styles.weight}>
        {reps}
      </Text>
      <Text style={styles.unit}>     X</Text>
    </View>
    {/* <Image source={icon} style={{ width: 32, height: 32 }} /> */}
    <View style={styles.weightContainer}>
      <Text style={styles.weight}>
        {weight}
      </Text>
      <Text style={styles.unit}> kg</Text>
    </View>
  </View>
);

interface Data {
  title: string,
  subtitle?: string,
  data: Props['lastSessionSets'] | Props['todaysSets']
}

export default function SetsScreenView(props: Props) {
  const {
    todaysSets,
    lastSessionSets,
    openModal,
    deleteSet,
  } = props;

  // TODO: Move this out of the render function
  const myData: Data[] = [];
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
    <ScreenLayout>
      <>
        {myData.length ? (
          <SectionList
            style={styles.sectionListContainer}
            sections={myData}
            keyExtractor={(item) => item.id}
            renderItem={({ item, index }: { item: SetWithExtras, index: number}) => (
              <Card
                difficulty={item.difficulty}
                leftAccessory={index + 1}
                mainText={renderRepsAndWeight(item.weight, item.reps)}
                timerSettings={{ showTimer: item.showTimer, date: item.date }}
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
              secondaryText="Here is where you will keep track of your progress"
              onClickHandler={() => openModal({})}
            />
          </View>
        )}

        <BottomWrapper>
          <AddButton
            text="NEW SET"
            onPressHandler={() => openModal({})}
          />
        </BottomWrapper>
      </>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  sectionListContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  sectionTitles: {
    backgroundColor: colors.lightGrey,
    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: '700',
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
    fontWeight: '700',
  },
  unit: {
    fontSize: 18,
  },
  repsContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 20,
  },
  reps: {
    fontSize: 24,
    fontWeight: '700',
  },
  weightRepsContainer: {
    flexDirection: 'row',
  },
});
