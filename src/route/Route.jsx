
import { createBrowserRouter, useOutletContext } from "react-router-dom";
import Home from "../Home";
import ErrorPage from "./ErrorPage";
import ForgotPassword from "../auth/ForgotPassword";
import VerifyOtp from "../auth/VerifyEmail";
import UpdatePassword from "../auth/UpdatePassword";
import Main from "../layout/Main";
import DashboardHome from "../dashboard/home/DashboardHome";
import Settings from "../dashboard/sidebarMenu/settings/Settings";
import PrivacyPolicy from "../dashboard/sidebarMenu/settings/PrivacyPolicy";
import EditPrivacy from "../dashboard/sidebarMenu/settings/EditPrivacy";
import TermCondition from "../dashboard/sidebarMenu/settings/TermCondition";
import EditTermCondition from "../dashboard/sidebarMenu/settings/EditTermCondition";
import About from "../dashboard/sidebarMenu/settings/Aboute";
import EditAbout from "../dashboard/sidebarMenu/settings/EditAbout";
import Notification from "../dashboard/sidebarMenu/profile/Notification";
import Profile from "../dashboard/sidebarMenu/profile/Profile";
import EditProfiel from "../dashboard/sidebarMenu/profile/EditProfile";
import UserListsPage from "../dashboard/sidebarMenu/Users";

import UserManagement from "../dashboard/sidebarMenu/Users";
import UserDetailsPage from "../dashboard/sidebarMenu/UserDetailsPage";
import EventAgendaBuilder from "../dashboard/sidebarMenu/EventManagement";
import InvitationsPage from "../dashboard/sidebarMenu/Invitations";
import ReviewerManagement from "../dashboard/sidebarMenu/ReviewerManagement";
import ExhibitorsSponsors from "../dashboard/sidebarMenu/ExhibitorsSponsors";
import VolunteerManagementPage from "../dashboard/sidebarMenu/Volunteers";
import DocumentManagement from "../dashboard/sidebarMenu/resoursce/Documents";
import Photos from "../dashboard/sidebarMenu/resoursce/Photos";
import JobPostManagement from "../dashboard/sidebarMenu/resoursce/JobPost";
import CreateJobPost from "../dashboard/sidebarMenu/resoursce/CreateJobPost";
import EditJobPost from "../dashboard/sidebarMenu/resoursce/EditJobPost";
import QAPolls from "../dashboard/sidebarMenu/resoursce/QaPollSurvey";
import NoticeAnnouncements from "../dashboard/sidebarMenu/NoticeAnnouncements";
import Messages from "../dashboard/sidebarMenu/Messages";
import OrganizerGuideline from "../dashboard/sidebarMenu/settings/OrganizerGuideline";
import UpdateOrganizerGuideline from "../dashboard/sidebarMenu/settings/UpdateOrganizerGuideline";
import AdminUserList from "../dashboard/sidebarMenu/AdminUserList";
import AdminEventManagement from "../dashboard/sidebarMenu/AdminEventsManagement";
import DashboardOverview from "../dashboard/home/AdminOverview";
import EventOverview from "../dashboard/home/EventOverview";

// Wrapper component to pass context to AdminEventManagement
function AdminEventsWrapper() {
  const { handleEventSelect } = useOutletContext();
  return <AdminEventManagement onEventSelect={handleEventSelect} />;
}

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Home></Home>,
        errorElement: <ErrorPage />
    },
    {
        path: "forgotpassword",
        element: <ForgotPassword></ForgotPassword>
    },
    {
        path: "verifyotp",
        element: <VerifyOtp></VerifyOtp>
    },
    {
        path: "updatepassword",
        element: <UpdatePassword />
    },

    {
        path: "dashboard",
        element: <Main></Main>,
        children: [
            {
                path: "home",
                element: <DashboardHome />
            },
            {
                path: "admin-home",
                element: <DashboardOverview />
            },
            {
                path: "admin-events/event-overview",
                element: <EventOverview />
            },
            {
                path: "users",
                element: <UserListsPage />
            },

            {
                path: "user-management",
                element: <AdminUserList />
            },
            {
                path: "users/details",
                element: <UserDetailsPage />
            },
            {
                path: "user-management/details",
                element: <UserDetailsPage />
            },
            {
                path: "admin-events",
                element: <AdminEventsWrapper />
            },
            {
                path: "invitaitons",
                element: <InvitationsPage />
            },
            {
                path: "enents",
                element: <EventAgendaBuilder />
            },
            {
                path: "reviewer-management",
                element: <ReviewerManagement />
            },
            {
                path: "exhibitors-sponsors",
                element: <ExhibitorsSponsors />
            },
            {
                path: "volunteers",
                element: <VolunteerManagementPage />
            },
            {
                path: "resources/documents",
                element: <DocumentManagement />
            },
            {
                path: "resources/photos",
                element: <Photos />
            },
            {
                path: "resources/job-posts",
                element: <JobPostManagement />
            },
            {
                path: "resources/job-posts/create-job",
                element: <CreateJobPost />
            },
            {
                path: "resources/job-posts/editjob",
                element: <EditJobPost />
            },
            {
                path: "resources/qa-polls-survey",
                element: <QAPolls />
            },

            {
                path: 'notice-announcements',
                element:<NoticeAnnouncements />
            },
            {
                path: 'messages',
                element:<Messages />
            },
            {
                path: 'settings',
                element:<Settings />
            },
            {
                path:'settings/privacypolicy',
                element:<PrivacyPolicy />
            },
            {
                path:'settings/organizer-guideline',
                element:<OrganizerGuideline />
            },
            {
                path:'settings/update-organizerg-uideline',
                element:<UpdateOrganizerGuideline />
            },

            {
                path:'settings/editprivacypolicy',
                element: <EditPrivacy />
            },
            {
                path:"settings/termcondition",
                element:<TermCondition />
            },
            {
                path: "settings/edittermcondition",
                element: <EditTermCondition />
            },
            {
                path:'settings/about',
                element: <About />
            },
            {
                path:'settings/editabout',
                element:<EditAbout />
            },
              {
                path: "notification",
                element: <Notification />
            },
            {
                path: "settings/profile",
                element: <Profile />
            },
            {
                path: "dashboard/profile",
                element: <Profile />
            },
            {
                path: "settings/editprofile",
                element: <EditProfiel />
            },
            {
                path: "dashboard/editprofile",
                element: <EditProfiel />
            },


        ]
    }
])