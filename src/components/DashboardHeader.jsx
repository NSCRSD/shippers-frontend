import React from 'react'
import { HiOutlineSearch, HiOutlineBell, HiOutlineHome } from 'react-icons/hi';


const DashboardHeader = () => {
  return (
    <header className="sticky top-0 backdrop-blur-md bg-[#0f1b3d]/60 text-white px-4 py-4 rounded-2xl">
          {/* Top Section */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
            {/* Left Section */}
            <div>
              <p className="text-sm text-white/80 font-semibold">
                Shipper
              </p>
              <h1 className="text-lg font-bold mt-1">Mr. Micheal Afolabi</h1>
            </div>
    
            {/* Right Section */}
            <div className="flex  items-start sm:items-center gap-3 w-full md:w-auto">
    
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
                <HiOutlineHome className="text-lg" />
                <HiOutlineBell className="text-lg" />
              </div>
            </div>
          </div>
        </header>
  )
}

export default DashboardHeader
