 

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
import { 
  LayoutDashboard, 
  UserPlus, 
  Mail, 
  Calendar, 
  UserCheck, 
  Store, 
  Users, 
  ChevronDown,
  ChevronUp,
  FileText,
  Image,
  Briefcase,
  MessageSquare,
  Volume2,
  Settings,
  LogOut
} from 'lucide-react';
import Swal from "sweetalert2";
import logo from '../../public/image/logo.png';

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

  return (
    <div className="w-[250px] border-r border-gray-200 bg-white flex flex-col justify-between h-full min-h-screen">
      <div>
        {/* Logo */}
        <div className="p-4 border-b border-gray-200">
          <img className="h-14 rounded-lg mx-auto" src={logo} alt="Logo" />
        </div>

        {/* Navigation */}
        <nav className="p-2 mt-2">
          <ul className="space-y-1">
            <NavLink
              to="home"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center gap-3 px-4 py-2.5 bg-gray-100 text-gray-900 rounded-lg font-medium"
                  : "flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-gray-50 rounded-lg font-medium"
              }
            >
              <LayoutDashboard className="w-5 h-5" />
              <span>Dashboard</span>
            </NavLink>

            <NavLink
              to="users"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center gap-3 px-4 py-2.5 bg-gray-100 text-gray-900 rounded-lg font-medium"
                  : "flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-gray-50 rounded-lg font-medium"
              }
            >
              <UserPlus className="w-5 h-5" />
              <span>Registration</span>
            </NavLink>

            <NavLink
              to="invitations"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center gap-3 px-4 py-2.5 bg-gray-100 text-gray-900 rounded-lg font-medium"
                  : "flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-gray-50 rounded-lg font-medium"
              }
            >
              <Mail className="w-5 h-5" />
              <span>Invitations</span>
            </NavLink>

            <NavLink
              to="events"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center gap-3 px-4 py-2.5 bg-gray-100 text-gray-900 rounded-lg font-medium"
                  : "flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-gray-50 rounded-lg font-medium"
              }
            >
              <Calendar className="w-5 h-5" />
              <span>Event Details & Agenda</span>
            </NavLink>

            <NavLink
              to="reviewer-management"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center gap-3 px-4 py-2.5 bg-gray-100 text-gray-900 rounded-lg font-medium"
                  : "flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-gray-50 rounded-lg font-medium"
              }
            >
              <UserCheck className="w-5 h-5" />
              <span>Reviewer Management</span>
            </NavLink>

            <NavLink
              to="exhibitors-sponsors"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center gap-3 px-4 py-2.5 bg-gray-100 text-gray-900 rounded-lg font-medium"
                  : "flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-gray-50 rounded-lg font-medium"
              }
            >
              <Store className="w-5 h-5" />
              <span>Exhibitors & Sponsors</span>
            </NavLink>

            <NavLink
              to="volunteers"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center gap-3 px-4 py-2.5 bg-gray-100 text-gray-900 rounded-lg font-medium"
                  : "flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-gray-50 rounded-lg font-medium"
              }
            >
              <Users className="w-5 h-5" />
              <span>Volunteers</span>
            </NavLink>

            {/* Resources Dropdown */}
            <li>
              <button
                onClick={() => setIsResourcesOpen(!isResourcesOpen)}
                className="flex items-center justify-between w-full px-4 py-2.5 text-white bg-teal-600 rounded-lg font-medium hover:bg-teal-700 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5" />
                  <span>resources</span>
                </div>
                {isResourcesOpen ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>

              {/* Dropdown Menu */}
              {isResourcesOpen && (
                <ul className="mt-1 ml-4 space-y-1 bg-gray-50 rounded-lg p-2">
                  <NavLink
                    to="resources/documents"
                    className={({ isActive }) =>
                      isActive
                        ? "flex items-center gap-3 px-4 py-2 bg-white text-gray-900 rounded-lg text-sm"
                        : "flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-white rounded-lg text-sm"
                    }
                  >
                    <FileText className="w-4 h-4" />
                    <span>Documents</span>
                  </NavLink>

                  <NavLink
                    to="resources/photos"
                    className={({ isActive }) =>
                      isActive
                        ? "flex items-center gap-3 px-4 py-2 bg-white text-gray-900 rounded-lg text-sm"
                        : "flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-white rounded-lg text-sm"
                    }
                  >
                    <Image className="w-4 h-4" />
                    <span>Photos</span>
                  </NavLink>

                  <NavLink
                    to="resources/job-posts"
                    className={({ isActive }) =>
                      isActive
                        ? "flex items-center gap-3 px-4 py-2 bg-white text-gray-900 rounded-lg text-sm"
                        : "flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-white rounded-lg text-sm"
                    }
                  >
                    <Briefcase className="w-4 h-4" />
                    <span>Job Posts</span>
                  </NavLink>

                  <NavLink
                    to="resources/qa-polls-survey"
                    className={({ isActive }) =>
                      isActive
                        ? "flex items-center gap-3 px-4 py-2 bg-white text-gray-900 rounded-lg text-sm"
                        : "flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-white rounded-lg text-sm"
                    }
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Q/A, Polls & Survey</span>
                  </NavLink>
                </ul>
              )}
            </li>

            <NavLink
              to="announcements"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center gap-3 px-4 py-2.5 bg-gray-100 text-gray-900 rounded-lg font-medium"
                  : "flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-gray-50 rounded-lg font-medium"
              }
            >
              <Volume2 className="w-5 h-5" />
              <span>Announcements</span>
            </NavLink>

            <NavLink
              to="settings"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center gap-3 px-4 py-2.5 bg-gray-100 text-gray-900 rounded-lg font-medium"
                  : "flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-gray-50 rounded-lg font-medium"
              }
            >
              <Settings className="w-5 h-5" />
              <span>Setting</span>
            </NavLink>
          </ul>
        </nav>
      </div>

      {/* Logout */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={handleLogOut}
          className="flex items-center gap-3 px-4 py-2.5 text-red-600 hover:bg-red-50 rounded-lg font-medium w-full transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span>Log Out</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
