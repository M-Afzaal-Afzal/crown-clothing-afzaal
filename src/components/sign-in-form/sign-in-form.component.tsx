import "./sign-in-form.styles.scss";
import { ChangeEvent, FormEvent, useState } from "react";
import { FormInput } from "../form-input/form-input.component";
import { Button, BUTTON_TYPE_CLASSES } from "../button/button.component";
import { useDispatch } from "react-redux";
import { signInWithGoogleStart, signInWithEmailStart } from "../../store/user/user.action";
import { AuthError, AuthErrorCodes } from "firebase/auth";

const defaultFormFields = {
  email: "",
  password: ""
};

export const SignInForm = () => {
  const dispatch = useDispatch();

  const [formFields, setFormFields] = useState(defaultFormFields);

  const { email, password } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const signInWithGoogle = () => {
    dispatch(signInWithGoogleStart());
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      dispatch(signInWithEmailStart(email, password));
      // await signInAuthUserWithEmailAndPassword(email, password);
      resetFormFields();
    } catch (error) {
      switch ((error as AuthError).code) {
        case AuthErrorCodes.INVALID_PASSWORD:
          alert(`incorrect password for ${email}`);
          break;
        case AuthErrorCodes.EMAIL_EXISTS:
          alert("Email already exists");
          break;
        default:
          console.log("user creation encountered an error", error);
      }
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="sign-up-container">
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          value={email}
          type="email"
          required
          onChange={handleChange}
          name={"email"}
        />

        <FormInput
          label={"Password"}
          value={password}
          type="password"
          required
          onChange={handleChange}
          name={"password"}
        />

        <div className="buttons-container">
          <Button type="submit" buttonType={BUTTON_TYPE_CLASSES.base}>
            Sign In
          </Button>
          <Button type="button" buttonType={BUTTON_TYPE_CLASSES.google} onClick={signInWithGoogle}>
            Google sign In
          </Button>
        </div>
      </form>
    </div>
  );
};
