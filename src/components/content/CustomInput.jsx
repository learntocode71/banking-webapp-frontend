import { TextField } from "@mui/material";
import React from "react";

const CustomInput = ({ label, type, value, onChange, error, helperText }) => {
  return (
    <TextField
      fullWidth
      size="small"
      margin="normal"
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
