import moment from "moment";
import { WASH_PRICES } from "./constants";
import axios from "axios";
import { REACT_APP_API_BASE_URL } from "./services";

export const isUserLoggedIn = (isAdmin = false) => {
  if (isAdmin) return localStorage.getItem("fw_admin_token");
  return localStorage.getItem("fw_user_token");
};

export const logUserOut = () => {
  const lastRoute = window.location.pathname;
  if (lastRoute === "/login" || lastRoute === "/admin/login") return;
  localStorage.removeItem("fw_user_token");
  return window.location.replace("/");
};

export const reLoginUser = async () => {
  try {
    let token = localStorage.getItem("fw_user_token");
    if (!token && localStorage.getItem("fw_admin_token"))
      token = localStorage.getItem("fw_admin_token");
    console.log("reauthing a user", token);
    if (!token) return logUserOut();
    const arrayToken = token.split(".");
    const { Name: email } = JSON.parse(atob(arrayToken[1]));
    const {
      data: { responseObject: authOTP },
    } = await axios.post(
      `${REACT_APP_API_BASE_URL}/api/Authentication/login/initiate`,
      { userId: email, isSystemInitiated: true },
    );
    const {
      data: { responseObject },
    } = await axios.put(
      `${REACT_APP_API_BASE_URL}/api/Authentication/login/complete`,
      { passCode: authOTP },
    );
    const claims = getTokenClaims(responseObject.access_token);
    if (claims?.ExternalUser) setFWUserToken(responseObject);
    window.location.reload();
  } catch (error) {}
};

export const formatMoney = (value) =>
  new Intl.NumberFormat("en-US", {}).format(value);

export const calculateWashPrice = (washCount) => {
  let price = 0;
  // 1 wash = 3500, 2 washes = 6100, 3 washes = 2 washes + 1 wash
  const washCountIsEven = washCount % 2 === 0;
  if (washCount === 1) {
    price = WASH_PRICES.WASH;
  } else if (washCount === 2) {
    price = WASH_PRICES.TWO_WASHES;
  } else if (washCount > 2) {
    const absoluteRounds = Math.floor(washCount / 2); // how many absolute rounds rounds
    price = absoluteRounds * WASH_PRICES.TWO_WASHES;
    if (!washCountIsEven) {
      price += WASH_PRICES.WASH;
    }
  }
  return price;
  // previous code
  //for (let count = 1; count <= washCount; count++) {
  //  if (count % 2) price += WASH_PRICES.WASH;
  //  else price += WASH_PRICES.EXTRA_WASH;
  //}
};

export const errorHandler = (error) => {
  if (error?.response?.data?.statusMessage)
    return error.response.data.statusMessage;
  if (error?.response?.status === 404) {
    return "Resource not found. Please contact support!";
  }
  if (error?.response?.status === 401) return reLoginUser();
  if (error?.message) return error.message;
  return "Something went wrong. Try again!";
};

export function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

export const getTokenClaims = (token) => {
  if (!token) return logUserOut();
  const arrayToken = token.split(".");
  const tokenPayload = JSON.parse(atob(arrayToken[1]));
  return tokenPayload;
};

const checkTokenExpiry = (token) => {
  if (isUserLoggedIn()) {
    if (!token) return logUserOut();
    const { exp } = getTokenClaims(token);
    const diff = moment.unix(exp).diff(moment(), "minutes");
    if (diff < 15) return reLoginUser();
  }
};

export const setFWUserToken = (userObj) =>
  localStorage.setItem("fw_user_token", userObj.access_token);

export const getFWUserToken = () => {
  const token = localStorage.getItem("fw_user_token");
  checkTokenExpiry(token);
  return token;
};

export const getWashServiceType = (washType) => {
  if (washType === "PreScheduledWash") return "Pre Scheduled";
  if (washType === "Classic" || washType === "ClassicWash") return "Classic";
};
