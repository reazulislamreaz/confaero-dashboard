
import { Suspense } from "react";
import { createBrowserRouter, useOutletContext } from "react-router-dom";
import Home from "../Home";
import ErrorPage from "./ErrorPage";
import AdminRoute from "./AdminRoute";
import lazyWithRetry from "../utils/lazyWithRetry";
import {
  AuthPageLoader,
  DashboardPageSkeleton,
  DashboardShellSkeleton,
} from "../components/loading";

const authPage = (element) => (
  <Suspense fallback={<AuthPageLoader />}>{element}</Suspense>
);

const dashboardShell = (element) => (
  <Suspense fallback={<DashboardShellSkeleton />}>{element}</Suspense>
);

const dashboardPage = (element) => (
  <Suspense fallback={<DashboardPageSkeleton />}>{element}</Suspense>
);

const ForgotPassword = lazyWithRetry(() => import("../auth/ForgotPassword"));
const VerifyOtp = lazyWithRetry(() => import("../auth/VerifyEmail"));
const UpdatePassword = lazyWithRetry(() => import("../auth/UpdatePassword"));
const Main = lazyWithRetry(() => import("../layout/Main"));
const DashboardHome = lazyWithRetry(() => import("../dashboard/home/DashboardHome"));
const Settings = lazyWithRetry(() => import("../dashboard/sidebarMenu/settings/Settings"));
const PrivacyPolicy = lazyWithRetry(() => import("../dashboard/sidebarMenu/settings/PrivacyPolicy"));
const EditPrivacy = lazyWithRetry(() => import("../dashboard/sidebarMenu/settings/EditPrivacy"));
const TermCondition = lazyWithRetry(() => import("../dashboard/sidebarMenu/settings/TermCondition"));
const EditTermCondition = lazyWithRetry(() => import("../dashboard/sidebarMenu/settings/EditTermCondition"));
const About = lazyWithRetry(() => import("../dashboard/sidebarMenu/settings/Aboute"));
const EditAbout = lazyWithRetry(() => import("../dashboard/sidebarMenu/settings/EditAbout"));
const Notification = lazyWithRetry(() => import("../dashboard/sidebarMenu/profile/Notification"));
const Profile = lazyWithRetry(() => import("../dashboard/sidebarMenu/profile/Profile"));
const EditProfiel = lazyWithRetry(() => import("../dashboard/sidebarMenu/profile/EditProfile"));
const UserListsPage = lazyWithRetry(() => import("../dashboard/sidebarMenu/Users"));
const UserDetailsPage = lazyWithRetry(() => import("../dashboard/sidebarMenu/UserDetailsPage"));
const EventAgendaBuilder = lazyWithRetry(() => import("../dashboard/sidebarMenu/EventManagement"));
const InvitationsPage = lazyWithRetry(() => import("../dashboard/sidebarMenu/Invitations"));
const ReviewerManagement = lazyWithRetry(() => import("../dashboard/sidebarMenu/ReviewerManagement"));
const ExhibitorsSponsors = lazyWithRetry(() => import("../dashboard/sidebarMenu/ExhibitorsSponsors"));
const VolunteerManagementPage = lazyWithRetry(() => import("../dashboard/sidebarMenu/Volunteers"));
const DocumentManagement = lazyWithRetry(() => import("../dashboard/sidebarMenu/resoursce/Documents"));
const Photos = lazyWithRetry(() => import("../dashboard/sidebarMenu/resoursce/Photos"));
const JobPostManagement = lazyWithRetry(() => import("../dashboard/sidebarMenu/resoursce/JobPost"));
const CreateJobPost = lazyWithRetry(() => import("../dashboard/sidebarMenu/resoursce/CreateJobPost"));
const EditJobPost = lazyWithRetry(() => import("../dashboard/sidebarMenu/resoursce/EditJobPost"));
const QAPolls = lazyWithRetry(() => import("../dashboard/sidebarMenu/resoursce/QaPollSurvey"));
const NoticeAnnouncements = lazyWithRetry(() => import("../dashboard/sidebarMenu/NoticeAnnouncements"));
const Messages = lazyWithRetry(() => import("../dashboard/sidebarMenu/Messages"));
const PostersRanking = lazyWithRetry(() => import("../dashboard/sidebarMenu/Posters"));
const OrganizerGuideline = lazyWithRetry(() => import("../dashboard/sidebarMenu/settings/OrganizerGuideline"));
const UpdateOrganizerGuideline = lazyWithRetry(() => import("../dashboard/sidebarMenu/settings/UpdateOrganizerGuideline"));
const AdminUserList = lazyWithRetry(() => import("../dashboard/sidebarMenu/AdminUserList"));
const AdminEventManagement = lazyWithRetry(() => import("../dashboard/sidebarMenu/AdminEventsManagement"));
const DashboardOverview = lazyWithRetry(() => import("../dashboard/home/AdminOverview"));
const EventOverview = lazyWithRetry(() => import("../dashboard/home/EventOverview"));
const PaymentManagement = lazyWithRetry(() => import("../dashboard/sidebarMenu/PaymentManagement"));
const VerifiedEmails = lazyWithRetry(() => import("../dashboard/sidebarMenu/VerifiedEmails"));

