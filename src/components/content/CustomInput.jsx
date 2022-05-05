import { TextField } from "@mui/material";
import React from "react";

const CustomInput = ({
  label,
  type,
  value,
  onChange,
  error,
  helperText,
  inputProps,
}) => {
  return (
    <TextField
      fullWidth
      size="small"
      margin="normal"
      inputProps={inputProps}
      error={error}
      helperText={helperText}
      label={label}
      type={type}
      value={value}
      onChange={onChange}
    />
  );
};

export default CustomInput;
