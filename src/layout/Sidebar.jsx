
import React, { useState } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import logo from '../../public/image/logo.png';
import { FaDollarSign, FaPersonRunning, FaRegUser, FaSackDollar, FaUser, FaUserCheck, FaUsers, FaUsersLine } from "react-icons/fa6";
import { MdCategory, MdOutlineInsertInvitation, MdOutlineMedicalServices, MdSubscriptions } from "react-icons/md";
import { BiMenu, BiSolidDashboard } from "react-icons/bi";
import { HiLogout, HiUsers } from "react-icons/hi";
import { AiOutlineSafetyCertificate } from "react-icons/ai";
import { PiGitPullRequestDuotone } from "react-icons/pi";
import { RiAdminLine, RiSecurePaymentFill } from "react-icons/ri";
import { CiBullhorn, CiSettings } from "react-icons/ci";
import Swal from "sweetalert2";
import { SiMagento } from "react-icons/si";
import { BsCalendarEventFill, BsExclude } from "react-icons/bs";
import { FaUserAlt, FaUserFriends } from "react-icons/fa";
import { TbTestPipe2, TbUsers, TbUsersGroup } from "react-icons/tb";
import { GoMail } from "react-icons/go";
import { ImCoinDollar } from "react-icons/im";
import { GrAnnounce } from 'react-icons/gr';
import { FiSend, FiUserCheck, FiUserPlus } from 'react-icons/fi';

