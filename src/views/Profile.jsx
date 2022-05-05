import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Button,
  Typography,
} from "@mui/material";
import CustomInput from "../components/content/CustomInput";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import { binaryToBase64 } from "../utils/helper";
import axios from "axios";
import { setProfile } from "../redux/reducers/profileSlice";
import { toggleLoader } from "../redux/reducers/commonSlice";
import { toast } from "react-toastify";
import CustomtToaster from "../components/content/CustomtToaster";

const useStyles = makeStyles(() => ({
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
  alignHorizontal: {
    display: "flex",
    justifyContent: "center",
  },
}));

const Profile = () => {
  const { avatar, alignHorizontal } = useStyles();
  const dispatch = useDispatch();

  // redux state
  const auth = useSelector((state) => state.auth.user);
  const user = useSelector((state) => state.profile.user);

  // State variables
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [image, setImage] = useState("");

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

  /**
   * Update user name, address and profile picture
   */
  const updateProfile = async () => {
    try {
      dispatch(toggleLoader(true));
      const response = await axios.patch(`/client/${auth.id}`, {
        name,
        profileURL: image,
        address,
      });

      dispatch(toggleLoader(false));
      dispatch(setProfile(response.data));
      setImage("");
      toast.success("Profile updated successfully");
    } catch (error) {
      dispatch(toggleLoader(false));
      toast.error(error.response.data.message);
    }
  };

  /**
   * change name value when user gets changed in redux state
   */
  useEffect(() => {
    if (user !== undefined) {
      setName(user.name);
      setAddress(user.address);
    }
  }, [user]);

  return (
    <section className="profile">
      <Card>
        <CardHeader
          title={<Typography variant="h5">Profile Summary</Typography>}
        />
        <CardContent>
          <div className={avatar}>
            <Avatar src={image || user?.profileURL} />
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
          <CustomInput
            type="text"
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <CustomInput
            type="text"
            label="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </CardContent>
        <CardActions className={alignHorizontal}>
          <Button variant="contained" onClick={updateProfile}>
            Update
          </Button>
        </CardActions>
      </Card>
      <CustomtToaster />
    </section>
  );
};

export default Profile;
