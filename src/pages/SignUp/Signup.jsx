// src/pages/Signup.jsx
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Eye, EyeOff } from 'lucide-react';

import { signup } from "../../services/signupServices";
import { sendEmailVerification } from "../../services/sendEmailVerificationServices";

const Signup = () => {
  const location = useLocation();
  const userType = location.state?.userType; // Access userType from state

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    bankName: "",
    address: "",
    department: "", // Added department for NSC Staff
  });

  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [toast, setToast] = useState({ message: "", type: "", visible: false });
  const navigate = useNavigate(); // Initialize the navigate function

  const showToast = (message, type) => {
    setToast({ message, type, visible: true });
    setTimeout(() => setToast({ ...toast, visible: false }), 3000); // Hide toast after 3 seconds
  };

  const getPasswordStrength = (pwd) => {
    if (pwd.length > 8 && /[A-Z]/.test(pwd) && /[\d\W]/.test(pwd)) return 'strong';
    if (pwd.length > 5) return 'medium';
    return 'weak';
  };

  const strength = getPasswordStrength(password);
  const strengthColor = {
    weak: 'bg-red-500 w-1/3',
    medium: 'bg-yellow-500 w-2/3',
    strong: 'bg-green-500 w-full'
  }[strength];

  const validateInputs = () => {
    if (!form.firstName && ["Shipper", "Terminal Operator", "Regulators", "Shipping Lines", "NSC Staff"].includes(userType)) {
      showToast("Please enter your first name.", "error");
      return false;
    }
    if (!form.lastName && ["Shipper", "Terminal Operator", "Regulators", "Shipping Lines", "NSC Staff"].includes(userType)) {
      showToast("Please enter your last name.", "error");
      return false;
    }
    if (!form.email) {
      showToast("Please enter your email address.", "error");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      showToast("Please enter a valid email address.", "error");
      return false;
    }
    const phoneRegex = /^\d{10,14}$/;

    if (!form.phoneNumber || !phoneRegex.test(form.phoneNumber)) {
      showToast("Please enter a valid phone number (10-14 digits)", "error");
      return false;
    }

    // Password validation for specific user types
    if (
      ["Shipper", "Terminal Operator", "Regulators", "Shipping Lines", "NSC Staff", "Banker"].includes(userType) &&
      !password
    ) {
      showToast("Please enter your password.", "error");
      return false;
    }
    if (
      ["Shipper", "Terminal Operator", "Regulators", "Shipping Lines", "NSC Staff", "Banker"].includes(userType) &&
      password.length < 6
    ) {
      showToast("Password must be at least 6 characters long.", "error");
      return false;
    }

    // Bank-specific validation
    if (!form.bankName && userType === "Banker") {
      showToast("Please enter your bank name.", "error");
      return false;
    }

    // Department validation for NSC Staff
    if (!form.department && userType === "NSC Staff") {
      showToast("Please select your department.", "error");
      return false;
    }

    // Address validation for specific user types
    if (!form.address && ["Shipper", "Terminal Operator", "Regulators", "Shipping Lines"].includes(userType)) {
      showToast("Please enter your address.", "error");
      return false;
    }

    return true;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateInputs()) {
      return;
    }

    try {
      const payload = {
        user_type: userType,
        email: form.email,
        first_name: form.firstName,
        last_name: form.lastName,
        phone_number: form.phoneNumber,
        password: password,
        address: form.address,
        bank_name: form.bankName,
        department: form.department,
      };

      const response = await signup(payload);

      if (response.status === 201) {
        // Call the email verification endpoint after successful signup
        const verifyResponse = await sendEmailVerification({ email: form.email });

        if (verifyResponse.status === 201) {
          showToast("Signup successful! Verification email sent.", "success");
        } else {
          showToast("Signup successful, but failed to send verification email.", "error");
        }

        setTimeout(() => navigate("/whoareyou/email-verification"), 3000);
      } else {
        showToast(response.message || "Signup failed. Please try again.", "error");
      }
    } catch (error) {
      console.error(error.response?.data);
      showToast("Server error. Try again later.", "error");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center flex-grow space-y-6">
      <h1 className="text-3xl font-bold">Sign Up with NSC</h1>
      <p className="text-center text-gray-500 mb-8 uppercase tracking-widest">
        {userType}
      </p>

      <form onSubmit={handleSubmit} className="w-full max-w-lg space-y-4">
        {/* Render form fields based on userType */}
        {userType === "Banker" && (
          <>
            <input
              type="text"
              placeholder="Bank Name"
              name="bankName"
              value={form.bankName}
              onChange={handleChange}
              className="w-full p-3 border border-gray-400 bg-[#f4f6fd] outline-none"
            />
            <input
              type="email"
              placeholder="Official Email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-400 bg-[#f4f6fd] outline-none"
            />
            <input
              type="text"
              placeholder="Phone Number"
              name="phoneNumber"
              value={form.phoneNumber}
              onChange={handleChange}
              className="w-full p-3 border border-gray-400 bg-[#f4f6fd] outline-none"
            />
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                name="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  handleChange(e);
                }}
                className="w-full p-3 border border-gray-400 bg-[#f4f6fd] outline-none pr-10"
              />
              <div
                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </div>
            </div>
          </>
        )}

        {["Shipper", "Terminal Operator", "Regulators", "Shipping Lines", "NSC Staff"].includes(userType) && (
          <>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="First Name"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                className="w-full p-3 border border-gray-400 bg-[#f4f6fd] outline-none"
              />
              <input
                type="text"
                placeholder="Last Name"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                className="w-full p-3 border border-gray-400 bg-[#f4f6fd] outline-none"
              />
            </div>
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-400 bg-[#f4f6fd] outline-none"
            />
            <input
              type="text"
              placeholder="Phone Number"
              name="phoneNumber"
              value={form.phoneNumber}
              onChange={handleChange}
              className="w-full p-3 border border-gray-400 bg-[#f4f6fd] outline-none"
            />
            {userType === "NSC Staff" && (
              <select
                name="department"
                value={form.department}
                onChange={handleChange}
                className="w-full p-3 border border-gray-400 bg-[#f4f6fd] outline-none"
              >
                <option value="" disabled>
                  Select Your Department
                </option>
                <option value="Regulatory Services Department">Regulatory Services Department</option>
                <option value="ICT">ICT</option>
                <option value="Human Resources">Human Resources</option>
                <option value="Finance">Finance</option>
                <option value="Legal">Legal</option>
                <option value="Consumer Affairs">Consumer Affairs</option>
              </select>
            )}
            <input
              type="text"
              placeholder="Address"
              name="address"
              value={form.address}
              onChange={handleChange}
              className="w-full p-3 border border-gray-400 bg-[#f4f6fd] outline-none"
            />
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                name="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  handleChange(e);
                }}
                className="w-full p-3 border border-gray-400 bg-[#f4f6fd] outline-none pr-10"
              />
              <div
                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </div>
            </div>
            <div className="w-full flex items-center justify-between mt-1">
              <div className="flex-grow h-1 mr-2 bg-gray-300 relative">
                <div className={`h-1 ${strengthColor}`}></div>
              </div>
              <span className="text-xs text-gray-500">Password Strength</span>
            </div>
          </>
        )}

        <button
          type="submit"
          className="w-full bg-[#3d5afe] text-white py-4 mt-4 text-lg font-semibold tracking-widest hover:bg-blue-700 transition-all duration-200"
        >
          SIGN UP
        </button>
      </form>

      <p className="mt-8 text-xs text-gray-500 text-center max-w-xs">
        By Creating an Account, it means you agree to our{' '}
        <a href="#" className="underline text-gray-600">Privacy Policy</a> and{' '}
        <a href="#" className="underline text-gray-600">Terms of Service</a>
      </p>

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

export default Signup;
