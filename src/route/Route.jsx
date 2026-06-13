
import { lazy, Suspense } from "react";
import { createBrowserRouter, useOutletContext } from "react-router-dom";
import Home from "../Home";
import ErrorPage from "./ErrorPage";
import AdminRoute from "./AdminRoute";

const PageLoader = () => (
  <div className="flex min-h-[50vh] items-center justify-center">
    <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#0FC3C2] border-t-transparent" />
  </div>
);

const withSuspense = (element) => (
  <Suspense fallback={<PageLoader />}>{element}</Suspense>
);

const ForgotPassword = lazy(() => import("../auth/ForgotPassword"));
const VerifyOtp = lazy(() => import("../auth/VerifyEmail"));
const UpdatePassword = lazy(() => import("../auth/UpdatePassword"));
const Main = lazy(() => import("../layout/Main"));
const DashboardHome = lazy(() => import("../dashboard/home/DashboardHome"));
const Settings = lazy(() => import("../dashboard/sidebarMenu/settings/Settings"));
const PrivacyPolicy = lazy(() => import("../dashboard/sidebarMenu/settings/PrivacyPolicy"));
const EditPrivacy = lazy(() => import("../dashboard/sidebarMenu/settings/EditPrivacy"));
const TermCondition = lazy(() => import("../dashboard/sidebarMenu/settings/TermCondition"));
const EditTermCondition = lazy(() => import("../dashboard/sidebarMenu/settings/EditTermCondition"));
const About = lazy(() => import("../dashboard/sidebarMenu/settings/Aboute"));
const EditAbout = lazy(() => import("../dashboard/sidebarMenu/settings/EditAbout"));
const Notification = lazy(() => import("../dashboard/sidebarMenu/profile/Notification"));
const Profile = lazy(() => import("../dashboard/sidebarMenu/profile/Profile"));
const EditProfiel = lazy(() => import("../dashboard/sidebarMenu/profile/EditProfile"));
const UserListsPage = lazy(() => import("../dashboard/sidebarMenu/Users"));
const UserDetailsPage = lazy(() => import("../dashboard/sidebarMenu/UserDetailsPage"));
const EventAgendaBuilder = lazy(() => import("../dashboard/sidebarMenu/EventManagement"));
const InvitationsPage = lazy(() => import("../dashboard/sidebarMenu/Invitations"));
const ReviewerManagement = lazy(() => import("../dashboard/sidebarMenu/ReviewerManagement"));
const ExhibitorsSponsors = lazy(() => import("../dashboard/sidebarMenu/ExhibitorsSponsors"));
const VolunteerManagementPage = lazy(() => import("../dashboard/sidebarMenu/Volunteers"));
const DocumentManagement = lazy(() => import("../dashboard/sidebarMenu/resoursce/Documents"));
const Photos = lazy(() => import("../dashboard/sidebarMenu/resoursce/Photos"));
const JobPostManagement = lazy(() => import("../dashboard/sidebarMenu/resoursce/JobPost"));
const CreateJobPost = lazy(() => import("../dashboard/sidebarMenu/resoursce/CreateJobPost"));
const EditJobPost = lazy(() => import("../dashboard/sidebarMenu/resoursce/EditJobPost"));
const QAPolls = lazy(() => import("../dashboard/sidebarMenu/resoursce/QaPollSurvey"));
const NoticeAnnouncements = lazy(() => import("../dashboard/sidebarMenu/NoticeAnnouncements"));
const Messages = lazy(() => import("../dashboard/sidebarMenu/Messages"));
const PostersRanking = lazy(() => import("../dashboard/sidebarMenu/Posters"));
const OrganizerGuideline = lazy(() => import("../dashboard/sidebarMenu/settings/OrganizerGuideline"));
const UpdateOrganizerGuideline = lazy(() => import("../dashboard/sidebarMenu/settings/UpdateOrganizerGuideline"));
const AdminUserList = lazy(() => import("../dashboard/sidebarMenu/AdminUserList"));
const AdminEventManagement = lazy(() => import("../dashboard/sidebarMenu/AdminEventsManagement"));
const DashboardOverview = lazy(() => import("../dashboard/home/AdminOverview"));
const EventOverview = lazy(() => import("../dashboard/home/EventOverview"));
const PaymentManagement = lazy(() => import("../dashboard/sidebarMenu/PaymentManagement"));
const VerifiedEmails = lazy(() => import("../dashboard/sidebarMenu/VerifiedEmails"));

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
        element: withSuspense(<ForgotPassword />)
    },
    {
        path: "verifyotp",
        element: withSuspense(<VerifyOtp />)
    },
    {
        path: "updatepassword",
        element: withSuspense(<UpdatePassword />)
    },

    {
        path: "dashboard",
        element: withSuspense(<Main />),
        children: [
            {
                path: "home",
                element: withSuspense(<DashboardHome />)
            },
            {
                path: "admin-home",
                element: withSuspense(<AdminRoute><DashboardOverview /></AdminRoute>)
            },
            {
                path: "admin-events/event-overview/:id",
                element: withSuspense(<AdminRoute><EventOverview /></AdminRoute>)
            },
            {
                path: "users",
                element: withSuspense(<UserListsPage />)
            },

            {
                path: "user-management",
                element: withSuspense(<AdminRoute><AdminUserList /></AdminRoute>)
            },
            {
                path: "users/details/:id",
                element: withSuspense(<UserDetailsPage />)
            },
            {
                path: "admin-events",
                element: withSuspense(<AdminRoute><AdminEventsWrapper /></AdminRoute>)
            },
            {
                path: "invitaitons",
                element: withSuspense(<InvitationsPage />)
            },
            {
                path: "enents",
                element: withSuspense(<EventAgendaBuilder />)
            },
            {
                path: "reviewer-management",
                element: withSuspense(<ReviewerManagement />)
            },
            {
                path: "exhibitors-sponsors",
                element: withSuspense(<ExhibitorsSponsors />)
            },
            {
                path: "volunteers",
                element: withSuspense(<VolunteerManagementPage />)
            },
            {
                path: "resources/documents",
                element: withSuspense(<DocumentManagement />)
            },
            {
                path: "resources/photos",
                element: withSuspense(<Photos />)
            },
            {
                path: "resources/job-posts",
                element: withSuspense(<JobPostManagement />)
            },
            {
                path: "resources/job-posts/create-job",
                element: withSuspense(<CreateJobPost />)
            },
            {
                path: "resources/job-posts/editjob/:id",
                element: withSuspense(<EditJobPost />)
            },
            {
                path: "resources/qa-polls-survey",
                element: withSuspense(<QAPolls />)
            },

            {
                path: 'notice-announcements',
                element: withSuspense(<NoticeAnnouncements />)
            },
            {
                path: 'messages',
                element: withSuspense(<Messages />)
            },
            {
                path: 'posters',
                element: withSuspense(<PostersRanking />)
            },
            {
                path: 'payment-management',
                element: withSuspense(<PaymentManagement />)
            },
            {
                path: 'verified-emails',
                element: withSuspense(<VerifiedEmails />)
            },
            {
                path: 'settings',
                element: withSuspense(<Settings />)
            },
            {
                path:'settings/privacypolicy',
                element: withSuspense(<PrivacyPolicy />)
            },
            {
                path:'settings/organizer-guideline',
                element: withSuspense(<OrganizerGuideline />)
            },
            {
                path:'settings/update-organizerg-uideline',
                element: withSuspense(<UpdateOrganizerGuideline />)
            },

            {
                path:'settings/editprivacypolicy',
                element: withSuspense(<EditPrivacy />)
            },
            {
                path:"settings/termcondition",
                element: withSuspense(<TermCondition />)
            },
            {
                path: "settings/edittermcondition",
                element: withSuspense(<EditTermCondition />)
            },
            {
                path:'settings/about',
                element: withSuspense(<About />)
            },
            {
                path:'settings/editabout',
                element: withSuspense(<EditAbout />)
            },
              {
                path: "notification",
                element: withSuspense(<Notification />)
            },
            {
                path: "settings/profile",
                element: withSuspense(<Profile />)
            },
            {
                path: "dashboard/profile",
                element: withSuspense(<Profile />)
            },
            {
                path: "settings/editprofile",
                element: withSuspense(<EditProfiel />)
            },
            {
                path: "dashboard/editprofile",
                element: withSuspense(<EditProfiel />)
            },


        ]
    }
])
