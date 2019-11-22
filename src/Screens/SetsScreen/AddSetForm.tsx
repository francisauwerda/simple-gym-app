import React from 'react';
import {
  TextInput, Button, StyleSheet, View,
} from 'react-native';
import { Formik } from 'formik';
import moment from 'moment';
import { SetDetails } from '../../state/ducks/sets/types';
import { Exercise } from '../../state/ducks/exercises/types';

interface AddSetFormProps {
  addSet: (setDetails: SetDetails) => void;
  exercise: Exercise;
  dismissModal: () => void;
}

const initialValues: any = { // TODO: Sort this out
  reps: null,
  weight: null,
  date: null,
  difficulty: null,
};

const AddSetForm = (props: AddSetFormProps) => {
  const { addSet, exercise, dismissModal } = props;

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, { resetForm }) => {
        const date = moment();
        const exerciseId = exercise.id;

        addSet({ ...values, date, exerciseId });
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
            placeholder="Enter reps"
            keyboardType="numeric"
            autoFocus
          />

          <TextInput
            style={styles.input}
            onChangeText={handleChange('weight')}
            value={values.weight}
            placeholder="Enter weight in KGs"
            keyboardType="numeric"
          />

          <TextInput
            style={styles.input}
            onChangeText={handleChange('difficulty')}
            value={values.difficulty}
            placeholder="Enter difficulty from 1-5"
            keyboardType="numeric"
          />

          <View style={styles.buttonWrapper}>
            <Button
              title="Add set"
              onPress={submitForm}
            />
          </View>
        </>
      )}
    </Formik>
  );
};

export default AddSetForm;

const styles = StyleSheet.create({
  input: {
    textAlign: 'center',
    fontSize: 24,
  },
  buttonWrapper: {
    marginTop: 20,
    alignSelf: 'stretch',
    marginHorizontal: 15,
  },
});
