import React from 'react'
import { HiOutlineSearch, HiOutlineCog, HiOutlineBell, HiOutlineUser, HiReply } from 'react-icons/hi';


const DashboardHeader = () => {
  return (
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
              <button className="flex items-center justify-between gap-2 bg-[#0f1b3d] hover:bg-[#1a2a57] text-white px-4 py-2 rounded-lg font-medium transition w-full md:w-48">
              <HiReply className="font-extrabold text-2xl w-4 h-4" /> <span className="text-sm py-1">BACK TO STREAMS </span> 
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
  )
}

export default DashboardHeader
