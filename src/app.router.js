import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./components/layout";
import Landing from "./pages/landing";
import { SchedulePickup } from "./pages/schedule.pickup";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<Layout />}>
          <Route index element={<Landing />} />
          <Route path='/schedule-pickup/:id' element={<SchedulePickup />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
