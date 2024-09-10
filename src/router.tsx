import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "./pages/landing";
import { SchedulePickup } from "./pages/schedule-pickup";
import { Layout } from "./pages/layout";
import { Login } from "./pages/login";
import { Signup } from "./pages/signup";
import { VerifyAuth } from "./pages/verify-auth";
import { Dashboard } from "./pages/dashboard";
import { Requests } from "./pages/requests";
import { Payments } from "./pages/payments";
import { RequestDetailPage } from "./components/requests/details";
import { AdminDashboard } from "./pages/admin-dashboard";
import { OrderCreateSuccess } from "./pages/pay-success";
import "rc-tooltip/assets/bootstrap_white.css";
// import { useClearCache } from "react-clear-cache-v2";
import { TermsAndConditions } from "./pages/terms-conditions";
import { FAQs } from "./pages/faqs";
// import { useClearCache } from "react-clear-cache-v2";
export const ADMIN_FASTWASH = [
  "admin.fastwash.africa",
  "admin.dev.fastwash.africa",
];

const AppRoutes = () => {
  const domain = window.location.host;
  const isDomainAdmin = ADMIN_FASTWASH.includes(domain);
  // const { isLatestVersion, emptyCacheStorage } = useClearCache();

  // useEffect(() => {
  //   if (!isLatestVersion) emptyCacheStorage();
  // }, []);

  const AdminRoutes = () => (
    <Routes>
      <Route path={"/"} element={<Layout />}>
        <Route index element={<AdminDashboard />} />
        <Route path='/login' element={<Login isAdmin={true} />} />
        <Route path='/dashboard' element={<AdminDashboard />} />
        <Route path='/faqs' element={<FAQs />} />
        <Route path='/verify-auth' element={<VerifyAuth />} />
        <Route path='/terms' element={<TermsAndConditions />} />
      </Route>
    </Routes>
  );

  const CustomerRoutes = () => (
    <Routes>
      <Route path={"/"} element={<Layout />}>
        <Route index element={<Landing />} />
        <Route path='/schedule-pickup/:id' element={<SchedulePickup />} />
        <Route path='/order/success' element={<OrderCreateSuccess />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Signup />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/requests' element={<Requests />} />
        <Route path='/requests/:id' element={<RequestDetailPage />} />
        <Route path='/payments' element={<Payments />} />
        {/* <Route path='/admin/login' element={<Login isAdmin={true} />} />
        <Route path='/admin/dashboard' element={<AdminDashboard />} /> */}
        <Route path='/faqs' element={<FAQs />} />
        <Route path='/verify-auth' element={<VerifyAuth />} />
        <Route path='/terms' element={<TermsAndConditions />} />
      </Route>
    </Routes>
  );

  return (
    <Router>
      {/* <Routes> */}
      {/* <AdminRoutes /> */}
      {/* <CustomerRoutes /> */}
      {isDomainAdmin ? <AdminRoutes /> : <CustomerRoutes />}
      {/* <Route path={isDomainAdmin ? "/admin" : "/"} element={<Layout />}>
          <Route
            index
            element={isDomainAdmin ? <AdminDashboard /> : <Landing />}
          />
          <Route path='/schedule-pickup/:id' element={<SchedulePickup />} />
          <Route path='/order/success' element={<OrderCreateSuccess />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Signup />} />
          <Route path='/terms' element={<TermsAndConditions />} />
          <Route path='/faqs' element={<FAQs />} />
          <Route path='/verify-auth' element={<VerifyAuth />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/requests' element={<Requests />} />
          <Route path='/requests/:id' element={<RequestDetailPage />} />
          <Route path='/payments' element={<Payments />} />
          <Route path='/admin/login' element={<Login isAdmin={true} />} />
          <Route path='/admin/dashboard' element={<AdminDashboard />} />
        </Route> */}
      {/* </Routes> */}
    </Router>
  );
};

export default AppRoutes;
