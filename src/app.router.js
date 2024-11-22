import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./components/layout";
import Landing from "./pages/landing";
import { SchedulePickup } from "./pages/schedule.pickup";
import { OrderSuccessView } from "./pages/order.success";
import { Login } from "./pages/login";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<Layout />}>
          <Route index element={<Landing />} />
          <Route path='/schedule-pickup/:id' element={<SchedulePickup />} />
          <Route path='/order/success' element={<OrderSuccessView />} />
          <Route path='/login' element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
