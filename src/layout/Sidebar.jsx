 

// import { NavLink, useNavigate } from "react-router-dom";
// import logo from '../../public/image/logo.png'
// // import logo from '../../public/image/logo.png'
// import { FaDollarSign, FaPersonRunning, FaSackDollar, FaUser, FaUsers, FaUsersLine } from "react-icons/fa6";
// import { MdCategory, MdOutlineMedicalServices, MdSubscriptions } from "react-icons/md";
// import { BiMenu, BiSolidDashboard } from "react-icons/bi";
// import { HiLogout } from "react-icons/hi";
// import { AiOutlineSafetyCertificate } from "react-icons/ai";
// import { PiGitPullRequestDuotone } from "react-icons/pi";
// import { RiAdminLine, RiSecurePaymentFill } from "react-icons/ri";
// import { CiSettings } from "react-icons/ci";
// import Swal from "sweetalert2";
// import { SiMagento } from "react-icons/si";
// import { BsExclude } from "react-icons/bs";
// import { FaUserAlt, FaUserFriends } from "react-icons/fa";
// import { TbTestPipe2 } from "react-icons/tb";
// import { GoMail } from "react-icons/go";
// import { ImCoinDollar } from "react-icons/im";

// const Sidebar = () => {

//   const navigate = useNavigate();

//   const handleLogOut = () => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to log out from here!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, log out!"
//     }).then((result) => {
//       if (result.isConfirmed) {
//         localStorage.removeItem('token');
//         localStorage.removeItem('user');

//         Swal.fire({
//           title: "Logged Out!",
//           text: "User has been logged out successfully.",
//           icon: "success",
//           timer: 2000
//         });
//         navigate('/');
//       }
//     });
//   };

//   return (
//     <div className="lg:w-[250px] xl:w-[300px] md:w-[200px] sm:w-[120px] border-r-2 !bg-[] border-[#32A69A] w-[120px] flex flex-col justify-between h-full min-h-screen rounded-md">
//       <div>
//         <div className="p-[10px] grid justify-items-stretch  sm:p-[16px]">
//           <img className="h-16 rounded-lg justify-self-center" src={logo} alt="Logo" />
         
//           {/* <hr className="w-full mt-4 text-[#54D496] hidden sm:block" /> */}
//         </div>
//         <div className="ml-5 mt-8">
//           <ul>
//             <NavLink
//               to="home"
//               className={({ isActive }) =>
//                 isActive
//                   ? "flex cursor-pointer items-center text-[18px] font-medium p-[10px] bg-[#32A69A] text-[#F6F6F6] m-[6px] rounded-lg"
//                   : "flex text-[#252525] cursor-pointer items-center text-[18px] font-medium p-[10px] m-[6px] rounded-lg"
//               }
//             >
//               <BiSolidDashboard className="h-7 w-7 lg:h-5 lg:w-5"/>
//               <span className="hidden ml-2 sm:block">Dashboard</span>
//             </NavLink>
 
//             <NavLink
//               to="users"
//               className={({ isActive }) =>
//                 isActive
//                   ? "flex p-[10px] m-[6px] cursor-pointer items-center font-medium bg-[#32A69A] text-[#F6F6F6] rounded-lg"
//                   : "flex text-[#252525] p-[10px] m-[6px] cursor-pointer items-center font-medium  rounded-lg"
//               }
//             >
//               <FaUsers className="h-7 w-7 lg:h-5 lg:w-5" />
//               <span className="hidden ml-2 sm:block">Registration</span>
//             </NavLink>

//           <NavLink
//               to="invitaitons"
//               className={({ isActive }) =>
//                 isActive
//                   ? "flex p-[10px] m-[6px] cursor-pointer items-center font-medium bg-[#32A69A] text-[#F6F6F6] rounded-lg"
//                   : "flex text-[#252525] p-[10px] m-[6px] cursor-pointer items-center font-medium  rounded-lg"
//               }
//             >
//               <ImCoinDollar className="h-7 w-7 lg:h-5 lg:w-5" />
//               <span className="hidden ml-2 sm:block">Invitations</span>
//             </NavLink>

