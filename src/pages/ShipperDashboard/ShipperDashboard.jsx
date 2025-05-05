import React from "react";
import { Outlet } from 'react-router-dom';

import { ShipperSidebar } from "../../components";
import { images } from "../../constants";
 

const ShipperDashboard = () => (
  <div className="relative flex min-h-screen bg-gray-100">
    <div
    className="absolute h-[400px] bg-cover w-full bg-center bg-[#3182CE] flex items-center justify-center text-white text-center px-4"
    style={{
        backgroundImage: `url(${images.dashboardbg})`,
    }}
    ></div>
    <div className="flex w-full z-10">
    <ShipperSidebar />

     {/* Main Content */}
    <Outlet />
  </div>
  </div>
);

export default ShipperDashboard;
