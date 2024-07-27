import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  washDetails: JSON.parse(sessionStorage.getItem("currentWashOrder")) || {},
};

export const schedulePickupReducerSlice = createSlice({
  name: "schedulePickup",
  initialState,
  reducers: {
    save_wash_details: (state, { payload }) => {
      const washOrder = { ...state.washDetails, ...payload };
      // sessionStorage.setItem("currentWashOrder", JSON.stringify(washOrder));
      state.washDetails = { ...washOrder };
    },
  },
});

export const { save_wash_details } = schedulePickupReducerSlice.actions;
export default schedulePickupReducerSlice.reducer;
