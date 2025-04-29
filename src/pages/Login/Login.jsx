// src/pages/Login.jsx
import React, { useState, useEffect } from "react";
import { Eye, EyeOff } from 'lucide-react';

import { login } from "../../services/loginServices";
import { images } from "../../constants";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [toast, setToast] = useState({ message: "", type: "", visible: false });

  const showToast = (message, type) => {
    setToast({ message, type, visible: true });
    setTimeout(() => setToast(prev => ({ ...prev, visible: false })), 3000); // Corrected
  };

  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  const validateInputs = () => {
    if (!email) {
      showToast("Please enter your email address.", "error");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showToast("Please enter a valid email address.", "error");
      return false;
    }
    if (!password) {
      showToast("Please enter your password.", "error");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateInputs()) {
      return;
    }

    if (rememberMe) {
      localStorage.setItem("rememberedEmail", email);
    } else {
      localStorage.removeItem("rememberedEmail");
    }

    try {
      const response = await login({ email, password });

      if (response?.ok || response?.status === "success") {
        showToast("Login successful!", "success");
        // Redirect to dashboard or another page
      } else {
        showToast(response?.message || "Invalid email or password.", "error");
      }
    } catch (error) {
      console.error(error);
      showToast("Error connecting to server.", "error");
    }
  };

  return (
    <div className="flex min-h-screen">
    {/* Left Section */}
    <div className="flex flex-col w-3/4 relative">
    {/* Header */}
    <div className="flex justify-between items-center px-10 py-6">
        <img src={images.logo} alt="Logo" className="w-60 mb-2" /> 
        <div className="flex items-center space-x-2">
        <p className="text-gray-600 text-sm">No Account yet?</p>
        <button className="border border-gray-500 text-gray-700 text-sm px-4 py-1 rounded">Sign Up</button>
        </div>
    </div>

    {/* Main Content */}
    <div className="flex items-center justify-center h-full w-full">
      <div className="flex flex-col items-center justify-center flex-grow space-y-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg space-y-4"
      >
        <h2 className="text-2xl font-bold text-center mb-2">Account Log In</h2>
        <p className="text-center text-gray-500 mb-6 uppercase tracking-widest">
          Please login to contnue to your account
        </p>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full px-3 py-3 mb-4 border border-gray-300 rounded focus:outline-none"
        />

        <div className="relative mb-4">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-3 py-3 border border-gray-300 rounded focus:outline-none pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 focus:outline-none"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        <div className="flex items-center justify-between mb-6">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="form-checkbox text-blue-600 mr-2"
            />
            <span className="text-gray-700">Remember Me</span>
          </label>
          <a href="#" className="text-gray-500 hover:underline text-sm">
            Forgot Password?
          </a>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded text-sm font-semibold tracking-widest"
        >
          LOG IN
        </button>
      </form>
      </div>
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
    <div className="flex space-y-10">
        
    </div>
    </div>

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

export default Login;

