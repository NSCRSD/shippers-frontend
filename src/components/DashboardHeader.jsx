import { Link } from 'react-router-dom';
import { HiOutlineSearch, HiOutlineBell, HiOutlineHome } from 'react-icons/hi';


const DashboardHeader = () => {
  const first_name = localStorage.getItem("first_name");
  const last_name = localStorage.getItem("last_name");
  const user_type = localStorage.getItem("user_type");


  return (
    <header className="sticky top-0 backdrop-blur-md bg-[#0f1b3d]/60 text-white px-4 py-4 rounded-2xl">
          {/* Top Section */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
            {/* Left Section */}
            <div>
              <p className="text-sm text-white/80 font-semibold">
                {user_type}
              </p>
              <h1 className="text-lg font-bold mt-1">
               {user_type === "bank" ? first_name : `${first_name} ${last_name}`}
              </h1>
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
                <Link to="/home">
                  <HiOutlineHome className="text-lg cursor-pointer" />
                </Link>
                <HiOutlineBell className="text-lg" />
              </div>
            </div>
          </div>
        </header>
  )
}

export default DashboardHeader
