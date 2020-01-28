import React from 'react';
import {
  TextInput, StyleSheet, View, Text,
} from 'react-native';
import { Formik, FormikHelpers, FormikProps } from 'formik';
import moment from 'moment';
import { SetDetails, Difficulty } from '../../state/ducks/sets/types';
import { Exercise } from '../../state/ducks/exercises/types';
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

const handleRadioButtonPress = (
  setFieldValue: FormikHelpers<SetDetails>['setFieldValue'],
  submitForm: FormikProps<SetDetails>['submitForm'],
  difficulty: Difficulty,
) => {
  setFieldValue('difficulty', difficulty);
  submitForm();
};

const SetForm = (props: SetFormProps) => {
  const {
    onSubmitHandler,
    exercise,
    dismissModal,
    initialValues = defaultInitialValues,
  } = props;


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
          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Reps</Text>
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

          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Weight</Text>
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
              onPress={() => handleRadioButtonPress(setFieldValue, submitForm, Difficulty.Easy)}
            />
            <RadioButton
              selected={values.difficulty === Difficulty.Moderate}
              difficulty={Difficulty.Moderate}
              onPress={() => handleRadioButtonPress(setFieldValue, submitForm, Difficulty.Moderate)}
            />
            <RadioButton
              selected={values.difficulty === Difficulty.Hard}
              difficulty={Difficulty.Hard}
              onPress={() => handleRadioButtonPress(setFieldValue, submitForm, Difficulty.Hard)}
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
    fontSize: 28,
  },
  input: {
    textAlign: 'center',
    fontSize: 24,
    paddingVertical: 10,
  },
  inputWrapper: {
    paddingBottom: 20,
  },
  radioButtons: {
    marginTop: 40,
    marginHorizontal: 15,
    flexDirection: 'row',
    paddingVertical: 10,
  },
});
