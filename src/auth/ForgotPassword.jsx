import React, { useState } from 'react';
import { Mail, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
 const navigate = useNavigate();
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = () => {
    if (!email) {
      setError('Email is Required');
      return;
    }
    
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setError('');
    console.log('Send OTP to:', email);
    // Navigate to verify OTP page or call your API
    navigate('/verifyotp');
  };

  const handleBack = () => {
    window.history.back();
    // Or use: navigate('/') if you're using react-router
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-7xl bg-white rounded-2xl overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Left Side - Illustration */}
          <div className="md:w-1/2 bg-gradient-to-br border-r border-[#20BFA9] from-cyan-50 to-teal-50 p-8 md:p-12 flex items-center justify-center">
            <div className="w-full h-full flex items-center justify-center">
              <img 
                src="/public/image/forgotpass.png" 
                alt="Forgot Password" 
                className="w-full h-auto max-w-md object-contain"
              />
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="md:w-1/2 p-8 md:p-12 flex items-center">
            <div className="w-full max-w-md mx-auto">
              {/* Back button */}
              <button
                onClick={handleBack}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="text-sm font-medium">Back to Login</span>
              </button>

              {/* Header */}
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Forgot Password!</h1>
              <p className="text-gray-600 mb-8">
                Enter your email address to get a verification code for resetting your password.
              </p>

              {/* Form */}
              <div className="space-y-6">
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
                        setError('');
                      }}
                      placeholder="Enter your email"
                      className={`w-full pl-10 pr-4 py-3 border ${
                        error ? 'border-red-500' : 'border-gray-300'
                      } rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition`}
                    />
                  </div>
                  {error && (
                    <p className="mt-2 text-sm text-red-500">{error}</p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  onClick={handleSubmit}
                  className="w-full bg-[#0FC3C2] text-white py-3 rounded-lg font-semibold cursor-pointer transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  Send OTP
                </button>
              </div>

              {/* Additional info */}
              <div className="mt-8 text-center">
                <p className="text-sm text-gray-600">
                  Remember your password?{' '}
                  <button
                    onClick={handleBack}
                    className="text-cyan-500 hover:text-cyan-600 font-medium"
                  >
                    Sign in
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;