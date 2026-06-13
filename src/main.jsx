import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './route/Route.jsx';
import { Provider } from "react-redux";
import store from './redux/srore.js';
import { ToastProvider } from './hooks/useToast';
import { Toaster } from 'react-hot-toast';

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <Provider store={store}>
        <ToastProvider>
          <RouterProvider router={router} />
          <Toaster position="top-right"
                   toastOptions={{
                     duration: 4000,
                     style: {
                       background: '#363636',
                       color: '#fff',
                     },
                     success: {
                       style: {
                         background: '#10b981',
                       },
                     },
                     error: {
                       style: {
                         background: '#ef4444',
                       },
                     },
                   }} />
        </ToastProvider>
    </Provider>
  </StrictMode>,
);
