import React from "react";
import { Outlet } from "react-router-dom";
import BottomNavigation from "../components/BottomNavigation";

function DefaultLayout() {
  return (
    <div>
      <Outlet />
      <BottomNavigation />
    </div>
  );
}

export default DefaultLayout;
