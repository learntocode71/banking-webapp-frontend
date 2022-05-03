import { Container, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Loader from "../content/Loader";

const useStyles = makeStyles(() => ({
  "@global": {
    "*::-webkit-scrollbar": {
      width: "0.6em",
      height: "0.6em",
    },
    "*::-webkit-scrollbar-track": {
      "-webkit-box-shadow": "inset 0 0 6px rgba(0, 0,0,0.00)",
    },
    "*::-webkit-scrollbar-thumb": {
      cursor: "pointer",
      borderRadius: "3px",
      backgroundColor: "rgba(0,0,0,0.2)",
      transform: "translateX(0px)",
    },
  },
}));

const Layout = () => {
  const classes = useStyles();

  const loader = useSelector((state) => state.common.loader);

  return (
    <div style={{ background: "#ebf8f9", height: "100vh" }}>
      <Sidebar />

      <Header />
      <Container style={{ marginTop: "20px" }}>
        <Grid container justifyContent="center">
          <Grid item xs={12} lg={10}>
            <Outlet />
          </Grid>
        </Grid>
      </Container>
      <Loader loading={loader} />
    </div>
  );
};

export default Layout;
