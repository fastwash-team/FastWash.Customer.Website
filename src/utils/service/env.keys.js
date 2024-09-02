export const REACT_APP_IS_PRODUCTION = process.env.NODE_ENV === "production";
export const REACT_APP_API_BASE_URL = REACT_APP_IS_PRODUCTION
  ? "https://api.fastwash.africa"
  : "https://api.dev.fastwash.africa";
