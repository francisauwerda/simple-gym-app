import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { useActionSheet } from '@expo/react-native-action-sheet';

import TouchableComponent from './TouchableComponent';

const optionsIcon = require('../assets/round_more_vert_black_48.png');

type OptionsHandlers = {
  actionSheetHandler: any;
} & OptionsActionSheetProps;

export const handleOptionsPress = (optionsSettings: OptionsHandlers) => {
  const { onDeleteHandler, onEditHandler, actionSheetHandler } = optionsSettings;
  const options: string[] = [
    ...[onDeleteHandler && 'Delete'],
    ...[onEditHandler && 'Edit'],
    'Cancel',
  ];

  const destructiveButtonIndex = onDeleteHandler ? 0 : undefined;
  const cancelButtonIndex = options.length;

  actionSheetHandler({
    options,
    cancelButtonIndex,
    destructiveButtonIndex,
  }, (buttonIndex: number) => {
    if (buttonIndex === 0) {
      onDeleteHandler();
    } else if (buttonIndex === 1) {
      onEditHandler();
    }
  });
};


export interface OptionsActionSheetProps {
  onEditHandler?: () => void;
  onDeleteHandler?: () => void;
}

const OptionsActionSheet = (props: OptionsActionSheetProps) => {
  const { showActionSheetWithOptions } = useActionSheet();
  const { onDeleteHandler, onEditHandler } = props;

  const onPressHandler = () => handleOptionsPress({
    actionSheetHandler: showActionSheetWithOptions,
    onDeleteHandler,
    onEditHandler,
  });

  return (
    <View style={styles.optionsWrapper}>
      <TouchableComponent onPress={onPressHandler}>
        <View style={styles.optionsIconWrapper}>
          <Image source={optionsIcon} style={styles.optionsIconStyles} />
        </View>
      </TouchableComponent>
    </View>
  );
};

export default OptionsActionSheet;

const OPTIONS_SLOP_DIMENSIONS = 52;
const OPTIONS_BORDER_RADIUS = OPTIONS_SLOP_DIMENSIONS / 2;
const OPTIONS_IMAGE_DIMENSIONS = 32;

const styles = StyleSheet.create({
  optionsIconWrapper: {
    borderRadius: OPTIONS_BORDER_RADIUS,
    width: OPTIONS_SLOP_DIMENSIONS,
    height: OPTIONS_SLOP_DIMENSIONS,
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionsIconStyles: {
    width: OPTIONS_IMAGE_DIMENSIONS,
    height: OPTIONS_IMAGE_DIMENSIONS,
  },
  optionsWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
