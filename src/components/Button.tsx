import React from 'react';
import { Button as ReactNativeButton, StyleSheet, View } from 'react-native';

interface Props {
  title: string;
  onPress: () => void;
}

const Button = ({ title, onPress }: Props) => (
  <View style={styles.buttonWrapper}>
    <ReactNativeButton
      title={title}
      onPress={onPress}
    />
  </View>
);

export default Button;

const styles = StyleSheet.create({
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 5,
  },
});
