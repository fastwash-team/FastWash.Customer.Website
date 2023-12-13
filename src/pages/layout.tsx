import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { getBackgroundLoaderState } from "../pipelines/layout/selectors";

export function Layout() {
  const backgroundLoader = useSelector(getBackgroundLoaderState);
  console.log({ backgroundLoader });

  return (
    <div className='loader-wrapper'>
      <Outlet />
      {/* <h2>Loading</h2> */}
    </div>
  );
}
