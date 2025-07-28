import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Home/Authentication/Login";
import Register from "../pages/Home/Authentication/Register";
import DashboardLayout from "../layouts/DashboardLayout";
import AddClassPage from "../pages/Dashboard/AddClassPage";
import AddSlotPage from "../pages/Dashboard/AddSlotPage";
import ManageSlotsPage from "../pages/Dashboard/ManageSlotsPage";
import AllTrainersPage from "../pages/Home/AllTrainerPage/AllTrainersPage";
import TrainerDetailsPage from "../pages/Dashboard/TrainerDetailsPage";
import BeTrainerPage from "../pages/Dashboard/BeTrainerPage";
import AppliedTrainersPage from "../pages/Dashboard/AppliedTrainersPage";
import TrainerBookingPage from "../pages/Home/TrainerBookingPage/TrainerBookingPage";
import TrainerBookedPage from "../pages/Dashboard/TrainerBookedPage";
import PaymentPage from "../pages/Dashboard/Payment/PaymentPage";
import ProfilePage from "../pages/Dashboard/ProfilePage";
import ActivityLogPage from "../pages/Dashboard/ActivityLogPage";
import AllSubscribersPage from "../pages/Dashboard/AllSubscribersPage";
import ForumPage from "../pages/Home/ForumPage/ForumPage";
import AddForum from './../pages/Dashboard/AddForum';
import AllClassesPage from "../pages/Home/AllClassesPage/AllClassesPage";
import AllTrainersDash from "../pages/Dashboard/AllTrainersDash";
import BalancePage from "../pages/Dashboard/BalancePage";
import PrivateRoute from "../routes/PrivateRoute";
import Forbidden from "../pages/Forbidden/Forbidden";
import AdminRoute from "../routes/AdminRoute";
import ErrorPage from './../pages/ErrorPage/ErrorPage';



export const router = createBrowserRouter([
    {
        path: "/",
        Component: RootLayout,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                 path: "/trainers",
                 element: <AllTrainersPage></AllTrainersPage>,
            },
            {
                 path: "/trainer/:id",
                 element: <TrainerDetailsPage></TrainerDetailsPage>,
            },
            {
                path: "/trainer-book/:slotId",
                element: <PrivateRoute><TrainerBookingPage></TrainerBookingPage></PrivateRoute>,
            },
            {
                path: "/classes",
                element: <AllClassesPage></AllClassesPage>,
            },
            {
                path: "/forum",
                element: <ForumPage></ForumPage>,
            },
            {
                path: '/auth/login',
                element: <Login></Login>,
            },
            {
                path: '/auth/register',
                element: <Register></Register>,
            },
            {
                path:'/forbidden',
                Component: Forbidden,
            },
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
        children: [
            {
                path: "/dashboard/add-class",
                element: <AdminRoute><AddClassPage></AddClassPage></AdminRoute>,
            },
            {
                path: "/dashboard/add-slot",
                element: <AddSlotPage></AddSlotPage>,
            },
            {
                path: "/dashboard/manage-slots",
                element: <ManageSlotsPage></ManageSlotsPage>,
            },
            {
                path: "/dashboard/be-a-trainer",
                element: <BeTrainerPage></BeTrainerPage>,
            },
            {
                path: "/dashboard/applied-trainers",
                element: <AdminRoute><AppliedTrainersPage></AppliedTrainersPage></AdminRoute>,
            },
            {
                path: "/dashboard/booked-trainer",
                element: <TrainerBookedPage></TrainerBookedPage>,
            },
            {
                path: "/dashboard/payment/:slotId",
                element: <PaymentPage></PaymentPage>,
            },
            {
                path: "/dashboard/profile",
                element: <ProfilePage></ProfilePage>,
            },
            {
                path: "/dashboard/activity-log",
                element: <ActivityLogPage></ActivityLogPage>,
            },
            {
                path: "/dashboard/all-subscribers",
                element: <AdminRoute><AllSubscribersPage></AllSubscribersPage></AdminRoute>,
            },
            {
                path: "/dashboard/add-forum",
                element: <AddForum></AddForum>,
            },
            {
                path: "/dashboard/all-trainers",
                element: <AdminRoute><AllTrainersDash></AllTrainersDash></AdminRoute>,
            },
            {
                path: "/dashboard/balance",
                element: <AdminRoute><BalancePage></BalancePage></AdminRoute>,
            },
        ]
    }
]);