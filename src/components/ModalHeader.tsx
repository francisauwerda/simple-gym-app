import React from 'react';
import {
  StyleSheet, View, Image,
} from 'react-native';
import TouchableComponent from './TouchableComponent';

const closeButton = require('../assets/baseline_close_black_48dp.png');

interface HeaderProps {
  dismissModal: () => void;
}


const Header = ({ dismissModal }: HeaderProps) => (
  <View style={styles.header}>
    <View style={styles.left}>
      <TouchableComponent onPress={dismissModal}>
        <View style={{ padding: 5 }}>
          <Image source={closeButton} style={{ width: 36, height: 36 }} />
        </View>
      </TouchableComponent>
    </View>
    <View style={styles.center} />
    <View style={styles.right} />
  </View>
);

export default Header;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
    paddingTop: 15,
  },
  left: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  right: {
    flex: 1,
  },
});
