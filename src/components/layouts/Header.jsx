import {
  AppBar,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useDispatch } from "react-redux";
import { toggleDrawer } from "../../redux/reducers/commonSlice";
import React from "react";

const Header = () => {
  const dispatch = useDispatch();

  const openDrawer = () => {
    dispatch(toggleDrawer(true));
  };

  return (
    <AppBar position="sticky">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={openDrawer}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Banking Web App
        </Typography>
        <Menu>
          <MenuItem>Login</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
