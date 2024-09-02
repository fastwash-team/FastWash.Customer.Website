import { createSelector } from "@reduxjs/toolkit";
const adminScheduleObject = (state = {}) => state.adminSchedule;

export const getAllAdminSchedule = createSelector(
  adminScheduleObject,
  (adminScheduleObject) => adminScheduleObject.schedules
);

export const getAdminScheduleLoadingState = createSelector(
  adminScheduleObject,
  (adminScheduleObject) => adminScheduleObject.loading
);

export const getAdminSchedulePaginationOptions = createSelector(
  adminScheduleObject,
  (adminScheduleObject) => adminScheduleObject.pageOptions
);

export const getAdminScheduleFilters = createSelector(
  adminScheduleObject,
  (adminScheduleObject) => {
    const {
      filterSchedule,
      filterLocation,
      priceRange,
      timeRange,
      selectedSchedule,
      filterDay,
    } = adminScheduleObject;
    return {
      filterSchedule,
      filterLocation,
      priceRange,
      timeRange,
      selectedSchedule,
      filterDay,
    };
  }
);
