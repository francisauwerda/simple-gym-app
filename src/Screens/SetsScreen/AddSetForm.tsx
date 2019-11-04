import React from 'react';
import { TextInput, Button } from 'react-native';
import { Formik } from 'formik';
import moment from 'moment';
import { SetDetails } from '../../state/ducks/sets/types';
import { Exercise } from '../../state/ducks/exercises/types';

interface AddSetFormProps {
  addSet: (setDetails: SetDetails) => void;
  exercise: Exercise;
}

const initialValues: any = { // TODO: Sort this out
  reps: null,
  weight: null,
  date: null,
  difficulty: null,
};

const AddSetForm = (props: AddSetFormProps) => {
  const { addSet, exercise } = props;

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, { resetForm }) => {
        const date = moment();
        const exerciseId = exercise.id;

        addSet({ ...values, date, exerciseId });
        resetForm();
      }}
    >
      {({
        handleChange, values, submitForm,
      }) => (
        <>
          <TextInput
            onChangeText={handleChange('reps')}
            value={values.reps}
            placeholder="Enter reps"
            keyboardType="numeric"
          />

          <TextInput
            onChangeText={handleChange('weight')}
            value={values.weight}
            placeholder="Enter weight in KGs"
            keyboardType="numeric"
          />

          <TextInput
            onChangeText={handleChange('difficulty')}
            value={values.difficulty}
            placeholder="Enter difficulty from 1-5"
            keyboardType="numeric"
          />

          <Button
            title="Add set"
            onPress={submitForm}
          />
        </>
      )}
    </Formik>
  );
};

export default AddSetForm;
