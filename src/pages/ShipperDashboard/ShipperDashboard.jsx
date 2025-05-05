import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";

import { dashboard } from "../../services/dashboardServices"; // Import the dashboard service
import { ShipperSidebar } from "../../components";
import { images } from "../../constants";

const ShipperDashboard = () => {
  const [dashboardData, setDashboardData] = useState([]); // State to store dashboard data
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [error, setError] = useState(null); // State to manage errors

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await dashboard(); // Call the dashboard service
        if (response?.status === 200) {
          setDashboardData(response.data); // Store the data in state
        } else {
          setError("Failed to fetch dashboard data.");
        }
      } catch (err) {
        console.error(err);
        setError("An error occurred while fetching dashboard data.");
      } finally {
        setLoading(false); // Set loading to false after the request completes
      }
    };

    fetchDashboard(); // Call the fetchDashboard function
  }, []);

  return (
    <div className="relative flex min-h-screen bg-gray-100">
      {/* Background Section */}
      <div
        className="absolute h-[400px] bg-cover w-full bg-center bg-[#3182CE] flex items-center justify-center text-white text-center px-4"
        style={{
          backgroundImage: `url(${images.dashboardbg})`,
        }}
      ></div>

      {/* Main Content */}
      <div className="flex w-full z-10">
        <ShipperSidebar />

        <div className="flex-grow p-6">
          {loading ? (
            <p>Loading dashboard data...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <div>
              <h1 className="text-2xl font-bold mb-4">Dashboard Data</h1>
              <pre className="bg-gray-200 p-4 rounded">{JSON.stringify(dashboardData, null, 2)}</pre>
            </div>
          )}
        </div>

        {/* Outlet for nested routes */}
        <Outlet />
      </div>
    </div>
  );
};

export default ShipperDashboard;
