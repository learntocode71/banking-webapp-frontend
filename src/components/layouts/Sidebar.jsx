import {
  Avatar,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PaidIcon from "@mui/icons-material/Paid";
import LogoutIcon from "@mui/icons-material/Logout";
import CloseIcon from "@mui/icons-material/Close";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleDrawer, toggleLoader } from "../../redux/reducers/commonSlice";
import { NavLink, useNavigate } from "react-router-dom";
import { setUser } from "../../redux/reducers/authSlice";
import axios from "axios";
import { setProfile } from "../../redux/reducers/profileSlice";
import { toast } from "react-toastify";

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
  closeBtn: {
    display: "flex",
    justifyContent: "end",
  },
}));

const Sidebar = () => {
  const { avatar, closeBtn } = useStyles();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const drawer = useSelector((state) => state.common.drawer);
  const auth = useSelector((state) => state.auth.user);
  const user = useSelector((state) => state.profile.user);

  const logoutUser = () => {
    delete axios.defaults.headers.common["Authorization"];
    closeDrawer();
    localStorage.clear();
    dispatch(setUser({}));
    navigate("/login");
  };

  const closeDrawer = () => dispatch(toggleDrawer(false));

  /**
   * Get user profile on component mount
   */
  const getProfile = async () => {
    try {
      dispatch(toggleLoader(true));
      const response = await axios.get(`/client/${auth.id}`);
      dispatch(setProfile(response.data));
      dispatch(toggleLoader(false));
    } catch (error) {
      dispatch(toggleLoader(false));
      toast.error(error.response.data.message);
    }
  };

  // componentDidMount()
  useEffect(() => {
    getProfile();
  }, []);

  return (
    <Drawer open={drawer} transitionDuration={300} onClose={closeDrawer}>
      <Box sx={{ width: 250 }} role="presentation">
        <div className={closeBtn}>
          <IconButton onClick={closeDrawer}>
            <CloseIcon />
          </IconButton>
        </div>
        <Typography variant="h5" style={{ textAlign: "center" }}>
          Banking Web App
        </Typography>
        <div className={avatar}>
          <Avatar src={user?.profileURL} />
          <Typography>{user?.name}</Typography>
          <Typography variant="subtitle">{user?.email}</Typography>
        </div>
        <List>
          <ListItem component={NavLink} to="/" onClick={closeDrawer}>
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText>Profile</ListItemText>
          </ListItem>

          <ListItem
            component={NavLink}
            to="/transfer-money"
            onClick={closeDrawer}
          >
            <ListItemIcon>
              <PaidIcon />
            </ListItemIcon>
            <ListItemText>Transfer Money</ListItemText>
          </ListItem>

          {user?.isAdmin && (
            <ListItem component={NavLink} to="/clients" onClick={closeDrawer}>
              <ListItemIcon>
                <PeopleAltIcon />
              </ListItemIcon>
              <ListItemText>Clients</ListItemText>
            </ListItem>
          )}

          <ListItem
            component={NavLink}
            to="/change-password"
            onClick={closeDrawer}
          >
            <ListItemIcon>
              <PaidIcon />
            </ListItemIcon>
            <ListItemText>Change Password</ListItemText>
          </ListItem>

          <ListItem button onClick={logoutUser}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText>Logout</ListItemText>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
