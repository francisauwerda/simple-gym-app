import React from 'react';
import {
  TextInput, StyleSheet, View, Text,
} from 'react-native';
import { Formik } from 'formik';
import moment from 'moment';
import { SetDetails, Difficulty } from '../../state/ducks/sets/types';
import { Exercise } from '../../state/ducks/exercises/types';
import Button from '../../components/Button';
import { FORM_MODES } from '../enums';

interface SetFormProps {
  onSubmitHandler: (fields: SetDetails) => void;
  initialValues?: SetDetails;
  exercise: Exercise;
  dismissModal: () => void;
  formMode: FORM_MODES;
}

/**
 * I made this type 'any' so I could use null for type number TextInputs
 */
const defaultInitialValues: any = {
  reps: null,
  weight: null,
  date: null,
  difficulty: null,
  exerciseId: null,
};

// TODO: Temporary until I create radio buttons
const convertDifficulty = (difficulty: string) => {
  if (difficulty === '0') {
    return Difficulty.EASY;
  } if (difficulty === '1') {
    return Difficulty.MODERATE;
  } if (difficulty === '2') {
    return Difficulty.HARD;
  }
  return null;
};

const SetForm = (props: SetFormProps) => {
  const {
    onSubmitHandler,
    formMode,
    exercise,
    dismissModal,
    initialValues = defaultInitialValues,
  } = props;

  const buttonText = formMode === FORM_MODES.ADD ? 'Add set' : 'Edit set';

  return (
    <Formik
      initialValues={{ ...initialValues, exerciseId: exercise.id }}
      onSubmit={(values, { resetForm }) => {
        const { difficulty } = values;
        const convertedDifficulty = convertDifficulty(difficulty);
        onSubmitHandler({
          ...values,
          date: values.date ? values.date : moment(),
          difficulty: convertedDifficulty,
        });
        resetForm();
        dismissModal();
      }}
    >
      {({
        handleChange, values, submitForm,
      }) => (
        <>
          <View>
            <Text style={styles.label}>Reps:</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleChange('reps')}
              value={values.reps}
              placeholder="How many reps?"
              keyboardType="numeric"
              autoFocus
              maxLength={5}
            />
          </View>

          <View>
            <Text style={styles.label}>Weight:</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleChange('weight')}
              value={values.weight}
              placeholder="How much weight?"
              keyboardType="numeric"
              maxLength={5}
            />
          </View>


          {/* Implement when I add difficulty */}
          <TextInput
            style={styles.input}
            onChangeText={handleChange('difficulty')}
            value={`${values.difficulty}`}
            placeholder="Difficulty"
          />

          <View style={styles.buttonWrapper}>
            <Button
              title={buttonText}
              onPress={submitForm}
            />
          </View>
        </>
      )}
    </Formik>
  );
};

export default SetForm;

const styles = StyleSheet.create({
  label: {
    textAlign: 'center',
  },
  input: {
    textAlign: 'center',
    fontSize: 24,
    paddingVertical: 10,
  },
  buttonWrapper: {
    marginTop: 20,
    alignSelf: 'stretch',
    marginHorizontal: 15,
  },
});
