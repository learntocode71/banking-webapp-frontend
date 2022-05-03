import validator from "validator";
import { isEmpty } from "../utils/helper";

const validateLoginInputs = (data) => {
  const errors = {};

  const { email, password } = data;

  if (validator.isEmpty(email)) {
    errors.email = "Email is required field.";
  }

  if (validator.isEmpty(password)) {
    errors.password = "Password is required field.";
  }

  return {
    errors,
    isInvalid: !isEmpty(errors),
  };
};

export default validateLoginInputs;
