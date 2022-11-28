import { Group, FormInputLabel, Input } from "./form-input.styles.jsx";

export const FormInput = ({ label, ...props }) => {
  return (
    <Group>
      <Input {...props} />
      {label && <FormInputLabel shrink={props.value.length}>{label}</FormInputLabel>}
    </Group>
  );
};
