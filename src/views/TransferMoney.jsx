import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import CustomInput from "../components/content/CustomInput";
import CustomtToaster from "../components/content/CustomtToaster";
import { toggleLoader } from "../redux/reducers/commonSlice";
import { setProfile } from "../redux/reducers/profileSlice";

const TransferMoney = () => {
  // State Variables
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState(0);

  // Redux state
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile.user);

  const transferMoney = async (e) => {
    e.preventDefault();

    try {
      dispatch(toggleLoader(true));
      const response = await axios.patch("/client/transfer-money", {
        email,
        amount,
      });
      dispatch(setProfile(response.data));
      setEmail("");
      setAmount(0);
      toast.success("Amount transferred successfully");
      dispatch(toggleLoader(false));
    } catch (error) {
      dispatch(toggleLoader(false));
      toast.error(error.response.data.message);
    }
  };

  return (
    <Card>
      <CardHeader
        title={<Typography variant="h5">Transfer Money</Typography>}
        subheader={
          <Typography variant="subheader">
            Available Balance : {profile.balance}
          </Typography>
        }
      />
      <CardContent>
        <form onSubmit={transferMoney}>
          <CustomInput
            type="email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <CustomInput
            type="number"
            label="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <Button variant="contained" type="submit">
            Send
          </Button>
        </form>

        {/* Toaster component */}
        <CustomtToaster />
      </CardContent>
    </Card>
  );
};

export default TransferMoney;
