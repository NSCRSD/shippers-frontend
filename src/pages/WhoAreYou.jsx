import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Loader } from "../utils/loader";


const WhoAreYou = () => {
  const [userType, setUserType] = useState(""); // State to store selected user type
  const [toast, setToast] = useState({ message: "", type: "", visible: false }); // Toast state
  const navigate = useNavigate(); 

  const showToast = (message, type) => {
    setToast({ message, type, visible: true });
    setTimeout(() => setToast({ ...toast, visible: false }), 3000); // Hide toast after 3 seconds
  };

  const handleNext = () => {
    if (!userType) {
      showToast("Please select a user type before proceeding.", "error");
      return;
    }

    // Navigate to Signup page for other user types
    Loader(); // Start loader
    navigate("/whoareyou/signup", { state: { userType } });
  };

  return (
    <div className="flex flex-col items-center justify-center flex-grow space-y-6">
      <h1 className="text-3xl font-bold mb-10 tracking-wide">WHO ARE YOU ?</h1>

      {/* Dropdown Container */}
      <div className="relative w-[300px] md:w-[400px] mb-10">
        <select
          className="w-full p-3 pr-10 border border-black rounded-md text-gray-700 text-center focus:outline-none appearance-none bg-white"
          value={userType}
          onChange={(e) => setUserType(e.target.value)} // Update userType state
        >
          <option value="" disabled>Select from Drop Down</option>
          <option value="bank">Bank</option>
          <option value="nsc">NSC Staff</option>
          <option value="shipper">Shipper</option>
          <option value="terminal">Terminal</option>
          <option value="regulator">Regulator</option>
          <option value="shipping_line">Shipping Lines</option>
          <option value="vessel_charter">Vessel Charter</option>
        </select>
        {/* Dropdown arrow icon */}
        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-700 pointer-events-none" />
      </div>

      {/* Next Button */}
      <button
        onClick={handleNext} // Call handleNext on button click
        className="w-full max-w-[400px] md:max-w-[600px] bg-[#3d5afe] text-white py-4 text-lg font-semibold tracking-wide hover:bg-blue-700 transition-all duration-200"
      >
        NEXT
      </button>

      {/* Toast Notification */}
      {toast.visible && (
        <div
          className={`fixed top-4 left-[37%] transform -translate-x-1/2 px-4 py-2 rounded-lg text-white ${
            toast.type === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {toast.message}
        </div>
      )}
    </div>
  );
};

export default WhoAreYou;
