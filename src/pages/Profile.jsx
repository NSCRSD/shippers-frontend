import React from 'react';

import { DashboardHeader } from '../components';

const Profile = () => {
  return (
    <main className="flex-1 p-6 space-y-6">
      {/* Header */}
      <DashboardHeader />

      {/* Cards */}
      <div className="bg-white rounded-2xl shadow-md p-6 w-full">
        <h2 className="text-xl font-bold text-gray-800">
          User Profile
        </h2>
        <p className="text-lg text-gray-600 mt-2">
          View profile information.
        </p>
      </div>

      {/* Profile Content */}
      <section className="max-w-3xl mx-auto mt-8 bg-white rounded-2xl shadow-md p-8 space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">User Profile</h2>
          <p className="text-gray-500 text-sm mt-1">
            View your personal information below. To update your details, please visit the Settings page.
          </p>
        </div>

        {/* User Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="text-sm text-gray-500">Full Name</label>
            <div className="mt-1 bg-gray-100 rounded-md px-4 py-2 text-gray-800 text-sm">
              Nnamdi Okoro
            </div>
          </div>
          <div>
            <label className="text-sm text-gray-500">Email Address</label>
            <div className="mt-1 bg-gray-100 rounded-md px-4 py-2 text-gray-800 text-sm">
              nnamdi@example.com
            </div>
          </div>
          <div>
            <label className="text-sm text-gray-500">Phone Number</label>
            <div className="mt-1 bg-gray-100 rounded-md px-4 py-2 text-gray-800 text-sm">
              +234 123 456 7890
            </div>
          </div>
          <div>
            <label className="text-sm text-gray-500">User Role</label>
            <div className="mt-1 bg-gray-100 rounded-md px-4 py-2 text-gray-800 text-sm">
              Administrator
            </div>
          </div>
        </div>

      
      </section>
    </main>
  );
};

export default Profile;
