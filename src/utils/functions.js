export const isUserLoggedIn = (isAdmin = false) => {
  if (isAdmin) return localStorage.getItem("fw_admin_token");
  return localStorage.getItem("fw_user_token");
};
