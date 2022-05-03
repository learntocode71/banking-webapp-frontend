import { configureStore } from "@reduxjs/toolkit";
import commonReducer from "./reducers/commonSlice";
import authReducer from "./reducers/authSlice";
import profileReducer from "./reducers/profileSlice";

export default configureStore({
  reducer: {
    common: commonReducer,
    auth: authReducer,
    profile: profileReducer,
  },
});
