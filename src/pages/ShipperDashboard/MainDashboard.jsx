import React from 'react'
import { Bar } from 'react-chartjs-2';
import { HiOutlineChevronRight } from 'react-icons/hi';
import { FaUser } from 'react-icons/fa';

import { DashboardHeader } from '../../components';
import { statCards, FreightOverviewChart, barData } from "../../constants/dummy";


const MainDashboard = () => {
  return (
    <main className="flex-1 p-6 space-y-6 md:h-screen md:overflow-y-auto">
      {/* Header */}
      <DashboardHeader />
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
        
        <div className="w-full">
            {/* Action Buttons - vertical stack */}
            <div className="flex w-full justify-end">
              <button className="flex items-center justify-between gap-2 bg-[#0f1b3d] hover:bg-[#1a2a57] text-white px-4 py-2 rounded-lg font-medium transition w-full md:w-48">
                <span className="text-sm py-2">FREIGHT ANALYSIS</span>
                <HiOutlineChevronRight className="w-4 h-4" />
              </button>
            </div>
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

