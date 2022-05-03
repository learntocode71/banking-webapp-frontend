import { Typography } from "@mui/material";
import React from "react";

const NotFound = () => {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="h1" color="Highlight">
        404 Not Found
      </Typography>
    </div>
  );
};

export default NotFound;
