import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import  StepItem  from './StepItem/StepItem';
import { images } from '../constants';

const SignUpLayout = () => {
  const location = useLocation();

  // Find current step based on path
  const getCurrentStep = () => {
    switch (location.pathname) {
      case '/whoareyou':
        return 1;
      case '/whoareyou/signup':
        return 2;
      case '/whoareyou/forgot-password':
        return 3;
      default:
        return 0;
    }
  };

  const currentStep = getCurrentStep();

  return (
   <div className="flex min-h-screen">
    {/* Left Section */}
    <div className="flex flex-col w-3/4 relative">
    {/* Header */}
    <div className="flex justify-between items-center px-10 py-6">
        <img src={images.logo} alt="Logo" className="w-60 mb-2" /> 
        <div className="flex items-center space-x-2">
        <p className="text-gray-600 text-sm">Already a Member?</p>
        <button className="border border-gray-500 text-gray-700 text-sm px-4 py-1 rounded">Log In</button>
        </div>
    </div>

    {/* Main Content */}
    <div className="flex items-center justify-center h-full w-full">
      <Outlet />
    </div>

    {/* Footer */}
    <div className="flex justify-center py-6">
        <div className="flex justify-center items-center">
        <img src={images.shippersLogo} alt="Logo" className="w-80 mb-2" /> 
        </div>
    </div>
    </div>

    {/* Right Section */}
    <div className="w-1/4 text-white flex flex-col justify-center items-center" 
        style={{
            background: `linear-gradient(135deg, #3366cc 40%, #003366 60%)`
        }}
    >
    <div className="flex flex-col space-y-10">
        <StepItem currentStep={currentStep} />
    </div>
    </div>
    </div>

  );
};

export default SignUpLayout;

