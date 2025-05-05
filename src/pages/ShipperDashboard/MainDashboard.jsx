import React from 'react'
import { Bar } from 'react-chartjs-2';
import { HiOutlineChevronRight, HiOutlineSearch, HiOutlineCog, HiOutlineBell, HiOutlineUser } from 'react-icons/hi';

import { statCards, FreightOverviewChart, barData } from "../../constants/dummy";


const MainDashboard = () => {
  return (
    <main className="flex-1 p-6 space-y-6">
    <header className=" text-white px-4 py-4 relative">
      {/* Top Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
        {/* Left Section */}
        <div>
          <p className="text-sm text-white/80">
            Pages / <span className="font-semibold text-white">Dashboard</span>
          </p>
          <h1 className="text-lg font-bold mt-1">A SHIPPER</h1>
        </div>

        {/* Right Section */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full md:w-auto">
          {/* Sort Button */}
          <button className="bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-1 w-full sm:w-40 text-sm lg:text-lg">
            Sort Freight <HiOutlineChevronRight className="text-sm md:text-lg" />
          </button>

          {/* Search Bar */}
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="Type"
              className="pl-10 pr-4 py-2 rounded-lg bg-white text-black placeholder-gray-400 w-full focus:outline-none"
            />
            <HiOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>

          {/* Icons Section */}
          <div className="flex items-center gap-3 text-white mt-2 sm:mt-0">
            <HiOutlineUser className="text-lg" />
            <span className="text-sm hidden sm:inline">Sign Out</span>
            <HiOutlineCog className="text-lg" />
            <HiOutlineBell className="text-lg" />
          </div>
        </div>
      </div>
    </header>

      {/* Stat Cards */}
       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
       {statCards.map((card, index) => {
            const isPositive = card.change.startsWith('+');
            const changeColor = isPositive ? 'text-green-500' : 'text-red-500';

            return (
            <div key={index} className="bg-white p-4 rounded-lg shadow flex items-center justify-between">
                <div>
                <p className="text-sm text-gray-500">{card.title}</p>
                <p className="text-xl font-bold">{card.value}</p>
                <p className={`text-sm ${changeColor}`}>{card.change}</p>
                </div>
                <div className="text-2xl text-blue-500">
                {card.icon}
                </div>
            </div>
            );
        })}
        </div>
        
        <div className="w-full flex justify-end">
            <button className="bg-[#63C48C] hover:bg-green-500 text-white font-medium px-6 py-3 rounded-md flex items-center gap-2 transition-colors duration-200">
                MORE FREIGHT OPTIONS
                <HiOutlineChevronRight className="text-xl" />
            </button>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            <div className="lg:col-span-2">
            <FreightOverviewChart />
            </div>
          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-lg font-semibold mb-4">Performance: Total Orders</h3>
            <Bar data={barData} />
          </div>
        </div>

        {/* Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Page Visits */}
          <div className="bg-white p-6 rounded shadow overflow-x-auto">
            <h3 className="text-lg font-semibold mb-4">Page Visits</h3>
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="text-gray-500">
                  <th className="pb-2">Page Name</th>
                  <th className="pb-2">Visitors</th>
                  <th className="pb-2">Unique Users</th>
                  <th className="pb-2">Bounce Rate</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['/argon/', 4569, 340, '46.53%'],
                  ['/argon/index.html', 3985, 319, '46.53%'],
                  ['/argon/charts.html', 3513, 294, '36.49%'],
                  ['/argon/tables.html', 2050, 147, '50.87%'],
                  ['/argon/profile.html', 1795, 190, '46.53%'],
                ].map(([page, visitors, users, bounce], idx) => (
                  <tr key={idx} className="border-t">
                    <td className="py-2">{page}</td>
                    <td>{visitors}</td>
                    <td>{users}</td>
                    <td>{bounce}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Social Traffic */}
          <div className="bg-white p-6 rounded shadow overflow-x-auto">
            <h3 className="text-lg font-semibold mb-4">Social Traffic</h3>
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="text-gray-500">
                  <th className="pb-2">Referral</th>
                  <th className="pb-2">Visitors</th>
                  <th className="pb-2">%</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Facebook', 1480, 60],
                  ['Facebook', 5480, 70],
                  ['Google', 4807, 80],
                  ['Instagram', 3678, 75],
                  ['Twitter', 2645, 30],
                ].map(([ref, visits, percent], idx) => (
                  <tr key={idx} className="border-t">
                    <td className="py-2">{ref}</td>
                    <td>{visits}</td>
                    <td>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: `${percent}%` }}
                        ></div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
    </main>
  )
}

export default MainDashboard

