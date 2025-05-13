import React, { useState } from 'react';

import { forgotPassword } from '../../services/forgotPasswordServices';
import { images } from "../../constants";
import { SmartAuthLink } from "../../components";

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [toast, setToast] = useState({ message: '', type: '', visible: false });

  const showToast = (message, type) => {
    setToast({ message, type, visible: true });
    setTimeout(() => setToast({ ...toast, visible: false }), 3000); // Hide toast after 3 seconds
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      showToast('Please enter your email address.', 'error');
      return;
    }

    try {
      const response = await forgotPassword({email: email});

      if (response.status === 200) {
        showToast('Password reset link sent to your email.', 'success');
      } else {
        showToast(response?.message || 'Something went wrong.', 'error');
      }
    } catch (error) {
      console.error(error);
      showToast('Error connecting to server.', 'error');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <img src={images.shippersLogo} alt="Logo" className="w-24 mx-auto mb-4" />
        <h2 className="text-2xl font-semibold text-center text-[#0E4C81] mb-2">
          Forgot Your Password?
        </h2>
        <p className="text-center text-gray-600 text-sm mb-6">
          Enter your email and we'll send you a reset link.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            required
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0E4C81]"
          />
          <button
            type="submit"
            className="w-full bg-[#0E4C81] text-white py-2 rounded-lg hover:bg-[#09385f]"
          >
            Send Reset Link
          </button>
        </form>
        <div className="mt-6 text-center">
          <SmartAuthLink to="/login" className="text-sm text-[#0E4C81] hover:underline">
            Back to login
          </SmartAuthLink>
        </div>
      </div>

      {/* Toast Notification */}
      {toast.visible && (
        <div
          className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-lg text-white ${
            toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'
          }`}
        >
          {toast.message}
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
