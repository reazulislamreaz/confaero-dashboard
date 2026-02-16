import { Outlet, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import toast from 'react-hot-toast';

import Sidebar from "./Sidebar";
import Header from "./Header";

// Mock function to determine if user is admin - in a real app, this would come from auth context
// const isAdmin = true;
const isAdmin = false;

const Main = () => {
  const [hasSelectedEvent, setHasSelectedEvent] = useState(false);
  const location = useLocation();

  const handleEventSelect = (event) => {
    setHasSelectedEvent(true);
  };

  const resetEventSelection = () => {
    setHasSelectedEvent(false);
  };

  // Reset event selection when navigating away from admin events page
  useEffect(() => {
    if (!location.pathname.includes('admin-events')) {
      setHasSelectedEvent(false);
    }
  }, [location.pathname]);

  return (
    <div>
      <div className="flex p-4 min-h-screen">
        <div className="fixed z-30 w-[200px] left-3">
          <Sidebar isAdmin={isAdmin} hasSelectedEvent={hasSelectedEvent} />
        </div>
        <div className="flex flex-col flex-1 overflow-hidden">

          <div className=" fixed xl:ml-[310px] lg:ml-[250px] md:ml-[200px] sm:ml-[120px] ml-[120px] w-[75%] mx-auto z-30  lg:w-[calc(98%-300px)]">
            <Header />
          </div>

          <div className="overflow-y-auto ml-8 mt-12 h-full flex-1 pt-[80px] lg:pl-[280px] md:pl-[220px] sm:pl-[160px] pl-[120px]">
            <Outlet context={{ handleEventSelect, resetEventSelection }} />
          </div>
        </div>

      </div>
    </div>
  );
};

export default Main;

