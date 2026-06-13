import React from 'react';
import { useGetStripeStatusQuery, useConnectStripeMutation } from '../../redux/features/paymentSlice/paymentSlice';
import toast from 'react-hot-toast';
import { FaStripeS, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import DashboardPageSkeleton from '../../components/loading/DashboardPageSkeleton';

export default function PaymentManagement() {
  const { data: statusRes, isLoading } = useGetStripeStatusQuery();
  const [connectStripe, { isLoading: isConnecting }] = useConnectStripeMutation();

  const stripeStatus = statusRes?.data;

  const handleConnectStripe = async () => {
    try {
      const res = await connectStripe().unwrap();
      if (res.success && res.data?.onboardingUrl) {
        window.location.href = res.data.onboardingUrl;
      } else {
        toast.error('Failed to get Stripe onboarding URL');
      }
    } catch (err) {
      console.error('Failed to connect Stripe:', err);
      toast.error(err?.data?.message || 'Something went wrong while connecting Stripe');
    }
  };

  if (isLoading) {
    return (
      <div className="bg-gray-50 p-6 min-h-screen">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <h1 className="text-2xl font-semibold text-gray-800 mb-1">Payment Management</h1>
          </div>
          <DashboardPageSkeleton rows={3} columns={3} />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 p-6 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-800 mb-1">Payment Management</h1>
          <p className="text-gray-500 text-sm">Manage your Stripe connect account and payment settings to receive payouts</p>
        </div>

        {/* Status Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-6">
          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
            <div className="bg-[#635BFF] p-4 rounded-xl flex items-center justify-center">
              <FaStripeS className="text-white text-3xl" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-800">Stripe Account Status</h2>
              <p className="text-sm text-gray-500">Connect to receive funds directly from ticket sales</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            {/* Left side stats */}
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium text-gray-700">Connection</span>
                {stripeStatus?.stripeConnected ? (
                  <span className="flex items-center gap-2 text-sm text-green-600 font-semibold bg-green-50 px-3 py-1 rounded-full">
                    <FaCheckCircle /> Connected
                  </span>
                ) : (
                  <span className="flex items-center gap-2 text-sm text-yellow-600 font-semibold bg-yellow-50 px-3 py-1 rounded-full">
                    <FaExclamationCircle /> Disconnected
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium text-gray-700">Charges Enabled</span>
                {stripeStatus?.stripeChargesEnabled ? (
                  <span className="flex items-center gap-2 text-sm text-green-600 font-semibold">
                    <FaCheckCircle /> Yes
                  </span>
                ) : (
                  <span className="flex items-center gap-2 text-sm text-gray-400 font-semibold">
                    <FaExclamationCircle /> No
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium text-gray-700">Payouts Enabled</span>
                {stripeStatus?.stripePayoutsEnabled ? (
                  <span className="flex items-center gap-2 text-sm text-green-600 font-semibold">
                    <FaCheckCircle /> Yes
                  </span>
                ) : (
                  <span className="flex items-center gap-2 text-sm text-gray-400 font-semibold">
                    <FaExclamationCircle /> No
                  </span>
                )}
              </div>
            </div>

            {/* Right side CTA */}
            <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50">
              {stripeStatus?.stripeConnected ? (
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
                    <FaCheckCircle className="text-2xl text-green-500" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Ready for Payouts</h3>
                  <p className="text-sm text-gray-500">Your account is fully verified and connected.</p>
                </div>
              ) : (
                <div className="text-center">
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Needs Setup</h3>
                  <p className="text-sm text-gray-500 mb-4">You need to connect to Stripe or complete your onboarding to receive payouts.</p>
                  <button
                    onClick={handleConnectStripe}
                    disabled={isConnecting}
                    className="flex justify-center items-center px-6 py-2.5 bg-[#635BFF] hover:bg-[#524be0] text-white font-medium rounded-lg transition-colors disabled:opacity-50 min-w-[200px]"
                  >
                    {isConnecting ? 'Generating Link...' : 'Connect Stripe'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
