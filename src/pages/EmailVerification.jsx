// src/pages/Signup.jsx
import React from "react";
import { Link } from "react-router-dom";


const EmailVerification = () => {

  return (
    <div className="flex flex-col items-center justify-center flex-grow max-w-lg space-y-6">
      <h1 className="text-4xl font-bold">Email Verification Sent</h1>
      <p className="text-center text-2xl text-gray-500 mb-8 tracking-widest">
        Check Mail for verification
      </p>

        <Link
          to="/home"
          className="w-full max-w-[400px] md:max-w-[600px] bg-[#3d5afe] text-white py-4 mt-4 text-lg text-center font-semibold tracking-widest hover:bg-blue-700 transition-all duration-200"
        >
          Go Back to Home
        </Link>
    </div>
  );
};

export default EmailVerification;
