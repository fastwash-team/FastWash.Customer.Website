import moment from "moment";
import { WASH_PRICES } from ".";

export const formatMoney = (value) =>
  new Intl.NumberFormat("en-US", {}).format(value);

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
  const wholeWashes = Math.floor(washCount / 2);
  const remainder = washCount % 2;
  // if (washCount === 1) price = WASH_PRICES.WASH;
  // console.log({ wholeWashes, remainder });
  // if (wholeWashes && !remainder) price = WASH_PRICES.EXTRA_WASH * washCount;
  if (wholeWashes && !remainder) price = price + WASH_PRICES.EXTRA_WASH;
  // console.log("1", price);
  if (wholeWashes && remainder) price = price + WASH_PRICES.WASH;
  // console.log("2", price);
  if (washCount % 2) price = price + WASH_PRICES.WASH;
  if (!(washCount % 2)) price = price + WASH_PRICES.WASH;
  // console.log("3", price);
  return price;
};

export const errorHandler = (error) => {
  console.log("response", error.response);
  if (error?.response?.data?.statusMessage)
    return error.response.data.statusMessage;
  if (error?.response?.status === 404) {
    return "Resource not found. Please contact support!";
  }
  if (error?.message) return error.message;
  return "Something went wrong. Try again!";
};

export const setFWUserToken = (userObj) => {
  localStorage.setItem("fw_user_token", userObj.access_token);
};

export const getFWUserToken = () => {
  return localStorage.getItem("fw_user_token");
};

export const logout = () => {
  localStorage.removeItem("user");
};
