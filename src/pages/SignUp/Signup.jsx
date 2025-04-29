// src/pages/Signup.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from 'lucide-react';

import { signup } from "../../services/signupServices";

const Signup = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
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
    if (!form.firstName) {
      showToast("Please enter your first name.", "error");
      return false;
    }
    if (!form.lastName) {
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
    if (!password) {
      showToast("Please enter your password.", "error");
      return false;
    }
    if (password.length < 6) {
      showToast("Password must be at least 6 characters long.", "error");
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
      const response = await signup(form);

      if (response.ok) {
        showToast("Signup successful. Redirecting to login...", "success");
        setTimeout(() => navigate("/login"), 3000); // Redirect to login after 3 seconds
      } else {
        showToast(response.message || "Something went wrong.", "error");
      }
    } catch (error) {
      console.error(error);
      showToast("Server error. Try again later.", "error");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center flex-grow space-y-6">
      <h1 className="text-3xl font-bold mb-2">Sign Up with NSC</h1>
      <p className="text-center text-gray-500 mb-6 uppercase tracking-widest">No Payment Required</p>

      <form onSubmit={handleSubmit} className="w-full max-w-lg space-y-4">
        {/* First Row */}
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="First Name"
            required
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            className="w-1/2 p-3 border border-gray-400 bg-[#f4f6fd] outline-none"
          />
          <input
            type="text"
            placeholder="LastName"
            required
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            className="w-1/2 p-3 border border-gray-400 bg-[#f4f6fd] outline-none"
          />
        </div>

        {/* Second Row */}
        <input
          type="text"
          placeholder="Email"
          required
          name="email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-3 border border-gray-400 bg-[#f4f6fd] outline-none"
        />

        {/* Password Row */}
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-400 bg-[#f4f6fd] outline-none pr-10"
          />
          <div
            className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </div>
        </div>

        {/* Password Strength */}
        <div className="w-full flex items-center justify-between mt-1">
          <div className="flex-grow h-1 mr-2 bg-gray-300 relative">
            <div className={`h-1 ${strengthColor}`}></div>
          </div>
          <span className="text-xs text-gray-500">Password Strength</span>
        </div>

        {/* NEXT Button */}
        <button className="w-full bg-[#3d5afe] text-white py-4 mt-4 text-lg font-semibold tracking-widest hover:bg-blue-700 transition-all duration-200">
          NEXT
        </button>
      </form>

      {/* Terms */}
      <p className="mt-8 text-xs text-gray-500 text-center max-w-xs">
        By Creating an Account, it means you agree to our{' '}
        <a href="#" className="underline text-gray-600">Privacy Policy</a> and{' '}
        <a href="#" className="underline text-gray-600">Terms of Service</a>
      </p>

        {/* Toast Notification */}
        {toast.visible && (
          <div
            className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-lg text-white ${
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
