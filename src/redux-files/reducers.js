import { combineReducers } from "redux";
import adminScheduleReducerSlice from "./admin-schedules/reducer";
import schedulePickupReducerSlice from "./schedule-pickup/reducer";

const rootReducers = combineReducers({
  adminSchedule: adminScheduleReducerSlice,
  schedulePickup: schedulePickupReducerSlice,
});

export default rootReducers;
