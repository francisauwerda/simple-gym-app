import React from 'react';
import {
  StyleSheet, Text, View, Button,
} from 'react-native';
import {
  NavigationScreenProp, NavigationParams, NavigationState,
} from 'react-navigation';

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>
}

export default function HomeScreen(props: Props) {
  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => props.navigation.navigate('Details')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