function AdminEventsWrapper() {
  const { handleEventSelect, resetEventSelection } = useOutletContext();
  return (
    <AdminEventManagement
      onEventSelect={handleEventSelect}
      resetEventSelection={resetEventSelection}
    />
  );
}

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Home></Home>,
        errorElement: <ErrorPage />
    },
    {
        path: "forgotpassword",
        element: authPage(<ForgotPassword />)
    },
    {
        path: "verifyotp",
        element: authPage(<VerifyOtp />)
    },
    {
        path: "updatepassword",
        element: authPage(<UpdatePassword />)
    },

    {
        path: "dashboard",
        element: dashboardShell(<Main />),
        errorElement: <ErrorPage />,
        children: [
            {
                path: "home",
                element: dashboardPage(<DashboardHome />)
            },
            {
                path: "admin-home",
                element: dashboardPage(<AdminRoute><DashboardOverview /></AdminRoute>)
            },
            {
                path: "admin-events/event-overview/:id",
                element: dashboardPage(<AdminRoute><EventOverview /></AdminRoute>)
            },
            {
                path: "users",
                element: dashboardPage(<UserListsPage />)
            },

            {
                path: "user-management",
                element: dashboardPage(<AdminRoute><AdminUserList /></AdminRoute>)
            },
            {
                path: "users/details/:id",
                element: dashboardPage(<UserDetailsPage />)
            },
            {
                path: "admin-events",
                element: dashboardPage(<AdminRoute><AdminEventsWrapper /></AdminRoute>)
            },
            {
                path: "invitaitons",
                element: dashboardPage(<InvitationsPage />)
            },
            {
                path: "enents",
                element: dashboardPage(<EventAgendaBuilder />)
            },
            {
                path: "reviewer-management",
                element: dashboardPage(<ReviewerManagement />)
            },
            {
                path: "exhibitors-sponsors",
                element: dashboardPage(<ExhibitorsSponsors />)
            },
            {
                path: "volunteers",
                element: dashboardPage(<VolunteerManagementPage />)
            },
            {
                path: "resources/documents",
                element: dashboardPage(<DocumentManagement />)
            },
            {
                path: "resources/photos",
                element: dashboardPage(<Photos />)
            },
            {
                path: "resources/job-posts",
                element: dashboardPage(<JobPostManagement />)
            },
            {
                path: "resources/job-posts/create-job",
                element: dashboardPage(<CreateJobPost />)
            },
            {
                path: "resources/job-posts/editjob/:id",
                element: dashboardPage(<EditJobPost />)
            },
            {
                path: "resources/qa-polls-survey",
                element: dashboardPage(<QAPolls />)
            },

            {
                path: 'notice-announcements',
                element: dashboardPage(<NoticeAnnouncements />)
            },
            {
                path: 'messages',
                element: dashboardPage(<Messages />)
            },
            {
                path: 'posters',
                element: dashboardPage(<PostersRanking />)
            },
            {
                path: 'payment-management',
                element: dashboardPage(<PaymentManagement />)
            },
            {
                path: 'verified-emails',
                element: dashboardPage(<VerifiedEmails />)
            },
            {
                path: 'settings',
                element: dashboardPage(<Settings />)
            },
            {
                path:'settings/privacypolicy',
                element: dashboardPage(<PrivacyPolicy />)
            },
            {
                path:'settings/organizer-guideline',
                element: dashboardPage(<OrganizerGuideline />)
            },
            {
                path:'settings/update-organizerg-uideline',
                element: dashboardPage(<UpdateOrganizerGuideline />)
            },

            {
                path:'settings/editprivacypolicy',
                element: dashboardPage(<EditPrivacy />)
            },
            {
                path:"settings/termcondition",
                element: dashboardPage(<TermCondition />)
            },
            {
                path: "settings/edittermcondition",
                element: dashboardPage(<EditTermCondition />)
            },
            {
                path:'settings/about',
                element: dashboardPage(<About />)
            },
            {
                path:'settings/editabout',
                element: dashboardPage(<EditAbout />)
            },
              {
                path: "notification",
                element: dashboardPage(<Notification />)
            },
            {
                path: "settings/profile",
                element: dashboardPage(<Profile />)
            },
            {
                path: "dashboard/profile",
                element: dashboardPage(<Profile />)
            },
            {
                path: "settings/editprofile",
                element: dashboardPage(<EditProfiel />)
            },
            {
                path: "dashboard/editprofile",
                element: dashboardPage(<EditProfiel />)
            },


        ]
    }
])
