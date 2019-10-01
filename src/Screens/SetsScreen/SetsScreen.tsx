import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

class SetsScreen extends Component {
  componentDidMount() {
    console.log('SetsScreen mounted.');
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Sets Screen</Text>
      </View>
    );
  }
}

export default SetsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
