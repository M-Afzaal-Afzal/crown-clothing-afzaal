import { FC, ButtonHTMLAttributes } from "react";
import { BaseButton, ButtonSpinner, GoogleSignInButton, InvertedButton } from "./button.styles";

/* 
default

inverted

google sign in
*/

export enum BUTTON_TYPE_CLASSES {
  base = "base",
  google = "google-sign-in",
  inverted = "inverted"
}

const getButton = (buttonType = BUTTON_TYPE_CLASSES.base) =>
  ({
    [BUTTON_TYPE_CLASSES.base]: BaseButton,
    [BUTTON_TYPE_CLASSES.google]: GoogleSignInButton,
    [BUTTON_TYPE_CLASSES.inverted]: InvertedButton
  }[buttonType]);

type ButtonProps = {
  isLoading?: boolean;
  buttonType: BUTTON_TYPE_CLASSES;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: FC<ButtonProps> = ({ children, isLoading, buttonType, ...otherProps }) => {
  const CustomButton = getButton(buttonType);
  return (
    <CustomButton disabled={isLoading} {...otherProps}>
      {isLoading ? <ButtonSpinner /> : children}
    </CustomButton>
  );
};
