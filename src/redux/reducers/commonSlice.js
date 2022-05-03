import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  drawer: false,
  loader: false,
};

export const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    toggleDrawer: (state, { payload }) => {
      state.drawer = payload;
    },
    toggleLoader: (state, { payload }) => {
      state.loader = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { toggleDrawer, toggleLoader } = commonSlice.actions;

export default commonSlice.reducer;
