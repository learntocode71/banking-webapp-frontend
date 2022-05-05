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
import validateTransferMoneyInput from "../validations/validateTransferMoneyInput";

const TransferMoney = () => {
  // State Variables
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState(0);
  const [errors, setErrors] = useState({});

  // Redux state
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile.user);

  const transferMoney = async (e) => {
    e.preventDefault();

    const { errors, isInvalid } = validateTransferMoneyInput({ email, amount });

    if (isInvalid) {
      setErrors(errors);
      return;
    } else {
      setErrors({});
    }

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
            error={errors.email !== undefined}
            helperText={errors.email}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <CustomInput
            inputProps={{ min: 0 }}
            type="number"
            label="Amount"
            error={errors.amount !== undefined}
            helperText={errors.amount}
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
