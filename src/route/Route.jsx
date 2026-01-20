
import { createBrowserRouter } from "react-router-dom";
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
                path: "users",
                element: <UserListsPage />
            },
            {
                path: "users/details",
                element: <UserDetailsPage />
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
                element: <DocumentManagement />
            },
            {
                path: "resources/qa-polls-survey",
                element: <DocumentManagement />
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