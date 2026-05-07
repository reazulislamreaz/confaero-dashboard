import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../public/image/logo.png";
import {
  FaDollarSign,
  FaPersonRunning,
  FaRegUser,
  FaSackDollar,
  FaUser,
  FaUserCheck,
  FaUsers,
  FaUsersLine,
} from "react-icons/fa6";
import {
  MdCategory,
  MdOutlineInsertInvitation,
  MdOutlineMedicalServices,
  MdSubscriptions,
} from "react-icons/md";
import { BiMenu, BiSolidDashboard } from "react-icons/bi";
import { HiLogout, HiUsers } from "react-icons/hi";
// import { AiOutlineSafetyCertificate } from "react-icons/ai";
// import { PiGitPullRequestDuotone } from "react-icons/pi";
// import { RiAdminLine, RiSecurePaymentFill } from "react-icons/ri";
import { CiBullhorn, CiSettings } from "react-icons/ci";
import Swal from "sweetalert2";
import { BsCalendarEventFill, BsExclude } from "react-icons/bs";
// import { FaUserAlt, FaUserFriends } from "react-icons/fa";
import { TbUsers, TbUsersGroup, TbShieldCheck } from "react-icons/tb";
// import { GoMail } from "react-icons/go";
// import { ImCoinDollar } from "react-icons/im";
// import { GrAnnounce } from 'react-icons/gr';
import { FiSend, FiUserCheck, FiUserPlus } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import {
  clearSelectedEvent,
  selectEventData,
  selectEventId,
} from "../redux/features/eventSlice/eventSlice";

