import React from 'react';
import {
  Text, StyleSheet, View,
} from 'react-native';
import { useActionSheet } from '@expo/react-native-action-sheet';

import { OptionsActionSheetProps, handleOptionsPress } from './OptionsActionSheet';
import TouchableComponent from '../components/TouchableComponent';
import colors from '../styles/colors';
import { Difficulty } from '../state/ducks/sets/types';

interface CardProps {
  mainText: string,
  secondaryText?: string,
  onClickHandler: any,
  leftAccessory?: any,
  disabled?: boolean,
  optionsActionSheetProps?: OptionsActionSheetProps;
  difficulty?: Difficulty,
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

const Card = ({
  mainText,
  secondaryText,
  onClickHandler,
  leftAccessory,
  disabled,
  optionsActionSheetProps = {},
  difficulty,
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
          <Text style={styles.leftAccessory}>
            {`Set ${leftAccessory}`}
          </Text>
          )}
          <View style={styles.textWrapper}>
            <Text style={styles.mainText}>{mainText}</Text>
            {!!secondaryText && <Text>{secondaryText}</Text>}
          </View>
        </View>
        {/* Comment out temporarily. Not sure if I want this anymore. */}
        {/* {!!optionsActionSheetProps && (
        <OptionsActionSheet
          onDeleteHandler={optionsActionSheetProps.onDeleteHandler}
          onEditHandler={optionsActionSheetProps.onEditHandler}
        />
        )} */}
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
  mainText: {
    fontSize: 20,
    fontWeight: '500',
    lineHeight: 30,
  },
  textWrapper: {
  },
  leftAccessory: {
    fontSize: 24,
    lineHeight: 30,
    textAlignVertical: 'center',
    borderRightWidth: 1,
    borderRightColor: 'black',
    paddingRight: 10,
    marginRight: 10,
  },
});
