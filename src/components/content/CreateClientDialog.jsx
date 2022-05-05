import {
  Avatar,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import CustomInput from "./CustomInput";
import CloseIcon from "@mui/icons-material/Close";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import { binaryToBase64 } from "../../utils/helper";
import validateCreateClientInput from "../../validations/validateCreateClientInput";
import { toast } from "react-toastify";
import CustomtToaster from "./CustomtToaster";
import { toggleLoader } from "../../redux/reducers/commonSlice";
import { useDispatch } from "react-redux";

const useStyles = makeStyles(() => ({
  closeBtn: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  avatar: {
    width: "100%",
    height: "160px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    "& .MuiAvatar-root": {
      width: "80px !important",
      height: "80px",
      marginBottom: "10px",
    },
  },
}));

const CreateClientDialog = ({ open, client, onClose }) => {
  const { closeBtn, avatar } = useStyles();
  const dispatch = useDispatch();

  //  State Variables
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [image, setImage] = useState("");
  const [edit, setEdit] = useState(false);
  const [errors, setErrors] = useState({});

  /**
   * Create new client with given information
   */
  const createClient = async (e) => {
    e.preventDefault();

    const { errors, isInvalid } = validateCreateClientInput({
      name,
      email,
      password,
    });

    if (isInvalid) {
      setErrors(errors);
      return;
    } else {
      setErrors({});
    }

    try {
      dispatch(toggleLoader(true));
      const response = await axios.post("/client", {
        name,
        email,
        password,
      });
      if (response) cleanup(null, response.data);
    } catch (error) {
      dispatch(toggleLoader(false));
      toast.error(error.response.data.message);
    }
  };

  /**
   * Update existing client with new information
   */
  const updateClient = async (e) => {
    e.preventDefault();

    try {
      dispatch(toggleLoader(true));
      const response = await axios.patch(`/client/${client._id}`, {
        name,
        address,
        profileURL: image,
      });

      if (response) cleanup(response.data, null);
    } catch (error) {
      dispatch(toggleLoader(false));
      toast.error(error.response.data.message);
    }
  };

  const cleanup = (updatedClient, newClient) => {
    dispatch(toggleLoader(false));
    setName("");
    setEmail("");
    setPassword("");
    setImage("");
    setEdit(false);
    onClose(updatedClient, newClient);
  };

  /**
   * convert image into base64
   * set local state variable image
   */
  const onChangeHandler = async (e) => {
    if (e.target.files[0]?.size > 3145728) {
      toast.error("File size should be less than 3mb");
      return;
    }
    const response = await binaryToBase64(e.target.files[0]);
    setImage(response);
  };

  useEffect(() => {
    if (Object.keys(client).length > 0) {
      setName(client.name);
      setAddress(client.address);
      setEdit(true);
    }
  }, [client]);

  return (
    <Dialog open={open} onClose={() => cleanup(null, null)}>
      <DialogTitle>
        <div className={closeBtn}>
          <span>{edit ? "Update" : "Create"} Client</span>
          <IconButton onClick={() => cleanup(null, null)}>
            <CloseIcon />
          </IconButton>
        </div>
      </DialogTitle>
      <DialogContent>
        <form onSubmit={(e) => (edit ? updateClient(e) : createClient(e))}>
          <CustomInput
            type="text"
            label="Name"
            error={errors.name}
            helperText={errors.name}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          {edit ? (
            <>
              <CustomInput
                type="text"
                label="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <div className={avatar}>
                <Avatar src={image || client?.profileURL} />
                <label htmlFor="avatar" style={{ cursor: "pointer" }}>
                  <Typography>Change Picture</Typography>
                </label>
                <input
                  id="avatar"
                  type="file"
                  onChange={onChangeHandler}
                  style={{ display: "none" }}
                />
              </div>
            </>
          ) : (
            <>
              <CustomInput
                type="email"
                label="Email"
                error={errors.email !== undefined}
                helperText={errors.email}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <CustomInput
                type="password"
                label="Password"
                error={errors.password !== undefined}
                helperText={errors.password}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </>
          )}
          <Button
            style={{ marginTop: "10px" }}
            type="submit"
            variant="contained"
            fullWidth
          >
            {edit ? "Update" : "Create"}
          </Button>
          <CustomtToaster />
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateClientDialog;
