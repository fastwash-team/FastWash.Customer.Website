import { WASH_PRICES } from "./constants";

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

export const formatMoney = (value) =>
  new Intl.NumberFormat("en-US", {}).format(value);

export const calculateWashPrice = (washCount) => {
  let price = 0;
  // 1 wash = 3000, 2 washes = 5600
  for (let count = 1; count <= washCount; count++) {
    if (count % 2) price += WASH_PRICES.WASH;
    else price += WASH_PRICES.EXTRA_WASH;
  }
  return price;
};

export const errorHandler = (error) => {
  if (error?.response?.data?.statusMessage)
    return error.response.data.statusMessage;
  if (error?.response?.status === 404) {
    return "Resource not found. Please contact support!";
  }
  if (error?.response?.status === 401) {
    // reLoginUser();
  }
  if (error?.message) return error.message;
  return "Something went wrong. Try again!";
};

export function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}
