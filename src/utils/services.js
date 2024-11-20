export const REACT_APP_IS_PRODUCTION = process.env.NODE_ENV === "production";
const STAGING_HOSTS = ["fast-wash.netlify.app", "dev.fastwash.africa"];
export const REACT_APP_API_BASE_URL =
  REACT_APP_IS_PRODUCTION && !STAGING_HOSTS.includes(window.location.host)
    ? process.env.REACT_APP_PROD_API_BASE_URL
    : process.env.REACT_APP_API_BASE_URL;
