import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import CustomInput from "../components/content/CustomInput";
import jwt_decode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/reducers/authSlice";
import validateLoginInputs from "../validations/validateLoginInputs";
import { toast } from "react-toastify";
import CustomtToaster from "../components/content/CustomtToaster";
import { toggleLoader } from "../redux/reducers/commonSlice";
import Loader from "../components/content/Loader";

const Login = () => {
  // Redux State
  const dispatch = useDispatch();
  const loader = useSelector((state) => state.common.loader);

  // State variables
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  /**
   * Login user by using email and password
   * set user in redux state
   */
  const loginUser = async (e) => {
    e.preventDefault();

    const { errors, isInvalid } = validateLoginInputs({ email, password });

    if (isInvalid) {
      setErrors(errors);
      return;
    } else {
      setErrors({});
    }

    try {
      dispatch(toggleLoader(true));
      const response = await axios.post("/auth/login", { email, password });

      if (response?.data?.token) {
        axios.defaults.headers.common["Authorization"] =
          "Bearer " + response.data.token;
        localStorage.setItem("accessToken", response.data.token);
        try {
          const user = jwt_decode(response.data.token);
          dispatch(setUser(user));
          dispatch(toggleLoader(false));
        } catch (error) {
          toast.error(error.message);
        }
      }
    } catch (error) {
      dispatch(toggleLoader(false));
      toast.error(error.response.data.message);
    }
  };

  return (
    <div style={{ background: "#ebf8f9", height: "100vh" }}>
      <Container>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          style={{ height: "90vh" }}
        >
          <Grid item>
            <Card>
              <CardHeader title="Login" />
              <CardContent>
                <form onSubmit={loginUser}>
                  <CustomInput
                    type="email"
                    label="Email"
                    error={errors.email !== undefined}
                    helperText={errors.email}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <CustomInput
                    type="Password"
                    label="Password"
                    error={errors.password !== undefined}
                    helperText={errors.password}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Button type="submit" fullWidth variant="contained">
                    Login
                  </Button>
                </form>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <CustomtToaster />
      </Container>
      <Loader loading={loader} />
    </div>
  );
};

export default Login;
