import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAdminLoginMutation } from "../redux/features/authSlice/authSlice";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const [login, { isLoading }] = useAdminLoginMutation();
  const handleSubmit = async (e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    const newErrors = {};

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!password) {
      newErrors.password = "Password is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const data = {
      email: email,
      password: password,
    };
    console.log(data);

    try {
      const response = await login(data).unwrap();

      console.log("Login response:", response);

      if (response.success === true) {
        localStorage.setItem("token", response.data.accessToken);
        localStorage.setItem("userRole", response.data.activeRole);
        console.log("Saved userRole:", response.data.activeRole);
        console.log(
          "Current localStorage userRole:",
          localStorage.getItem("userRole"),
        );
        toast.success(response.message);
      }
      navigate("/dashboard/home");
    } catch (error) {
      console.error("Login error:", error);

      const message = error?.data?.message || "Incorrect password. Please try again.";

      setErrors({ general: message });

      toast.error(message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      {/* <Toaster position="top-right" reverseOrder={false} /> */}
      <div className="w-full max-w-7xl bg-white rounded-2xl overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Left Side - Logo and Branding */}
          <div className="md:w-1/2  p-12 border-r border-[#20BFA9] flex flex-col justify-center items-center text-white">
            <img className=" " src="/image/logo.png" alt="Logo" />
          </div>

          {/* Right Side - Login Form */}
          <div className="md:w-1/2 p-8 md:p-12">
            <div className="max-w-md mx-auto">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Login to Account!
              </h1>
              <p className="text-gray-600 mb-8">
                Please enter your email and password to continue.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                {errors.general && (
                  <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
                    <p className="text-red-700 text-sm font-medium">{errors.general}</p>
                  </div>
                )}
                {/* Email Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setErrors({ ...errors, email: "" });
                      }}
                      placeholder="smithshel@gamil.com"
                      className={`w-full pl-10 pr-4 py-3 border ${
                        errors.email ? "border-red-500" : "border-gray-300"
                      } rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition`}
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                  )}
                </div>

                {/* Password Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setErrors({ ...errors, password: "" });
                      }}
                      placeholder="••••••••"
                      className={`w-full pl-10 pr-12 py-3 border ${
                        errors.password ? "border-red-500" : "border-gray-300"
                      } rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.password}
                    </p>
                  )}
                </div>

                {/* Remember Me and Forgot Password */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 text-cyan-600 border-gray-300 rounded focus:ring-cyan-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      Remember me
                    </span>
                  </label>
                  <button
                    type="button"
                    onClick={() => navigate("/forgotpassword")}
                    className="text-sm text-cyan-500 cursor-pointer hover:text-cyan-600 font-medium"
                  >
                    Forgot password?
                  </button>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#0FC3C2] text-white  py-3 rounded-lg font-semibold   transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Signing in..." : "Sign in"}
                </button>
              </form>

              <div className="mt-8 flex flex-wrap justify-center gap-x-4 gap-y-2 border-t border-gray-100 pt-6 text-center text-sm text-gray-500">
                <button
                  type="button"
                  onClick={() => navigate("/about-us")}
                  className="hover:text-[#0FC3C2]"
                >
                  About Us
                </button>
                <button
                  type="button"
                  onClick={() => navigate("/privacy-policy")}
                  className="hover:text-[#0FC3C2]"
                >
                  Privacy Policy
                </button>
                <button
                  type="button"
                  onClick={() => navigate("/terms-of-service")}
                  className="hover:text-[#0FC3C2]"
                >
                  Terms of Service
                </button>
                <button
                  type="button"
                  onClick={() => navigate("/delete-account")}
                  className="hover:text-[#0FC3C2]"
                >
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
