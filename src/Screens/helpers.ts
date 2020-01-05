import { FORM_MODES } from './enums';

interface ModalProps {
  onSubmitHandler: (fields: any) => void;
  formMode: FORM_MODES;
}

interface Handlers {
  id?: any;
  addHandler: (fields: any) => void;
  editHandler: (id: any, fields: any) => void;
}

// eslint-disable-next-line import/prefer-default-export
export const getModalProps = ({
  id,
  addHandler,
  editHandler,
}: Handlers): ModalProps => {
  let onSubmitHandler: ModalProps['onSubmitHandler'];
  let formMode: ModalProps['formMode'];

  if (id) {
    onSubmitHandler = (fields: any) => editHandler(id, fields);
    formMode = FORM_MODES.EDIT;
  } else {
    onSubmitHandler = (fields: any) => addHandler(fields);
    formMode = FORM_MODES.ADD;
  }

  return {
    onSubmitHandler,
    formMode,
  };
};
