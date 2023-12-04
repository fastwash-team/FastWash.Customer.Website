import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "./pages/landing";
import { SchedulePickup } from "./pages/schedule-pickup";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/schedule-pickup' element={<SchedulePickup />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
