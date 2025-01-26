export const REACT_APP_IS_PRODUCTION = process.env.NODE_ENV === "production";
const STAGING_HOSTS = [
  "fast-wash.netlify.app",
  "admin.dev.fastwash.africa",
  "dev.fastwash.africa",
];
export const REACT_APP_API_BASE_URL =
  REACT_APP_IS_PRODUCTION && !STAGING_HOSTS.includes(window.location.host)
    ? "https://api.fastwash.africa"
    : "https://api.dev.fastwash.africa";
