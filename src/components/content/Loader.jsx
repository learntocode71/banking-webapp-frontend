import { Backdrop, CircularProgress } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";

const useStyles = makeStyles(() => ({
  loader: {
    width: "100%",
  },
}));

const Loader = ({ loading }) => {
  const { loader } = useStyles();
  return (
    <div className={loader}>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.modal + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default Loader;
