import React, { useState, useEffect } from "react";
import { Outlet } from 'react-router-dom';

import { dashboard } from "../../services/dashboardServices";
import { ShipperSidebar } from "../../components";
import { images } from "../../constants";
 

const ShipperDashboard = () => {
  const [dashboardData, setDashboardData] = useState([]); // State to store dashboard data

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await dashboard(); // Call the dashboard service
        if (response?.status === 200) {
          setDashboardData(response.data); // Store the data in state
        } else {
          console.log("Failed to fetch dashboard data.");
        }
      } catch (err) {
        console.error(err);
        console.log("An error occurred while fetching dashboard data.");
      } 
    };

    fetchDashboard(); // Call the fetchDashboard function
  }, []);

  
  return (
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
  )
};

export default ShipperDashboard;
