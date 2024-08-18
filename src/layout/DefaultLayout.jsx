import React from "react";
import { Outlet } from "react-router-dom";
import BottomNavigation from "../components/BottomNavigation";

function DefaultLayout() {
  return (
    <div>
      <div className="mb-5" style={{ marginBottom: "100px" }}>
        <Outlet />
      </div>
      <BottomNavigation />
    </div>
  );
}

export default DefaultLayout;
