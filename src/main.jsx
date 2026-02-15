import React from 'react'; // Add this line
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import Home from './Home.jsx';
import { RouterProvider } from 'react-router-dom';
import { router } from './route/Route.jsx';
import { Provider } from "react-redux";
import store from './redux/srore.js';

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <Provider store={store}> 
   <RouterProvider router={router}> 
      <Home />
   </RouterProvider>
    
    </Provider>
  </StrictMode>,
);