//           <NavLink
//               to="enents"
//               className={({ isActive }) =>
//                 isActive
//                   ? "flex p-[10px] m-[6px] cursor-pointer items-center font-medium bg-[#32A69A] text-[#F6F6F6] rounded-lg"
//                   : "flex text-[#252525] p-[10px] m-[6px] cursor-pointer items-center font-medium  rounded-lg"
//               }
//             >
//               <ImCoinDollar className="h-7 w-7 lg:h-5 lg:w-5" />
//               <span className="hidden ml-2 sm:block">Event Details & Agenda</span>
//             </NavLink>

//           <NavLink
//               to="reviewer-management"
//               className={({ isActive }) =>
//                 isActive
//                   ? "flex p-[10px] m-[6px] cursor-pointer items-center font-medium bg-[#32A69A] text-[#F6F6F6] rounded-lg"
//                   : "flex text-[#252525] p-[10px] m-[6px] cursor-pointer items-center font-medium  rounded-lg"
//               }
//             >
//               <ImCoinDollar className="h-7 w-7 lg:h-5 lg:w-5" />
//               <span className="hidden ml-2 sm:block">Reviewer Management</span>
//             </NavLink>

//           <NavLink
//               to="exhibitors-sponsors"
//               className={({ isActive }) =>
//                 isActive
//                   ? "flex p-[10px] m-[6px] cursor-pointer items-center font-medium bg-[#32A69A] text-[#F6F6F6] rounded-lg"
//                   : "flex text-[#252525] p-[10px] m-[6px] cursor-pointer items-center font-medium  rounded-lg"
//               }
//             >
//               <ImCoinDollar className="h-7 w-7 lg:h-5 lg:w-5" />
//               <span className="hidden ml-2 sm:block">Exhibitors & Sponsors</span>
//             </NavLink>

//           <NavLink
//               to="volunteers"
//               className={({ isActive }) =>
//                 isActive
//                   ? "flex p-[10px] m-[6px] cursor-pointer items-center font-medium bg-[#32A69A] text-[#F6F6F6] rounded-lg"
//                   : "flex text-[#252525] p-[10px] m-[6px] cursor-pointer items-center font-medium  rounded-lg"
//               }
//             >
//               <ImCoinDollar className="h-7 w-7 lg:h-5 lg:w-5" />
//               <span className="hidden ml-2 sm:block">Volunteers</span>
//             </NavLink>

      


//             <NavLink
//               to="settings"
//               className={({ isActive }) =>
//                 isActive
//                   ? "flex p-[10px] m-[6px] cursor-pointer items-center text-[18px] font-medium bg-[#32A69A] text-[#F6F6F6] rounded-lg"
//                   : "flex text-[#252525] p-[10px] m-[6px] cursor-pointer items-center text-[18px] font-medium   rounded-lg"
//               }
//             >
//               <CiSettings className="h-8 w-8 lg:h-5 lg:w-5" />
//               <span className="hidden ml-2 sm:block">Settings</span>
//             </NavLink>

//           </ul>

//         </div>
//       </div>
//       {/* <div className="mb-[60px] mt-2">
//         <div
//           onClick={handleLogOut}
//           className="flex items-center ml-[18px] cursor-pointer gap-2 text-[#942020] font-medium"
//         >
//           <HiLogout className="h-8 w-8 lg:h-5 lg:w-5" />
//           <span className="hidden sm:block text-[20px]">Log Out</span>
//         </div>
//       </div> */}
//     </div>
//   );
// };

// export default Sidebar;



import React, { useState } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import logo from '../../public/image/logo.png';
import { FaDollarSign, FaPersonRunning, FaSackDollar, FaUser, FaUsers, FaUsersLine } from "react-icons/fa6";
import { MdCategory, MdOutlineMedicalServices, MdSubscriptions } from "react-icons/md";
import { BiMenu, BiSolidDashboard } from "react-icons/bi";
import { HiLogout } from "react-icons/hi";
import { AiOutlineSafetyCertificate } from "react-icons/ai";
import { PiGitPullRequestDuotone } from "react-icons/pi";
import { RiAdminLine, RiSecurePaymentFill } from "react-icons/ri";
import { CiSettings } from "react-icons/ci";
import Swal from "sweetalert2";
import { SiMagento } from "react-icons/si";
import { BsExclude } from "react-icons/bs";
import { FaUserAlt, FaUserFriends } from "react-icons/fa";
import { TbTestPipe2 } from "react-icons/tb";
import { GoMail } from "react-icons/go";
import { ImCoinDollar } from "react-icons/im";

