import React from 'react';
import { TouchableOpacity, Platform, TouchableNativeFeedback } from 'react-native';

interface Props {
  children: any,
  onPress: any,
}

const TouchableComponent = (props: Props) => {
  const { children, onPress } = props;
  if (Platform.OS === 'ios') {
    return (
      <TouchableOpacity onPress={onPress}>
        {children}
      </TouchableOpacity>
    );
  }

  return (
    <TouchableNativeFeedback onPress={onPress}>
      {children}
    </TouchableNativeFeedback>
  );
};

export default TouchableComponent;
