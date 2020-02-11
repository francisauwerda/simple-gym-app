import React from 'react';
import {
  Text, StyleSheet, View,
} from 'react-native';
import { useActionSheet } from '@expo/react-native-action-sheet';

import { OptionsActionSheetProps, handleOptionsPress } from './OptionsActionSheet';
import TouchableComponent from '../components/TouchableComponent';
import Timer, { TimerSettings } from './Timer';
import colors from '../styles/colors';
import { Difficulty } from '../state/ducks/sets/types';

interface CardProps {
  mainText: string | React.ReactNode,
  secondaryText?: string | React.ReactNode,
  onClickHandler: any,
  leftAccessory?: any,
  disabled?: boolean,
  optionsActionSheetProps?: OptionsActionSheetProps;
  difficulty?: Difficulty,
  timerSettings?: TimerSettings
}

const getDifficultyStyles = (difficulty: Difficulty) => {
  switch (difficulty) {
    case Difficulty.Easy: {
      return styles.easy;
    }

    case Difficulty.Moderate: {
      return styles.moderate;
    }

    case Difficulty.Hard: {
      return styles.hard;
    }

    default: {
      return {};
    }
  }
};

const renderMainText = (mainText: CardProps['mainText']) => {
  if (!mainText) return null;

  if (typeof mainText === 'string') {
    return <Text style={styles.mainText}>{mainText}</Text>;
  }

  return mainText;
};

const renderSecondaryText = (secondaryText: CardProps['secondaryText']) => {
  if (!secondaryText) return null;

  if (typeof secondaryText === 'string') {
    return <Text style={styles.secondaryText}>{secondaryText}</Text>;
  }

  return secondaryText;
};

const Card = ({
  mainText,
  secondaryText,
  onClickHandler,
  leftAccessory,
  disabled,
  optionsActionSheetProps = {},
  difficulty,
  timerSettings,
}: CardProps) => {
  const { showActionSheetWithOptions } = useActionSheet();
  const { onDeleteHandler, onEditHandler } = optionsActionSheetProps;

  let onLongPressHandler: Function;
  if (onDeleteHandler && onEditHandler) {
    onLongPressHandler = () => handleOptionsPress({
      actionSheetHandler: showActionSheetWithOptions,
      onEditHandler,
      onDeleteHandler,
    });
  }

  const difficultyStyles = getDifficultyStyles(difficulty);

  return (
    <TouchableComponent
      onPress={onClickHandler}
      disabled={disabled}
      onLongPress={onLongPressHandler}
    >
      <View style={[styles.cardWrapper, difficultyStyles]}>
        <View style={styles.leftSideWrapper}>
          {!!leftAccessory && (
            <View style={styles.leftAccessory}>
              <Text style={styles.textWrapper}>
                {`${leftAccessory}`}
              </Text>
            </View>
          )}
          <View style={styles.textsContainer}>
            {renderMainText(mainText)}
            {renderSecondaryText(secondaryText)}
          </View>
        </View>
        {/* Comment out temporarily. Not sure if I want this anymore. */}
        {/* {!!optionsActionSheetProps && (
        <OptionsActionSheet
          onDeleteHandler={optionsActionSheetProps.onDeleteHandler}
          onEditHandler={optionsActionSheetProps.onEditHandler}
        />
        )} */}
        {
          timerSettings && timerSettings.showTimer
            && (
            <Timer
              date={timerSettings.date}
              showTimer={timerSettings.showTimer}
            />
            )
        }
      </View>
    </TouchableComponent>
  );
};

export default Card;

const styles = StyleSheet.create({
  cardWrapper: {
    padding: 16,
    marginVertical: 8,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  easy: {
    backgroundColor: colors.easy,
    borderWidth: 1,
    borderColor: '#303030',
  },
  moderate: {
    backgroundColor: colors.moderate,
    borderWidth: 1,
    borderColor: '#303030',
  },
  hard: {
    backgroundColor: colors.hard,
    borderWidth: 1,
    borderColor: '#303030',
  },
  leftSideWrapper: {
    display: 'flex',
    flexDirection: 'row',
  },
  textsContainer: {
    justifyContent: 'center',
  },
  mainText: {
    fontSize: 20,
    fontWeight: '500',
    lineHeight: 30,
  },
  secondaryText: {
    fontSize: 14,
  },
  textWrapper: {
    fontSize: 24,
  },
  leftAccessory: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    marginRight: 10,
  },
});
