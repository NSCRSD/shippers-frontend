import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from "lucide-react";
import { resetPassword } from '../../services/resetPasswordServices';
import { images } from '../../constants';
import Loader from "../../components/Loader";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [toast, setToast] = useState({ message: '', type: '', visible: false });
  const [loading, setLoading] = useState(false);
  const [isResetSuccessful, setIsResetSuccessful] = useState(false); // Track success

  const showToast = (message, type) => {
    setToast({ message, type, visible: true });
    setTimeout(() => setToast({ ...toast, visible: false }), 3000);
  };

  const validateInputs = () => {
    if (!password || !confirmPassword) {
      showToast('Please fill in all fields.', 'error');
      return false;
    }
    if (password.length < 6) {
      showToast('Password must be at least 6 characters long.', 'error');
      return false;
    }
    if (password !== confirmPassword) {
      showToast('Passwords do not match.', 'error');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateInputs()) return;

    try {
      setLoading(true);
      const response = await resetPassword({ token, password });

      if (response.status === 200) {
        setLoading(false);
        setIsResetSuccessful(true); // Set success state
        showToast('Password reset successful!', 'success');
      } else {
        setLoading(false);
        showToast(response?.message || 'Something went wrong.', 'error');
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
      showToast('Server error. Try again later.', 'error');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-4">
      {loading && <Loader />}
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <img src={images.shippersLogo} alt="Logo" className="w-24 mx-auto mb-4" />

        {!isResetSuccessful ? (
          <>
            <h2 className="text-2xl font-semibold text-center text-[#0E4C81] mb-4">
              Reset Your Password
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Password Field */}
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="New password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0E4C81]"
                />
                <div
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <EyeOff className="text-gray-500" /> : <Eye className="text-gray-500" />}
                </div>
              </div>

              {/* Confirm Password Field */}
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0E4C81]"
                />
                <div
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                >
                  {showConfirmPassword ? <EyeOff className="text-gray-500" /> : <Eye className="text-gray-500" />}
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#0E4C81] text-white py-2 rounded-lg hover:bg-[#09385f]"
              >
                Reset Password
              </button>
            </form>
          </>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-[#0E4C81] mb-4">
              Password Reset Successful!
            </h2>
            <p className="mb-6">You can now log in with your new password.</p>
            <button
              onClick={() => navigate('/login')}
              className="bg-[#0E4C81] text-white px-6 py-2 rounded-lg hover:bg-[#09385f]"
            >
              Go to Login
            </button>
          </div>
        )}

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

        {!isResetSuccessful && (
          <div className="mt-6 text-center">
            <a href="/login" className="text-sm text-[#0E4C81] hover:underline">
              Back to login
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
