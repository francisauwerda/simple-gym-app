import React from 'react';
import { View, StyleSheet } from 'react-native';

interface Props {
  children: any;
}

const BottomWrapper = ({ children }: Props) => (
  <View style={styles.bottomWrapper}>
    {children}
  </View>
);

export default BottomWrapper;

const styles = StyleSheet.create({
  bottomWrapper: {
    paddingVertical: 10,
    borderStyle: 'solid',
    borderTopWidth: 0.5,
    borderTopColor: '#d6d7da',
  },
});
