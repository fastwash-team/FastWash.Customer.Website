import { createSelector } from "@reduxjs/toolkit";
const schedulePickupObject = (state = {}) => state.schedulePickup;

export const getSchedulePickupInformation = createSelector(
  schedulePickupObject,
  (schedulePickupObject) => schedulePickupObject.washDetails
);
