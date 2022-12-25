import "./sign-up-form.styles.scss";
import { useState } from "react";
import { FormInput } from "../form-input/form-input.component";
import { BUTTON_TYPE_CLASSES, Button } from "../button/button.component";
import { useDispatch } from "react-redux";
import { signUpWithEmailStart } from "../../store/user/user.action";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: ""
};

export const SignUpForm = () => {
  const dispatch = useDispatch();
  const [formFields, setFormFields] = useState(defaultFormFields);

  const { displayName, email, password, confirmPassword } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Password doesn't match");
      return;
    }

    try {
      dispatch(signUpWithEmailStart(email, password, displayName));
      resetFormFields();
    } catch (error: any) {
      if (error.code === "auth/email-already-in-use") {
        alert("cannot create user, email already in use");
      }
      console.log("🚀 ~ file: sign-up-form.component.jsx ~ line 27 ~ handleSubmit ~ error", error);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="sign-up-container">
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label={"Display Name"}
          value={displayName}
          type={"text"}
          required
          onChange={handleChange}
          name={"displayName"}
        />

        <FormInput
          label="Email"
          value={email}
          type="email"
          required
          onChange={(e) => handleChange}
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

        <FormInput
          label="Confirm Password"
          value={confirmPassword}
          type="password"
          required
          onChange={handleChange}
          name={"confirmPassword"}
        />

        <Button buttonType={BUTTON_TYPE_CLASSES.base} type="submit">
          Sign Up
        </Button>
      </form>
    </div>
  );
};
