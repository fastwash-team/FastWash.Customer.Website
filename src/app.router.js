import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./components/layout";
import Landing from "./pages/landing";
import { SchedulePickup } from "./pages/schedule.pickup";
import { OrderSuccessView } from "./pages/order.success";
import { Login } from "./pages/login";
import { Register } from "./pages/register";
import { VerifyAuth } from "./pages/verify-auth";
import { Dashboard } from "./pages/dashboard";
import { FAQs } from "./pages/faqs";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<Layout />}>
          <Route index element={<Landing />} />
          <Route path='/schedule-pickup/:id' element={<SchedulePickup />} />
          <Route path='/order/success' element={<OrderSuccessView />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/verify-auth' element={<VerifyAuth />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/faqs' element={<FAQs />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
