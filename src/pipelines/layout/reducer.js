import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  backgroundLoader: false,
};

export const layoutReducer = createSlice({
  name: "layout",
  initialState,
  reducers: {
    activate_background_loader: (state) => {
      state.backgroundLoader = true;
    },
    deactivate_background_loader: (state) => {
      state.backgroundLoader = false;
    },
  },
});

export const { activate_background_loader, deactivate_background_loader } =
  layoutReducer.actions;

export default layoutReducer.reducer;
