import React from "react";
import { Outlet } from "react-router-dom";

export function Layout() {
  const { host } = window.location;
  const isStaging = ["dev.fastwash.africa", "fast-wash.netlify.app"].includes(
    host
  );

  return (
    <div className='loader-wrapper'>
      {isStaging && <div className='demo-banner'>STAGING</div>}
      <Outlet />
      {/* <h2>Loading</h2> */}
    </div>
  );
}
