// src/pages/Signup.jsx
import  { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

import { signup } from "../../services/signupServices";
import Loader from "../../components/Loader"; // Import the Loader component

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
    agencyName: "",
    address: "",
    department: "",
    division: "",
  });

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [toast, setToast] = useState({ message: "", type: "", visible: false });
  const [loading, setLoading] = useState(false); // State to manage the loader
  
  const navigate = useNavigate();

  const showToast = (message, type) => {
    setToast({ message, type, visible: true });
    setTimeout(() => setToast({ ...toast, visible: false }), 5000); // Hide toast after 5 seconds
  };

  const getPasswordStrength = (pwd) => {
    if (pwd.length > 8 && /[A-Z]/.test(pwd) && /[\d\W]/.test(pwd)) return "strong";
    if (pwd.length > 5) return "medium";
    return "weak";
  };

  const strength = getPasswordStrength(password);
  const strengthColor = {
    weak: "bg-red-500 w-1/3",
    medium: "bg-yellow-500 w-2/3",
    strong: "bg-green-500 w-full",
  }[strength];

  const validateInputs = () => {
    if (!form.firstName && ["shipper", "terminal", "shipping_line", "nsc", "vessel_charter"].includes(userType)) {
      showToast("Please enter your first name.", "error");
      return false;
    }
    if (!form.lastName && ["shipper", "terminal", "shipping_line", "nsc", "vessel_charter"].includes(userType)) {
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

    if (
      ["shipper", "terminal", "regulator", "shipping_line", "nsc", "bank", "vessel_charter"].includes(userType) &&
      !password
    ) {
      showToast("Please enter your password.", "error");
      return false;
    }
    if (
      ["shipper", "terminal", "regulator", "shipping_line", "nsc", "bank", "vessel_charter"].includes(userType) &&
      password.length < 6
    ) {
      showToast("Password must be at least 6 characters long.", "error");
      return false;
    }

    if (!form.bankName && userType === "bank") {
      showToast("Please enter your bank name.", "error");
      return false;
    }

    if (!form.agencyName && userType === "regulator") {
      showToast("Please enter your agency name.", "error");
      return false;
    }

    if (!form.department && userType === "nsc") {
      showToast("Please select your department.", "error");
      return false;
    }

    if (form.department === "regulatory" && !form.division) {
      showToast("Please select your division.", "error");
      return false;
    }

    if (!form.address && ["shipper", "terminal", "regulator", "shipping_line", "vessel_charter", "bank"].includes(userType)) {
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
        division: form.division,
        agency_name: form.agencyName,
      };

      setLoading(true); // Show the loader
      const response = await signup(payload);

      if (response.status === 201) {
          setLoading(false); // Hide the loader
          navigate("/whoareyou/email-verification", { state: { userType, email: form.email } });
      } else {
        setLoading(false); // Hide the loader
        showToast(response?.message || "Signup failed. Please try again.", "error");
      }
    } catch (error) {
      console.error(error);
      setLoading(false); // Hide the loader
      showToast("Server error. Try again later.", "error");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center flex-grow space-y-6">
      {loading && <Loader />} {/* Show the loader when loading */}
      <h1 className="text-3xl font-bold">Sign Up with NSC</h1>
      <p className="text-center text-gray-500 mb-8 uppercase tracking-widest">
        {userType}
      </p>

      <form onSubmit={handleSubmit} className="w-full max-w-lg space-y-4">
        {/* Render form fields based on userType */}
        {[ "regulator", "bank"].includes(userType) && (
          <>
             {/* Render form fields based on userType */}
              {userType === "bank" && (
                <input
                  type="text"
                  placeholder="Bank Name"
                  name="bankName"
                  value={form.bankName}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-400 bg-[#f4f6fd] outline-none"
                />
              )}

              {userType === "regulator" && (
                <input
                  type="text"
                  placeholder="Agency Name"
                  name="agencyName"
                  value={form.agencyName}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-400 bg-[#f4f6fd] outline-none"
                />
              )}
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
                type={showPassword ? "text" : "password"}
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

        {["shipper", "terminal", "shipping_line", "nsc", "vessel_charter"].includes(userType) && (
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
            {userType === "nsc" && (
              <>
                <select
                  name="department"
                  value={form.department}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-400 bg-[#f4f6fd] outline-none"
                >
                  <option value="" disabled>
                    Select Your Department
                  </option>
                  <option value="ict">ICT</option>
                  <option value="cad">CAD</option>
                  <option value="sprd">SPRD</option>
                  <option value="es">ES</option>
                  <option value="regulatory">Regulatory</option>
                </select>

                {/* Division Dropdown for Regulatory Department */}
                {form.department === "regulatory" && (
                  <select
                    name="division"
                    value={form.division || ""}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-400 bg-[#f4f6fd] outline-none mt-4"
                  >
                    <option value="" disabled>
                      Select Your Division
                    </option>
                    <option value="m_and_t">M and T</option>
                    <option value="m_and_e">M and E</option>
                    <option value="ssd">SSD</option>
                    <option value="drs">DRS</option>
                  </select>
                )}
              </>
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
                type={showPassword ? "text" : "password"}
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
          className="w-full max-w-[400px] md:max-w-[600px] bg-[#3d5afe] text-white py-4 mt-4 text-lg font-semibold tracking-widest hover:bg-blue-700 transition-all duration-200"
        >
          SIGN UP
        </button>
      </form>

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
