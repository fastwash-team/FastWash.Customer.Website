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

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Landing />} />
          <Route path='/schedule-pickup' element={<SchedulePickup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Signup />} />
          <Route path='/verify-auth' element={<VerifyAuth />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/requests' element={<Requests />} />
          <Route path='/requests/:id' element={<RequestDetailPage />} />
          <Route path='/payments' element={<Payments />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
