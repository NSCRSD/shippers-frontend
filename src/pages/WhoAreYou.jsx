import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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
          <option value="Banker">Banker</option>
          <option value="NSC Staff">NSC Staff</option>
          <option value="Shipper">Shipper</option>
          <option value="Terminal Operator">Terminal Operators</option>
          <option value="Regulators">Regulators</option>
          <option value="Shipping Lines">Shipping Lines</option>
        </select>
        {/* Dropdown arrow icon */}
        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-700 pointer-events-none" />
      </div>

      {/* Next Button */}
      <button
        onClick={handleNext} // Call handleNext on button click
        className="w-[400px] md:w-[600px] bg-[#3d5afe] text-white py-4 text-lg font-semibold tracking-wide hover:bg-blue-700 transition-all duration-200"
      >
        NEXT
      </button>

      {/* Terms */}
      <p className="mt-8 text-xs text-gray-500 max-w-l">
        By Creating an Account, it means you agree to our{' '}
        <a href="#" className="underline text-gray-600">Privacy Policy</a> and{' '}
        <a href="#" className="underline text-gray-600">Terms of Service</a>
      </p>

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
