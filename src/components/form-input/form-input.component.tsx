import { InputHTMLAttributes } from "react";
import { Group, FormInputLabel, Input } from "./form-input.styles";

export type FormInputProps = {
  label: string;
} & InputHTMLAttributes<HTMLInputElement>;

export const FormInput = ({ label, ...props }: FormInputProps) => {
  return (
    <Group>
      <Input {...props} />
      {label && (
        <FormInputLabel
          shrink={!!props.value && typeof props.value === "string" && !!props.value.length}
        >
          {label}
        </FormInputLabel>
      )}
    </Group>
  );
};
