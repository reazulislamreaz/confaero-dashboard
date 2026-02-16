import React from 'react';
import { useToast } from '../hooks/useToast';

const ToastExample = () => {
  const toast = useToast();

  const showToastMessage = () => {
    toast.success('This is a success message!');
  };

  const showError = () => {
    toast.error('This is an error message!');
  };

  const showInfo = () => {
    toast('This is an info message!');
  };

  const showCustom = () => {
    toast.loading('Loading...');
    setTimeout(() => {
      toast.dismiss(); // Remove the loading toast
      toast.success('Operation completed!');
    }, 2000);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Toast Examples</h2>
      <div className="space-y-2">
        <button 
          onClick={showToastMessage}
          className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded mr-2"
        >
          Show Success
        </button>
        <button 
          onClick={showError}
          className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded mr-2"
        >
          Show Error
        </button>
        <button 
          onClick={showInfo}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mr-2"
        >
          Show Info
        </button>
        <button 
          onClick={showCustom}
          className="bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded"
        >
          Show Loading
        </button>
      </div>
    </div>
  );
};

export default ToastExample;