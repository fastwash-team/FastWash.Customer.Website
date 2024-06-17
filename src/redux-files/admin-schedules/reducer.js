import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  schedules: [],
  pageOptions: { page: 0, totalPages: 0, pageSize: 0, defaultPageSize: 5 },
};

export const adminScheduleReducerSlice = createSlice({
  name: "admin-schedule",
  initialState,
  reducers: {
    fetch_admin_schedules: (state) => {
      state.loading = true;
    },
    fetch_admin_schedules_success: (state) => {
      state.loading = false;
    },
    fetch_admin_schedules_failure: (state) => {
      state.loading = false;
    },
  },
});

export const { fetch_admin_schedules, fetch_admin_schedules_success } =
  adminScheduleReducerSlice.actions;
export default adminScheduleReducerSlice.reducer;
