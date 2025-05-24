import { useState, useEffect } from 'react';
import { DashboardHeader } from '../components';

const Settings = () => {
  const [userType, setUserType] = useState(''); // State to store user type

  useEffect(() => {
    // Fetch user type from localStorage or API
    const storedUserType = localStorage.getItem('user_type');
    setUserType(storedUserType || ''); // Default to empty if not found
  }, []);

  return (
    <main className="flex-1 p-6 min-h-screen">
      {/* Header */}
      <DashboardHeader />

      {/* Settings Content */}
      <section className="max-w-3xl mx-auto mt-8 bg-white rounded-2xl shadow-md p-8 space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Settings</h2>
          <p className="text-gray-500 text-sm mt-1">
            Manage your account settings and preferences.
          </p>
        </div>

        {/* Account Settings */}
        <div className="space-y-6">
          <div>
            <p className="text-sm text-green-600 font-semibold">Account Settings</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
              {userType === 'bank' ? (
                <div className="sm:col-span-2">
                  <label className="text-sm text-gray-500">Bank Name</label>
                  <input
                    type="text"
                    placeholder="Enter Bank Name"
                    className="w-full border rounded-md px-4 py-2 mt-1 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              ) : userType === 'regulator' ? (
                <div className="sm:col-span-2">
                  <label className="text-sm text-gray-500">Agency Name</label>
                  <input
                    type="text"
                    placeholder="Enter Agency Name"
                    className="w-full border rounded-md px-4 py-2 mt-1 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              ) : (
                <>
                  <div>
                    <label className="text-sm text-gray-500">First Name</label>
                    <input
                      type="text"
                      placeholder="Enter First Name"
                      className="w-full border rounded-md px-4 py-2 mt-1 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Last Name</label>
                    <input
                      type="text"
                      placeholder="Enter Last Name"
                      className="w-full border rounded-md px-4 py-2 mt-1 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </>
              )}
              <div>
                <label className="text-sm text-gray-500">Email Address</label>
                <input
                  type="email"
                  placeholder="nnamdi@example.com"
                  className="w-full border rounded-md px-4 py-2 mt-1 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="text-sm text-gray-500">Phone Number</label>
                <input
                  type="text"
                  placeholder="+234 123 456 7890"
                  className="w-full border rounded-md px-4 py-2 mt-1 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="text-sm text-gray-500">Address</label>
                <input
                  type="text"
                  placeholder="123 Main St, City, Country"
                  className="w-full border rounded-md px-4 py-2 mt-1 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Password Settings */}
          <div className="pt-6 border-t">
            <p className="text-sm text-green-600 font-semibold">Change Password</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
              <div>
                <label className="text-sm text-gray-500">Current Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full border rounded-md px-4 py-2 mt-1 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="text-sm text-gray-500">New Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full border rounded-md px-4 py-2 mt-1 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="text-sm text-gray-500">Confirm New Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full border rounded-md px-4 py-2 mt-1 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="text-right pt-4 border-t">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-md transition">
            Save Changes
          </button>
        </div>
      </section>
    </main>
  );
};

export default Settings;
