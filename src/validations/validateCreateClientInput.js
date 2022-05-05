import validator from "validator";
import { isEmpty } from "../utils/helper";

const validateCreateClientInput = (data) => {
  const errors = {};

  const { name, email, password } = data;

  if (validator.isEmpty(name)) {
    errors.name = "Name is required field.";
  }

  if (validator.isEmpty(email)) {
    errors.email = "Email is required field.";
  }

  if (!validator.isLength(password, { min: 6 })) {
    errors.password = "Password should have at least 6 characters";
  }

  if (validator.isEmpty(password)) {
    errors.password = "Password is required field.";
  }

  return {
    errors,
    isInvalid: !isEmpty(errors),
  };
};

export default validateCreateClientInput;
