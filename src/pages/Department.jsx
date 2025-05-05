import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Department = () => {
  const [department, setDepartment] = useState(""); // State to store selected department
  const [toast, setToast] = useState({ message: "", type: "", visible: false }); // Toast state
  const navigate = useNavigate(); // Initialize navigate function

  const showToast = (message, type) => {
    setToast({ message, type, visible: true });
    setTimeout(() => setToast({ ...toast, visible: false }), 3000); // Hide toast after 3 seconds
  };

  const handleNext = () => {
    if (!department) {
      showToast("Please select a department before proceeding.", "error");
      return;
    }
    // Navigate to Signup page and pass department as state
    navigate("/whoareyou/signup", { state: { department } });
  };

  return (
    <div className="flex flex-col items-center justify-center flex-grow space-y-6">
      <h1 className="text-3xl font-bold mb-10 tracking-wide">PLEASE SELECT YOUR DEPARTMENT</h1>

      {/* Dropdown Container */}
      <div className="relative w-[300px] md:w-[400px] mb-10">
        <select
          className="w-full p-3 pr-10 border border-black rounded-md text-gray-700 text-center focus:outline-none appearance-none bg-white"
          value={department}
          onChange={(e) => setDepartment(e.target.value)} // Update department state
        >
          <option value="" disabled>Select from Drop Down</option>
          <option value="Regulatory Services Department">Regulatory Services Department</option>
          <option value="ICT">ICT</option>
          <option value="Human Resources">Human Resources</option>
          <option value="Finance">Finance</option>
          <option value="Legal">Legal</option>
          <option value="Consumer Affairs">Consumer Affairs</option>
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

export default Department;
