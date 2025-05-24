// src/pages/Signup.jsx
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { checkStatus } from "../services/checkStatusServices";
import Loader from "../components/Loader"; // Import the Loader component

const EmailVerification = () => {
  const location = useLocation();
  const { email } = location.state || {};
  const navigate = useNavigate(); // Initialize the navigate function
  const [loading, setLoading] = useState(false); // State to manage the loader

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const response = await checkStatus({ email }); // Pass the email to checkStatus

        const { is_verified, is_validated, user_type } = response?.data?.data;

        if (is_verified) {
          setLoading(true); // Show the loader
          clearInterval(interval); // Stop the interval once verified

          if (
            (user_type === "bank" ||
              user_type === "shipping_line" ||
              user_type === "terminal" ||
              user_type === "regulator" ||
              user_type === "nsc") &&
            !is_validated
          ) {
            setLoading(false); // Hide the loader after delay
            navigate("/whoareyou/check-validation", { state: { email } });
          } else {
            setLoading(false); // Hide the loader after delay
            navigate("/login"); // Redirect to login for all other cases
          }
        }
      } catch (error) {
        console.error("Failed to check user status:", error);
      }
    }, 20000); // 20 seconds

    return () => clearInterval(interval);
  }, [email, navigate]); // Add email and navigate to dependencies

  return (
    <div className="flex flex-col items-center justify-center flex-grow max-w-lg space-y-6">
      {loading && <Loader />} {/* Show the loader when loading */}
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
