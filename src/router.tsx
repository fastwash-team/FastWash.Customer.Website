import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "./pages/landing";
import { SchedulePickup } from "./pages/schedule-pickup";
import { Layout } from "./pages/layout";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Landing />} />
          <Route path='/schedule-pickup' element={<SchedulePickup />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
