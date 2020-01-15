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
import RadioButton from '../../components/RadioButton';

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
  difficulty: Difficulty.Easy,
  exerciseId: null,
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
        onSubmitHandler({
          ...values,
          date: values.date ? values.date : moment(),
        });
        resetForm();
        dismissModal();
      }}
    >
      {({
        handleChange, values, submitForm, setFieldValue,
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

          <View style={styles.radioButtons}>
            <RadioButton
              selected={values.difficulty === Difficulty.Easy}
              difficulty={Difficulty.Easy}
              onPress={() => setFieldValue('difficulty', Difficulty.Easy)}
            />
            <RadioButton
              selected={values.difficulty === Difficulty.Moderate}
              difficulty={Difficulty.Moderate}
              onPress={() => setFieldValue('difficulty', Difficulty.Moderate)}
            />
            <RadioButton
              selected={values.difficulty === Difficulty.Hard}
              difficulty={Difficulty.Hard}
              onPress={() => setFieldValue('difficulty', Difficulty.Hard)}
            />
          </View>

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
  radioButtons: {
    flexDirection: 'row',
    paddingVertical: 10,
  },
});
