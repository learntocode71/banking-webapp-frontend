import validator from "validator";
import { isEmpty } from "../utils/helper";

const validateTransferMoneyInput = (data) => {
  const errors = {};

  const { email, amount } = data;

  if (validator.isEmpty(email)) {
    errors.email = "Email is required field.";
  }

  if (+amount === 0) {
    errors.amount = "Amount should be greater than 0";
  }

  if (isEmpty(amount)) {
    errors.amount = "Amount is required field.";
  }

  return {
    errors,
    isInvalid: !isEmpty(errors),
  };
};

export default validateTransferMoneyInput;
