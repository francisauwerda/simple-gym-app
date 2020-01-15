import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import TouchableComponent from './TouchableComponent';
import { Difficulty } from '../state/ducks/sets/types';
import colors from '../styles/colors';

const getRadioButtonSettings = (difficulty: Difficulty): { text: string, colour: string } => {
  switch (difficulty) {
    case Difficulty.Easy: {
      return { text: 'Easy', colour: colors.easy };
    }

    case Difficulty.Moderate: {
      return { text: 'Moderate', colour: colors.moderate };
    }

    case Difficulty.Hard: {
      return { text: 'Hard', colour: colors.hard };
    }

    default:
      return { text: 'Easy', colour: colors.easy };
  }
};

interface RadioButtonProps {
  selected?: boolean,
  difficulty: Difficulty,
  onPress: () => void,
}

const RadioButton = ({ selected = false, difficulty, onPress }: RadioButtonProps) => {
  const { text, colour } = getRadioButtonSettings(difficulty);
  return (
    <TouchableComponent onPress={onPress}>
      <View style={styles.radioButtonContainer}>
        <View style={styles.radioButtonOuterRing}>
          <View style={[styles.radioButtonOuter, { backgroundColor: colour }]}>
            <View style={[styles.radioButtonInner, selected && { backgroundColor: colour }]}>
              <Text style={styles.radioButtonText}>{text}</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableComponent>
  );
};

export default RadioButton;

const styles = StyleSheet.create({
  radioButtonContainer: {
    width: 85,
    height: 85,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    marginHorizontal: 5,
  },
  radioButtonOuterRing: {
    width: 85,
    height: 85,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 42.5,
    backgroundColor: '#303030',
  },
  radioButtonOuter: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  radioButtonInner: {
    width: 70,
    height: 70,
    borderRadius: 35,
    margin: 5,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioButtonText: {
    textAlign: 'center',
    fontWeight: '500',
    textTransform: 'capitalize',
    fontSize: 15,
  },
});