const Sidebar = ({ isAdmin, hasSelectedEvent = false }) => {
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

        <div className="ml-5">
          <ul>
            {/* Dashboard */}
            <NavLink
              to="home"
              className={({ isActive }) =>
                isActive
                  ? "flex cursor-pointer items-center text-[18px] font-medium p-[10px] bg-[#32A69A] text-[#F6F6F6] m-[6px] rounded-lg"
                  : "flex text-[#252525] bg-[#F6F6F6] cursor-pointer items-center text-[18px] font-medium p-[10px] m-[6px] rounded-lg"
              }
            >
              <BiSolidDashboard className="h-7 w-7 lg:h-5 lg:w-5" />
              <span className="hidden ml-2 sm:block">Dashboard</span>
            </NavLink>
            {
              isAdmin ? (
                <NavLink
                  to="user-management"
                  className={({ isActive }) =>
                    isActive
                      ? "flex p-[10px] m-[6px] cursor-pointer items-center font-medium bg-[#32A69A] text-[#F6F6F6] rounded-lg"
                      : "flex text-[#252525] bg-[#F6F6F6] p-[10px] m-[6px] cursor-pointer items-center font-medium rounded-lg"
                  }
                >
                  <FaRegUser className="h-7 w-7 lg:h-5 lg:w-5" />
                  <span className="hidden ml-2 sm:block">User Management</span>
                </NavLink>
              ): (
                ""
              )
            }
               

            {/* Registration User, admin Users*/}
            {
              isAdmin ? (
                hasSelectedEvent ? (
                  // Show event-specific menu when an event is selected by admin
                  <div>
                    {/* Event-specific navigation items - excluding user management */}
                    <NavLink
                      to="admin-events"
                      className={({ isActive }) =>
                        isActive
                          ? "flex p-[10px] m-[6px] cursor-pointer items-center font-medium bg-[#32A69A] text-[#F6F6F6] rounded-lg"
                          : "flex text-[#252525] bg-[#F6F6F6] p-[10px] m-[6px] cursor-pointer items-center font-medium rounded-lg"
                      }
                    >
                     <BsCalendarEventFill className="h-7 w-7 lg:h-5 lg:w-5" />
                      <span className="hidden ml-2 sm:block">Events Management</span>
                    </NavLink>

                    {/* Additional event-specific menu items could be added here */}
                    <NavLink
                      to="invitaitons"
                      className={({ isActive }) =>
                        isActive
                          ? "flex p-[10px] m-[6px] cursor-pointer items-center font-medium bg-[#32A69A] text-[#F6F6F6] rounded-lg"
                          : "flex text-[#252525] bg-[#F6F6F6] p-[10px] m-[6px] cursor-pointer items-center font-medium rounded-lg"
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
                          : "flex text-[#252525] bg-[#F6F6F6] p-[10px] m-[6px] cursor-pointer items-center font-medium rounded-lg"
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
                          : "flex text-[#252525] bg-[#F6F6F6] p-[10px] m-[6px] cursor-pointer items-center font-medium rounded-lg"
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
                          : "flex text-[#252525] bg-[#F6F6F6] p-[10px] m-[6px] cursor-pointer items-center font-medium rounded-lg"
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
                          : "flex text-[#252525] bg-[#F6F6F6] p-[10px] m-[6px] cursor-pointer items-center font-medium rounded-lg"
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
                            : "text-[#252525] bg-[#F6F6F6] hover:bg-gray-100"
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
                                  ? "flex items-center text-sm font-medium p-[8px] bg-[#BFE3E0] text-teal-800 rounded-md"
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
                      to="notice-announcements"
                      className={({ isActive }) =>
                        isActive
                          ? "flex p-[10px] m-[6px] cursor-pointer items-center font-medium bg-[#32A69A] text-[#F6F6F6] rounded-lg"
                          : "flex text-[#252525] bg-[#F6F6F6] p-[10px] m-[6px] cursor-pointer items-center font-medium rounded-lg"
                      }
                    >
                      <GrAnnounce className="h-7 w-7 lg:h-5 lg:w-5" />
                      <span className="hidden ml-2 sm:block">Announcements</span>
                    </NavLink>
                  </div>
                ) : (
                  // Show full admin menu when no event is selected
                  <div>
                   

                    <NavLink
                  to="admin-events"
                  className={({ isActive }) =>
                    isActive
                      ? "flex p-[10px] m-[6px] cursor-pointer items-center font-medium bg-[#32A69A] text-[#F6F6F6] rounded-lg"
                      : "flex text-[#252525] bg-[#F6F6F6] p-[10px] m-[6px] cursor-pointer items-center font-medium rounded-lg"
                  }
                >
                 <BsCalendarEventFill className="h-7 w-7 lg:h-5 lg:w-5" />
                  <span className="hidden ml-2 sm:block">Events Management</span>
                </NavLink>
                  </div>
                )
              ): (
                <div>
                   <NavLink
              to="users"
              className={({ isActive }) =>
                isActive
                  ? "flex p-[10px] m-[6px] cursor-pointer items-center font-medium bg-[#32A69A] text-[#F6F6F6] rounded-lg"
                  : "flex text-[#252525] bg-[#F6F6F6] p-[10px] m-[6px] cursor-pointer items-center font-medium rounded-lg"
              }
            >
              <FaRegUser className="h-7 w-7 lg:h-5 lg:w-5" />
              <span className="hidden ml-2 sm:block">Registration</span>
            </NavLink>

                   {/* Invitations */}
            <NavLink
              to="invitaitons"
              className={({ isActive }) =>
                isActive
                  ? "flex p-[10px] m-[6px] cursor-pointer items-center font-medium bg-[#32A69A] text-[#F6F6F6] rounded-lg"
                  : "flex text-[#252525] bg-[#F6F6F6] p-[10px] m-[6px] cursor-pointer items-center font-medium rounded-lg"
              }
            >
             <FiSend className="h-7 w-7 lg:h-5 lg:w-5" />
              <span className="hidden ml-2 sm:block">Invitations</span>
            </NavLink>

            {/* Event Details & Agenda */}
            <NavLink
              to="enents"
              className={({ isActive }) =>
                isActive
                  ? "flex p-[10px] m-[6px] cursor-pointer items-center font-medium bg-[#32A69A] text-[#F6F6F6] rounded-lg"
                  : "flex text-[#252525] bg-[#F6F6F6] p-[10px] m-[6px] cursor-pointer items-center font-medium rounded-lg"
              }
            >
              <MdOutlineInsertInvitation className="h-7 w-7 lg:h-5 lg:w-5" />
              <span className="hidden ml-2 sm:block">Event Details & Agenda</span>
            </NavLink>

            {/* Reviewer Management */}
            <NavLink
              to="reviewer-management"
              className={({ isActive }) =>
                isActive
                  ? "flex p-[10px] m-[6px] cursor-pointer items-center font-medium bg-[#32A69A] text-[#F6F6F6] rounded-lg"
                  : "flex text-[#252525] bg-[#F6F6F6] p-[10px] m-[6px] cursor-pointer items-center font-medium rounded-lg"
              }
            >
             <FiUserCheck className="h-7 w-7 lg:h-5 lg:w-5" />
              <span className="hidden ml-2 sm:block">Reviewer Management</span>
            </NavLink>

            {/* Exhibitors & Sponsors */}
            <NavLink
              to="exhibitors-sponsors"
              className={({ isActive }) =>
                isActive
                  ? "flex p-[10px] m-[6px] cursor-pointer items-center font-medium bg-[#32A69A] text-[#F6F6F6] rounded-lg"
                  : "flex text-[#252525] bg-[#F6F6F6] p-[10px] m-[6px] cursor-pointer items-center font-medium rounded-lg"
              }
            >
              <TbUsers className="h-7 w-7 lg:h-5 lg:w-5" />
              <span className="hidden ml-2 sm:block">Exhibitors & Sponsors</span>
            </NavLink>

            {/* Volunteers */}
            <NavLink
              to="volunteers"
              className={({ isActive }) =>
                isActive
                  ? "flex p-[10px] m-[6px] cursor-pointer items-center font-medium bg-[#32A69A] text-[#F6F6F6] rounded-lg"
                  : "flex text-[#252525] bg-[#F6F6F6] p-[10px] m-[6px] cursor-pointer items-center font-medium rounded-lg"
              }
            >
             <FiUserPlus className="h-7 w-7 lg:h-5 lg:w-5" />
              <span className="hidden ml-2 sm:block">Volunteers</span>
            </NavLink>

            {/* Resources (Dropdown) */}
            <li className="mb-[6px]">
              <button
                onClick={toggleResources}
                className={`flex w-full items-center text-[18px] font-medium p-[10px] rounded-lg ${
                  isResourcesOpen
                    ? "bg-[#32A69A] text-[#F6F6F6]"
                    : "text-[#252525] bg-[#F6F6F6] hover:bg-gray-100"
                }`}
              >
                <TbUsersGroup className="h-7 w-7 lg:h-5 lg:w-5" />
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
                          ? "flex items-center text-sm font-medium p-[8px] bg-[#BFE3E0] text-teal-800 rounded-md"
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
              to="notice-announcements"
              className={({ isActive }) =>
                isActive
                  ? "flex p-[10px] m-[6px] cursor-pointer items-center font-medium bg-[#32A69A] text-[#F6F6F6] rounded-lg"
                  : "flex text-[#252525] bg-[#F6F6F6] p-[10px] m-[6px] cursor-pointer items-center font-medium rounded-lg"
              }
            >
              <CiBullhorn className="h-7 w-7 lg:h-5 lg:w-5" />
              <span className="hidden ml-2 sm:block">Announcements</span>
            </NavLink>


                </div>
              )
            }





            {/* Settings */}
            <NavLink
              to="settings"
              className={({ isActive }) =>
                isActive
                  ? "flex p-[10px] m-[6px] cursor-pointer items-center text-[18px] font-medium bg-[#32A69A] text-[#F6F6F6] rounded-lg"
                  : "flex text-[#252525] bg-[#F6F6F6] p-[10px] m-[6px] cursor-pointer items-center text-[18px] font-medium rounded-lg"
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