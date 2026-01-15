import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const VerifyOtp = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const handleChange = (index, value) => {
    if (value.length > 1) return;
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError('');

    // Auto focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text').slice(0, 6);
    if (!/^\d+$/.test(pasteData)) return;

    const newOtp = [...otp];
    for (let i = 0; i < pasteData.length; i++) {
      newOtp[i] = pasteData[i];
    }
    setOtp(newOtp);
  };

  const handleVerify = () => {
    const otpValue = otp.join('');
    
    if (otpValue.length !== 6) {
      setError('Please enter complete OTP');
      return;
    }

    console.log('Verify OTP:', otpValue);
    // Navigate to update password page or call your API
    navigate('/updatepassword');
  };


  const handleResend = () => {
    console.log('Resend OTP');
    setOtp(['', '', '', '', '', '']);
    setError('');
    // Add your resend OTP logic here
  };

  const handleBack = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-7xl bg-white rounded-2xl overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Left Side - Illustration */}
          <div className="md:w-1/2 bg-gradient-to-br border-r border-[#20BFA9] from-cyan-50 to-teal-50 p-8 md:p-12 flex items-center justify-center">
            <div className="w-full h-full flex items-center justify-center">
              <img 
                src="/image/otp.png" 
                alt="OTP Verification" 
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
                <span className="text-sm font-medium">Back</span>
              </button>

              {/* Header */}
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Verify OTP!</h1>
              <p className="text-gray-600 mb-8">
                We've sent a verification code to your email. Check your inbox and enter the code here.
              </p>

              {/* OTP Input */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4">
                    Enter OTP Code
                  </label>
                  <div className="flex gap-2 justify-between" onPaste={handlePaste}>
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        id={`otp-${index}`}
                        type="text"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        className={`w-12 h-14 text-center text-xl font-semibold border-2 ${
                          error ? 'border-red-500' : 'border-gray-300'
                        } rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition`}
                      />
                    ))}
                  </div>
                  {error && (
                    <p className="mt-2 text-sm text-red-500">{error}</p>
                  )}
                </div>

                {/* Resend OTP */}
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Didn't receive the code?</span>
                  <button
                    onClick={handleResend}
                    className="text-cyan-500 hover:text-cyan-600 font-medium"
                  >
                    Resend
                  </button>
                </div>

                {/* Verify Button */}
                <button
                  onClick={handleVerify}
                  className="w-full bg-gradient-to-r from-cyan-500 to-teal-500 text-white py-3 rounded-lg font-semibold hover:from-cyan-600 hover:to-teal-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  Verify
                </button>
              </div>

              {/* Additional info */}
              <div className="mt-8 text-center">
                <p className="text-sm text-gray-600">
                  The code will expire in <span className="font-semibold text-cyan-600">10 minutes</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;