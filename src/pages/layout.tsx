import React from "react";
import { Outlet } from "react-router-dom";

export function Layout() {
  return (
    <div className='loader-wrapper'>
      <Outlet />
      {/* <h2>Loading</h2> */}
    </div>
  );
}
