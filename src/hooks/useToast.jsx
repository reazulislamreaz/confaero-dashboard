import { useContext, createContext } from 'react';
import toast from 'react-hot-toast';

// Create a context for the toast
const ToastContext = createContext();

// Provider component that wraps the app and makes toast available
export const ToastProvider = ({ children }) => {
  return (
    <ToastContext.Provider value={toast}>
      {children}
    </ToastContext.Provider>
  );
};

// Custom hook to use the toast context
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

// Also make toast globally available on window object
window.toast = toast;

export default toast;