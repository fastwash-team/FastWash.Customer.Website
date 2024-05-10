import moment from "moment";
import { WASH_PRICES } from ".";

export const formatMoney = (value) =>
  new Intl.NumberFormat("en-US", {}).format(value);

export const getWashServiceType = (washType) => {
  if (washType === "PreScheduledWash") return "Pre Scheduled";
  if (washType === "Classic" || washType === "ClassicWash") return "Classic";
};

export const getPickUpDay = () => {
  return [1, 2, 3, 4, 5, 6, 7].map((el) => {
    if (el === 1) return "Today";
    if (el === 2) return "Tomorrow";
    return moment().add(el, "days").format("ddd, Do MMM");
  });
};

export const getPickupWindow = (pickupday) => {
  const hour = moment().format("kk");
  let startTime = 9;
  if (pickupday.toLowerCase() === "today" && Number(hour) > 9)
    startTime = Number(hour) + 1;
  const times = [];
  for (let i = startTime; i < 15; i++) {
    times.push(`${i}:00 - ${i + 1}:00`);
  }
  return times;
};

export const getScheduleTime = (hourTime) => {
  const hour = moment().hours();
  const minutes = moment().minutes();
  console.log({ minutes });
  console.log({ hour });
  console.log({ hourTime });
  let startHour = 7;
  let startMin = 30;

  if (!hourTime) {
    if (hour > startHour) startHour = hour + 1;
    if (minutes < startMin) {
      startHour = hour;
    }
  }
  console.log({ startHour, startMin });

  // if (!hourTime && Number(hour) >= startTime) startTime = Number(hour) + 1;
  // // if (hourTime) {
  // // }
  // const times = [];
  // for (let i = startHour; i < 17; i++) {
  //   times.push(`${i}:00 - ${i + 1}:00`);
  // }
  // return times;
};

export const calculateWashPrice = (washCount: number) => {
  let price = 0;
  // 1 wash = 3000, 2 washes = 5600
  for (let count = 1; count <= washCount; count++) {
    if (count % 2) price += WASH_PRICES.WASH;
    else price += WASH_PRICES.EXTRA_WASH;
  }
  return price;
};

export const errorHandler = (error) => {
  console.log("response", error.response);
  if (error?.response?.data?.statusMessage)
    return error.response.data.statusMessage;
  if (error?.response?.status === 404) {
    return "Resource not found. Please contact support!";
  }
  if (error?.response?.status === 401) {
    logout();
  }
  if (error?.message) return error.message;
  return "Something went wrong. Try again!";
};

const redirectToRouteBeforeLogout = () => {
  const lastRoute = localStorage.getItem("rerouteTo");
  if (!lastRoute) return;
  window.location.replace(lastRoute);
  localStorage.removeItem("rerouteTo");
};

export const setFWUserToken = (userObj) => {
  localStorage.setItem("fw_user_token", userObj.access_token);
  redirectToRouteBeforeLogout();
};

export const setFWAdminToken = (userObj) => {
  localStorage.setItem("fw_admin_token", userObj.access_token);
  redirectToRouteBeforeLogout();
};

export const getFWUserToken = () => {
  return localStorage.getItem("fw_user_token");
};

export const getFWAdminToken = () => {
  return localStorage.getItem("fw_admin_token");
};

export const logout = () => {
  const lastRoute = window.location.pathname;
  localStorage.setItem("rerouteTo", lastRoute);
  localStorage.removeItem("fw_user_token");
  localStorage.removeItem("fw_admin_token");
  if (window.location.pathname.startsWith("/admin"))
    return window.location.replace("/admin/login");
  return window.location.replace("/login");
};

export const isUserLoggedIn = () => {
  return localStorage.getItem("fw_user_token");
};

export const getTokenClaims = (token) => {
  const arrayToken = token.split(".");
  const tokenPayload = JSON.parse(atob(arrayToken[1]));
  console.log({ tokenPayload });
};

export const timeRangeClassic = [
  "07:30",
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
];