const Sidebar = () => {
  const navigate = useNavigate();
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);

  const handleLogOut = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to log out from here!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, log out!"
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');

        Swal.fire({
          title: "Logged Out!",
          text: "User has been logged out successfully.",
          icon: "success",
          timer: 2000
        });
        navigate('/');
      }
    });
  };

  // Toggle Resources Dropdown
  const toggleResources = () => {
    setIsResourcesOpen(!isResourcesOpen);
  };

  return (
    <div className="lg:w-[250px] xl:w-[300px] md:w-[200px] sm:w-[120px] border-r-2 !bg-white border-[#32A69A] w-[120px] flex flex-col justify-between h-full min-h-screen rounded-md">
      <div>
        <div className="p-[10px] grid justify-items-stretch sm:p-[16px]">
          <img className="h-16 rounded-lg justify-self-center" src={logo} alt="Logo" />
        </div>

        <div className="ml-5 mt-8">
          <ul>
            {/* Dashboard */}
            <NavLink
              to="home"
              className={({ isActive }) =>
                isActive
                  ? "flex cursor-pointer items-center text-[18px] font-medium p-[10px] bg-[#32A69A] text-[#F6F6F6] m-[6px] rounded-lg"
                  : "flex text-[#252525] cursor-pointer items-center text-[18px] font-medium p-[10px] m-[6px] rounded-lg"
              }
            >
              <BiSolidDashboard className="h-7 w-7 lg:h-5 lg:w-5" />
              <span className="hidden ml-2 sm:block">Dashboard</span>
            </NavLink>

            {/* Registration */}
            <NavLink
              to="users"
              className={({ isActive }) =>
                isActive
                  ? "flex p-[10px] m-[6px] cursor-pointer items-center font-medium bg-[#32A69A] text-[#F6F6F6] rounded-lg"
                  : "flex text-[#252525] p-[10px] m-[6px] cursor-pointer items-center font-medium rounded-lg"
              }
            >
              <FaUsers className="h-7 w-7 lg:h-5 lg:w-5" />
              <span className="hidden ml-2 sm:block">Registration</span>
            </NavLink>

            {/* Invitations */}
            <NavLink
              to="invitaitons"
              className={({ isActive }) =>
                isActive
                  ? "flex p-[10px] m-[6px] cursor-pointer items-center font-medium bg-[#32A69A] text-[#F6F6F6] rounded-lg"
                  : "flex text-[#252525] p-[10px] m-[6px] cursor-pointer items-center font-medium rounded-lg"
              }
            >
              <ImCoinDollar className="h-7 w-7 lg:h-5 lg:w-5" />
              <span className="hidden ml-2 sm:block">Invitations</span>
            </NavLink>

            {/* Event Details & Agenda */}
            <NavLink
              to="enents"
              className={({ isActive }) =>
                isActive
                  ? "flex p-[10px] m-[6px] cursor-pointer items-center font-medium bg-[#32A69A] text-[#F6F6F6] rounded-lg"
                  : "flex text-[#252525] p-[10px] m-[6px] cursor-pointer items-center font-medium rounded-lg"
              }
            >
              <ImCoinDollar className="h-7 w-7 lg:h-5 lg:w-5" />
              <span className="hidden ml-2 sm:block">Event Details & Agenda</span>
            </NavLink>

            {/* Reviewer Management */}
            <NavLink
              to="reviewer-management"
              className={({ isActive }) =>
                isActive
                  ? "flex p-[10px] m-[6px] cursor-pointer items-center font-medium bg-[#32A69A] text-[#F6F6F6] rounded-lg"
                  : "flex text-[#252525] p-[10px] m-[6px] cursor-pointer items-center font-medium rounded-lg"
              }
            >
              <ImCoinDollar className="h-7 w-7 lg:h-5 lg:w-5" />
              <span className="hidden ml-2 sm:block">Reviewer Management</span>
            </NavLink>

            {/* Exhibitors & Sponsors */}
            <NavLink
              to="exhibitors-sponsors"
              className={({ isActive }) =>
                isActive
                  ? "flex p-[10px] m-[6px] cursor-pointer items-center font-medium bg-[#32A69A] text-[#F6F6F6] rounded-lg"
                  : "flex text-[#252525] p-[10px] m-[6px] cursor-pointer items-center font-medium rounded-lg"
              }
            >
              <ImCoinDollar className="h-7 w-7 lg:h-5 lg:w-5" />
              <span className="hidden ml-2 sm:block">Exhibitors & Sponsors</span>
            </NavLink>

            {/* Volunteers */}
            <NavLink
              to="volunteers"
              className={({ isActive }) =>
                isActive
                  ? "flex p-[10px] m-[6px] cursor-pointer items-center font-medium bg-[#32A69A] text-[#F6F6F6] rounded-lg"
                  : "flex text-[#252525] p-[10px] m-[6px] cursor-pointer items-center font-medium rounded-lg"
              }
            >
              <ImCoinDollar className="h-7 w-7 lg:h-5 lg:w-5" />
              <span className="hidden ml-2 sm:block">Volunteers</span>
            </NavLink>

            {/* Resources (Dropdown) */}
            <li className="mb-[6px]">
              <button
                onClick={toggleResources}
                className={`flex w-full items-center text-[18px] font-medium p-[10px] rounded-lg ${
                  isResourcesOpen
                    ? "bg-[#32A69A] text-[#F6F6F6]"
                    : "text-[#252525] hover:bg-gray-100"
                }`}
              >
                <TbTestPipe2 className="h-7 w-7 lg:h-5 lg:w-5" />
                <span className="hidden ml-2 sm:block">Resources</span>
                <span className="ml-auto">
                  {isResourcesOpen ? (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  )}
                </span>
              </button>

              {/* Submenu */}
              {isResourcesOpen && (
                <ul className="ml-4 mt-1 space-y-1">
                  {[
                    { path: "resources/documents", label: "Documents" },
                    { path: "resources/photos", label: "Photos" },
                    { path: "resources/job-posts", label: "Job Posts" },
                    { path: "resources/qa-polls-survey", label: "Q/A, Polls & Survey" },
                  ].map((item) => (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      className={({ isActive }) =>
                        isActive
                          ? "flex items-center text-sm font-medium p-[8px] bg-teal-400 text-teal-800 rounded-md"
                          : "flex items-center text-sm font-medium p-[8px] text-gray-700 hover:bg-gray-100 rounded-md"
                      }
                    >
                      <span className="hidden ml-2 sm:block">{item.label}</span>
                    </NavLink>
                  ))}
                </ul>
              )}
            </li>

            {/* Announcements */}
            <NavLink
              to="announcements"
              className={({ isActive }) =>
                isActive
                  ? "flex p-[10px] m-[6px] cursor-pointer items-center font-medium bg-[#32A69A] text-[#F6F6F6] rounded-lg"
                  : "flex text-[#252525] p-[10px] m-[6px] cursor-pointer items-center font-medium rounded-lg"
              }
            >
              <AiOutlineSafetyCertificate className="h-7 w-7 lg:h-5 lg:w-5" />
              <span className="hidden ml-2 sm:block">Announcements</span>
            </NavLink>

            {/* Settings */}
            <NavLink
              to="settings"
              className={({ isActive }) =>
                isActive
                  ? "flex p-[10px] m-[6px] cursor-pointer items-center text-[18px] font-medium bg-[#32A69A] text-[#F6F6F6] rounded-lg"
                  : "flex text-[#252525] p-[10px] m-[6px] cursor-pointer items-center text-[18px] font-medium rounded-lg"
              }
            >
              <CiSettings className="h-8 w-8 lg:h-5 lg:w-5" />
              <span className="hidden ml-2 sm:block">Settings</span>
            </NavLink>
          </ul>
        </div>
      </div>

      {/* Bottom Section: Log Out */}
      <div className="mb-[60px] mt-2">
        <div
          onClick={handleLogOut}
          className="flex items-center ml-[18px] cursor-pointer gap-2 text-[#942020] font-medium"
        >
          <HiLogout className="h-8 w-8 lg:h-5 lg:w-5" />
          <span className="hidden sm:block text-[20px]">Log Out</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;