const Sidebar = ({ isAdmin, hasSelectedEvent = false }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const selectedEventIdFromRedux = useSelector(selectEventId);
  const selectedEventData = useSelector(selectEventData);

  // Determine if an event is currently selected (from Redux or localStorage fallback)
  const eventSelected =
    !!selectedEventIdFromRedux ||
    localStorage.getItem("selectedEventId") !== null;

  // Get selected event name from Redux or localStorage
  const selectedEventName =
    selectedEventData?.title || localStorage.getItem("selectedEventName") || "";

  // Initialize state from localStorage to persist across route changes
  const [isResourcesOpen, setIsResourcesOpen] = useState(() => {
    const savedState = localStorage.getItem("isResourcesOpen");
    return savedState ? JSON.parse(savedState) : false;
  });

  // Event Management dropdown open/close state
  const [isEventManagementOpen, setIsEventManagementOpen] = useState(() => {
    const savedState = localStorage.getItem("isEventManagementOpen");
    return savedState ? JSON.parse(savedState) : false;
  });

  // Auto-open event management when event is selected
  useEffect(() => {
    if (eventSelected) {
      setIsEventManagementOpen(true);
      localStorage.setItem("isEventManagementOpen", "true");
    } else {
      setIsEventManagementOpen(false);
      localStorage.setItem("isEventManagementOpen", "false");
    }
  }, [eventSelected]);

  // Clear selected event when navigating to Dashboard or User Management
  const handleClearEvent = () => {
    dispatch(clearSelectedEvent());
  };

  const handleLogOut = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to log out from here!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, log out!",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("userRole");
        localStorage.removeItem("selectedEventId");
        localStorage.removeItem("selectedEventName");
        localStorage.removeItem("isEventManagementOpen");
        dispatch(clearSelectedEvent());

        Swal.fire({
          title: "Logged Out!",
          text: "User has been logged out successfully.",
          icon: "success",
          timer: 2000,
        });
        navigate("/");
      }
    });
  };

  // Toggle Resources Dropdown
  const toggleResources = () => {
    setIsResourcesOpen(!isResourcesOpen);
  };

  // Toggle Event Management Dropdown
  const toggleEventManagement = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsEventManagementOpen((prev) => {
      const next = !prev;
      localStorage.setItem("isEventManagementOpen", JSON.stringify(next));
      return next;
    });
  };

  // Save state to localStorage whenever isResourcesOpen changes
  useEffect(() => {
    localStorage.setItem("isResourcesOpen", JSON.stringify(isResourcesOpen));
  }, [isResourcesOpen]);

  return (
    <div className="lg:w-[250px] xl:w-[300px] md:w-[200px] sm:w-[120px]  !bg-white border-[#32A69A] w-[120px] flex flex-col justify-between h-full min-h-screen rounded-md">
      <div>
        <div className="p-[10px] grid justify-items-stretch sm:p-[16px]">
          <img
            className="h-16 rounded-lg justify-self-center"
            src={logo}
            alt="Logo"
          />
        </div>

        {/* Selected Event Name Display */}
        {isAdmin && eventSelected && selectedEventName && (
          <div className="mx-3 mb-2 px-3 py-2 bg-[#E6F7F5] border border-[#32A69A] rounded-lg">
            <p className="text-[10px] text-[#32A69A] font-semibold uppercase tracking-wide hidden sm:block">
              Selected Event
            </p>
            <p
              className="text-[12px] font-bold text-[#1e7a72] truncate hidden sm:block"
              title={selectedEventName}
            >
              {selectedEventName}
            </p>
            <BsCalendarEventFill className="h-5 w-5 text-[#32A69A] sm:hidden mx-auto" />
          </div>
        )}

        <div className="ml-5">
          <ul>
            {/* Dashboard */}
            <NavLink
              to="home"
              onClick={isAdmin ? handleClearEvent : undefined}
              className={({ isActive }) =>
                isActive
                  ? "flex cursor-pointer items-center text-[18px] font-medium p-[10px] bg-[#32A69A] text-[#F6F6F6] m-[6px] rounded-lg"
                  : "flex text-[#252525] bg-[#F6F6F6] cursor-pointer items-center text-[18px] font-medium p-[10px] m-[6px] rounded-lg"
              }
            >
              <BiSolidDashboard className="h-7 w-7 lg:h-5 lg:w-5" />
              <span className="hidden ml-2 sm:block">Dashboard</span>
            </NavLink>

            {isAdmin ? (
              <div>
                {/* User Management */}
                <NavLink
                  to="user-management"
                  onClick={handleClearEvent}
                  className={({ isActive }) =>
                    isActive
                      ? "flex p-[10px] m-[6px] cursor-pointer items-center font-medium bg-[#32A69A] text-[#F6F6F6] rounded-lg"
                      : "flex text-[#252525] bg-[#F6F6F6] p-[10px] m-[6px] cursor-pointer items-center font-medium rounded-lg"
                  }
                >
                  <FaRegUser className="h-7 w-7 lg:h-5 lg:w-5" />
                  <span className="hidden ml-2 sm:block">User Management</span>
                </NavLink>

                {/* Events Management - always visible, collapsible with arrow */}
                <li className="mb-[6px]">
                  <NavLink
                    to="admin-events"
                    className={({ isActive }) =>
                      isActive
                        ? "flex p-[10px] m-[6px] cursor-pointer items-center font-medium bg-[#32A69A] text-[#F6F6F6] rounded-lg"
                        : "flex text-[#252525] bg-[#F6F6F6] p-[10px] m-[6px] cursor-pointer items-center font-medium rounded-lg"
                    }
                  >
                    <BsCalendarEventFill className="h-7 w-7 lg:h-5 lg:w-5 flex-shrink-0" />
                    <span className="hidden ml-2 sm:block">
                      Events Management
                    </span>
                    {/* Down/Up arrow - visible when event selected, toggles sub-routes */}
                    {eventSelected && (
                      <span
                        className="ml-auto hidden sm:block"
                        onClick={toggleEventManagement}
                      >
                        {isEventManagementOpen ? (
                          <svg
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        ) : (
                          <svg
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </span>
                    )}
                  </NavLink>

                  {/* Event sub-routes - shown when event is selected and expanded */}
                  {eventSelected && isEventManagementOpen && (
                    <ul className="ml-2 mt-1 space-y-1">
                      <NavLink
                        to="users"
                        className={({ isActive }) =>
                          isActive
                            ? "flex p-[10px] m-[6px] cursor-pointer items-center font-medium bg-[#32A69A] text-[#F6F6F6] rounded-lg"
                            : "flex text-[#252525] bg-[#F6F6F6] p-[10px] m-[6px] cursor-pointer items-center font-medium rounded-lg"
                        }
                      >
                        <FaRegUser className="h-7 w-7 lg:h-5 lg:w-5" />
                        <span className="hidden ml-2 sm:block">
                          Registration
                        </span>
                      </NavLink>

                      <NavLink
                        to="invitaitons"
                        className={({ isActive }) =>
                          isActive
                            ? "flex p-[8px] m-[4px] cursor-pointer items-center font-medium bg-[#32A69A] text-[#F6F6F6] rounded-lg text-sm"
                            : "flex text-[#252525] bg-[#F6F6F6] p-[8px] m-[4px] cursor-pointer items-center font-medium rounded-lg text-sm"
                        }
                      >
                        <FiSend className="h-5 w-5 lg:h-4 lg:w-4 flex-shrink-0" />
                        <span className="hidden ml-2 sm:block">
                          Invitations
                        </span>
                      </NavLink>

                      <NavLink
                        to="enents"
                        className={({ isActive }) =>
                          isActive
                            ? "flex p-[8px] m-[4px] cursor-pointer items-center font-medium bg-[#32A69A] text-[#F6F6F6] rounded-lg text-sm"
                            : "flex text-[#252525] bg-[#F6F6F6] p-[8px] m-[4px] cursor-pointer items-center font-medium rounded-lg text-sm"
                        }
                      >
                        <MdOutlineInsertInvitation className="h-5 w-5 lg:h-4 lg:w-4 flex-shrink-0" />
                        <span className="hidden ml-2 sm:block">
                          Event Details & Agenda
                        </span>
                      </NavLink>

                      {/* ADD THIS */}
                      <NavLink
                        to="verified-emails"
                        className={({ isActive }) =>
                          isActive
                            ? "flex p-[8px] m-[4px] cursor-pointer items-center font-medium bg-[#32A69A] text-[#F6F6F6] rounded-lg text-sm"
                            : "flex text-[#252525] bg-[#F6F6F6] p-[8px] m-[4px] cursor-pointer items-center font-medium rounded-lg text-sm"
                        }
                      >
                        <TbShieldCheck className="h-5 w-5 lg:h-4 lg:w-4 flex-shrink-0" />
                        <span className="hidden ml-2 sm:block">
                          Verified Emails
                        </span>
                      </NavLink>

                      {/* Payment Management  */}

                      {/* <NavLink
  to="payment-management"
  className={({ isActive }) =>
    isActive
      ? "flex p-[8px] m-[4px] cursor-pointer items-center font-medium bg-[#32A69A] text-[#F6F6F6] rounded-lg text-sm"
      : "flex text-[#252525] bg-[#F6F6F6] p-[8px] m-[4px] cursor-pointer items-center font-medium rounded-lg text-sm"
  }
>
  <FaDollarSign className="h-5 w-5 lg:h-4 lg:w-4 flex-shrink-0" />
  <span className="hidden ml-2 sm:block">Payment Management</span>
</NavLink> */}

                      <NavLink
                        to="reviewer-management"
                        className={({ isActive }) =>
                          isActive
                            ? "flex p-[8px] m-[4px] cursor-pointer items-center font-medium bg-[#32A69A] text-[#F6F6F6] rounded-lg text-sm"
                            : "flex text-[#252525] bg-[#F6F6F6] p-[8px] m-[4px] cursor-pointer items-center font-medium rounded-lg text-sm"
                        }
                      >
                        <FiUserCheck className="h-5 w-5 lg:h-4 lg:w-4 flex-shrink-0" />
                        <span className="hidden ml-2 sm:block">
                          Reviewer Management
                        </span>
                      </NavLink>

                      <NavLink
                        to="exhibitors-sponsors"
                        className={({ isActive }) =>
                          isActive
                            ? "flex p-[8px] m-[4px] cursor-pointer items-center font-medium bg-[#32A69A] text-[#F6F6F6] rounded-lg text-sm"
                            : "flex text-[#252525] bg-[#F6F6F6] p-[8px] m-[4px] cursor-pointer items-center font-medium rounded-lg text-sm"
                        }
                      >
                        <TbUsers className="h-5 w-5 lg:h-4 lg:w-4 flex-shrink-0" />
                        <span className="hidden ml-2 sm:block">
                          Exhibitors & Sponsors
                        </span>
                      </NavLink>

                      <NavLink
                        to="volunteers"
                        className={({ isActive }) =>
                          isActive
                            ? "flex p-[8px] m-[4px] cursor-pointer items-center font-medium bg-[#32A69A] text-[#F6F6F6] rounded-lg text-sm"
                            : "flex text-[#252525] bg-[#F6F6F6] p-[8px] m-[4px] cursor-pointer items-center font-medium rounded-lg text-sm"
                        }
                      >
                        <FiUserPlus className="h-5 w-5 lg:h-4 lg:w-4 flex-shrink-0" />
                        <span className="hidden ml-2 sm:block">Volunteers</span>
                      </NavLink>

                      {/* Resources Dropdown */}
                      <li className="mb-[4px]">
                        <button
                          onClick={toggleResources}
                          className={`flex w-full items-center text-sm font-medium p-[8px] rounded-lg ${
                            isResourcesOpen
                              ? "bg-[#32A69A] text-[#F6F6F6]"
                              : "text-[#252525] bg-[#F6F6F6] hover:bg-gray-100"
                          }`}
                        >
                          <TbUsersGroup className="h-5 w-5 lg:h-4 lg:w-4 flex-shrink-0" />
                          <span className="hidden ml-2 sm:block">
                            Resources
                          </span>
                          <span className="ml-auto">
                            {isResourcesOpen ? (
                              <svg
                                className="w-4 h-4"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            ) : (
                              <svg
                                className="w-4 h-4"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            )}
                          </span>
                        </button>
                        {isResourcesOpen && (
                          <ul className="ml-4 mt-1 space-y-1">
                            {[
                              {
                                path: "resources/documents",
                                label: "Documents",
                              },
                              { path: "resources/photos", label: "Photos" },
                              {
                                path: "resources/job-posts",
                                label: "Job Posts",
                              },
                              {
                                path: "resources/qa-polls-survey",
                                label: "Q/A, Polls & Survey",
                              },
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
                                <span className="hidden ml-2 sm:block">
                                  {item.label}
                                </span>
                              </NavLink>
                            ))}
                          </ul>
                        )}
                      </li>

                      <NavLink
                        to="notice-announcements"
                        className={({ isActive }) =>
                          isActive
                            ? "flex p-[8px] m-[4px] cursor-pointer items-center font-medium bg-[#32A69A] text-[#F6F6F6] rounded-lg text-sm"
                            : "flex text-[#252525] bg-[#F6F6F6] p-[8px] m-[4px] cursor-pointer items-center font-medium rounded-lg text-sm"
                        }
                      >
                        <CiBullhorn className="h-5 w-5 lg:h-4 lg:w-4 flex-shrink-0" />
                        <span className="hidden ml-2 sm:block">
                          Announcements
                        </span>
                      </NavLink>
                    </ul>
                  )}
                </li>
              </div>
            ) : (
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
                  <span className="hidden ml-2 sm:block">
                    Event Details & Agenda
                  </span>
                </NavLink>

                {/* Verified Emails */}
                <NavLink
                  to="verified-emails"
                  className={({ isActive }) =>
                    isActive
                      ? "flex p-[10px] m-[6px] cursor-pointer items-center font-medium bg-[#32A69A] text-[#F6F6F6] rounded-lg"
                      : "flex text-[#252525] bg-[#F6F6F6] p-[10px] m-[6px] cursor-pointer items-center font-medium rounded-lg"
                  }
                >
                  <TbShieldCheck className="h-7 w-7 lg:h-5 lg:w-5" />
                  <span className="hidden ml-2 sm:block">Verified Emails</span>
                </NavLink>

                {/* Payment Management */}
                <NavLink
                  to="payment-management"
                  className={({ isActive }) =>
                    isActive
                      ? "flex p-[10px] m-[6px] cursor-pointer items-center font-medium bg-[#32A69A] text-[#F6F6F6] rounded-lg"
                      : "flex text-[#252525] bg-[#F6F6F6] p-[10px] m-[6px] cursor-pointer items-center font-medium rounded-lg"
                  }
                >
                  <FaDollarSign className="h-7 w-7 lg:h-5 lg:w-5" />
                  <span className="hidden ml-2 sm:block">
                    Payment Management
                  </span>
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
                  <span className="hidden ml-2 sm:block">
                    Reviewer Management
                  </span>
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
                  <span className="hidden ml-2 sm:block">
                    Exhibitors & Sponsors
                  </span>
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
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
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
                        {
                          path: "resources/qa-polls-survey",
                          label: "Q/A, Polls & Survey",
                        },
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
                          <span className="hidden ml-2 sm:block">
                            {item.label}
                          </span>
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
            )}

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
