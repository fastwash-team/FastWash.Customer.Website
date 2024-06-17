import {
  put,
  takeEvery,
  call,
  select,
  takeLatest,
} from "@redux-saga/core/effects";
import { APISERVICES } from "../../utils/service";
import { getFWAdminToken } from "../../utils/functions";
import { fetch_admin_schedules } from "./reducer";

const adminToken = getFWAdminToken();

function* fetchAdminSchedules() {
  try {
    yield call(
      APISERVICES.getData,
      `/api/WashOrderPlans?pageIndex=0&pageSize=5`,
      { Authorization: `Bearer ${adminToken}` }
    );
  } catch (error) {
    console.log("caught error in fetch admin schedules", error);
  }
}

function* adminScheduleSagas() {
  yield takeEvery(fetch_admin_schedules.type, fetchAdminSchedules);
}

export default adminScheduleSagas;
