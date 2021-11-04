import { useField } from 'formik';
import { HTMLInputTypeAttribute } from 'react';
import { Form, Label } from 'semantic-ui-react';

interface Props {
  name: string;
  placeholder: string;
  label: string;
  type?: HTMLInputTypeAttribute;
}

const TextInput = ({ placeholder, name, label, type = 'text' }: Props) => {
  const [field, meta] = useField(name);

  return (
    <Form.Field error={meta.touched && !!meta.error}>
      <label>{label}</label>
      <input {...field} type={type} placeholder={placeholder} />
      {meta.touched && meta.error ? (
        <Label color="red" basic>
          {meta.error}
        </Label>
      ) : null}
    </Form.Field>
  );
};

export default TextInput;
