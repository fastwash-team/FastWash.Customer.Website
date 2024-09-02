import { put, takeEvery, call, select } from "@redux-saga/core/effects";
import { APISERVICES } from "../../utils/service";
import { getFWAdminToken } from "../../utils/functions";
import {
  fetch_admin_schedules,
  fetch_admin_schedules_success,
} from "./reducer";
import { toast } from "react-toastify";
import {
  getAdminScheduleFilters,
  getAdminSchedulePaginationOptions,
} from "./selector";
import moment from "moment";

const adminToken = getFWAdminToken();

function* fetchAdminSchedules() {
  try {
    const paginationOptions = yield select(getAdminSchedulePaginationOptions);
    const filterOptions = yield select(getAdminScheduleFilters);
    let url = `/api/WashOrderPlans?pageIndex=${paginationOptions.page}&pageSize=${paginationOptions.defaultPageSize}`;
    const { filterLocation, filterSchedule, priceRange, timeRange } =
      filterOptions;
    const hasFilter =
      filterLocation !== "All" ||
      filterSchedule !== "All" ||
      timeRange.startTime ||
      timeRange.endTime ||
      priceRange.max;
    if (hasFilter) {
      url = `/api/WashOrderPlans/filter?pageIndex=${paginationOptions.page}&pageSize=${paginationOptions.defaultPageSize}`;
      if (filterLocation !== "All") url = url + `&location=${filterLocation}`;
      if (filterSchedule !== "All") {
        const scheduleEnum =
          filterSchedule === "Pre-Schedule"
            ? 1
            : filterSchedule === "Classic"
            ? 2
            : null;
        url = url + `&serviceType=${scheduleEnum}`;
      }
      if (priceRange.max)
        url =
          url +
          `&fromLogisticsAmount=${priceRange.min}&toLogisticsAmount=${priceRange.max}`;
      if (timeRange.startTime)
        url =
          url +
          `&scheduleStartDate=${
            moment(timeRange.startTime).format().split("T")[0]
          }`;
      if (timeRange.endTime)
        url =
          url +
          `&scheduleEndDate=${
            moment(timeRange.endTime).endOf("day").format().split("T")[0]
          }`;
    }
    const { responseObject } = yield call(APISERVICES.getData, url, {
      Authorization: `Bearer ${adminToken}`,
    });
    yield put(fetch_admin_schedules_success({ ...responseObject }));
  } catch (error) {
    console.log("error fetching admin schedules", error);
    toast.error("Something went wrong with fetching admin schedules!");
  }
}

function* adminScheduleSagas() {
  yield takeEvery(fetch_admin_schedules.type, fetchAdminSchedules);
}

export default adminScheduleSagas;
