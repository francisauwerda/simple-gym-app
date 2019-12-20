import React from 'react';
import { TouchableOpacity, Platform, TouchableNativeFeedback } from 'react-native';

interface Props {
  children: any,
  onPress: any,
  disabled?: boolean,
}

const TouchableComponent = (props: Props) => {
  const { children, onPress, disabled } = props;
  if (Platform.OS === 'ios') {
    return (
      <TouchableOpacity onPress={onPress} disabled={disabled}>
        {children}
      </TouchableOpacity>
    );
  }

  return (
    <TouchableNativeFeedback onPress={onPress} disabled={disabled}>
      {children}
    </TouchableNativeFeedback>
  );
};

export default TouchableComponent;
