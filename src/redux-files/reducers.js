import { combineReducers } from "redux";
import { adminScheduleReducerSlice } from "./admin-schedules/reducer";

const rootReducers = combineReducers({
  adminSchedule: adminScheduleReducerSlice,
});

export default rootReducers;
