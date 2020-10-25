import React from 'react';
import { View, StyleSheet } from 'react-native';

interface Props {
  children: any;
}

const BottomWrapper = ({ children }: Props) => (
  <View style={styles.outerWrapper}>
    <View style={styles.bottomWrapper}>
      {children}
    </View>
  </View>
);

export default BottomWrapper;

const styles = StyleSheet.create({
  outerWrapper: {
    display: 'flex',
    alignItems: 'center',
  },
  bottomWrapper: {
    marginBottom: 10,
    borderWidth: 0.1,
    backgroundColor: 'white',
    borderRadius: 8,
  },
});
