import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  schedules: [],
  pageOptions: { page: 0, totalPages: 0, pageSize: 0, defaultPageSize: 5 },
  filters: {},
  filterDay: "All",
  filterSchedule: "All",
  filterLocation: "All",
  priceRange: { min: 0, max: 0 },
  timeRange: { startTime: "", endTime: "" },
  selectedSchedule: null,
};

export const adminScheduleReducerSlice = createSlice({
  name: "admin-schedule",
  initialState,
  reducers: {
    fetch_admin_schedules: (state) => {
      state.loading = true;
    },
    fetch_admin_schedules_success: (state, { payload }) => {
      const { data: schedules, pageCount, pageSize, pageIndex } = payload;
      state.loading = false;
      state.schedules = [...schedules];
      state.pageOptions = {
        ...state.pageOptions,
        page: pageIndex,
        totalPages: pageCount + 1,
        pageSize,
      };
    },
    fetch_admin_schedules_failure: (state) => {
      state.loading = false;
    },
    set_admin_schedules_pagination: (state, { payload }) => {
      state.pageOptions = { ...state.pageOptions, ...payload };
    },
    set_admin_schedules_filter: (state, { payload }) => {
      state[payload.id] = payload.value;
    },
  },
});

export const {
  fetch_admin_schedules,
  fetch_admin_schedules_success,
  set_admin_schedules_filter,
  set_admin_schedules_pagination,
} = adminScheduleReducerSlice.actions;
export default adminScheduleReducerSlice.reducer;
