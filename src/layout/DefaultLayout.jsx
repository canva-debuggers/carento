import React from "react";
import { Outlet } from "react-router-dom";
import BottomNavigation from "../components/BottomNavigation";

function DefaultLayout() {
  return (
    <div>
      <div className="pb-5">
        <Outlet />
      </div>
      <BottomNavigation />
    </div>
  );
}

export default DefaultLayout;
