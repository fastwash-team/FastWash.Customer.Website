import React from "react";
import { Outlet } from "react-router-dom";

export function Layout() {
  const { host } = window.location;
  const isStaging = host === "customer.dev.fastwash.africa";
  return (
    <div className='loader-wrapper'>
      {isStaging && <div className='demo-banner'>DEMO</div>}
      <Outlet />
      {/* <h2>Loading</h2> */}
    </div>
  );
}
