import React from 'react';
import { TouchableOpacity, Platform, TouchableNativeFeedback } from 'react-native';

interface Props {
  children: any,
  onPress: any,
  disabled?: boolean,
  onLongPress?: any,
}

const TouchableComponent = (props: Props) => {
  const {
    children,
    onPress,
    disabled,
    onLongPress,
  } = props;

  if (Platform.OS === 'ios') {
    return (
      <TouchableOpacity onPress={onPress} disabled={disabled} onLongPress={onLongPress}>
        {children}
      </TouchableOpacity>
    );
  }

  return (
    <TouchableNativeFeedback
      onPress={onPress}
      onLongPress={onLongPress}
      disabled={disabled}
      useForeground
      delayPressIn={0}
    >
      {children}
    </TouchableNativeFeedback>
  );
};

export default TouchableComponent;
