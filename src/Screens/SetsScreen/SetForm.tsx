import React from 'react';
import {
  TextInput, StyleSheet, View,
} from 'react-native';
import { Formik } from 'formik';
import moment from 'moment';
import { SetDetails } from '../../state/ducks/sets/types';
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
        handleChange, values, submitForm,
      }) => (
        <>
          <TextInput
            style={styles.input}
            onChangeText={handleChange('reps')}
            value={values.reps}
            placeholder="Reps"
            keyboardType="numeric"
            autoFocus
            maxLength={5}
          />

          <TextInput
            style={styles.input}
            onChangeText={handleChange('weight')}
            value={values.weight}
            placeholder="Weight"
            keyboardType="numeric"
            maxLength={5}
          />

          {/* Implement when I add difficulty */}
          {/* <TextInput
            style={styles.input}
            onChangeText={handleChange('difficulty')}
            value={values.difficulty}
            placeholder="Difficulty"
            keyboardType="numeric"
          /> */}

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
