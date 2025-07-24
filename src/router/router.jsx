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

export const router = createBrowserRouter([
    {
        path: "/",
        Component: RootLayout,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                 path: "/trainers",
                 element: <AllTrainersPage></AllTrainersPage>
            },
            {
                 path: "/trainer/:id",
                 element: <TrainerDetailsPage></TrainerDetailsPage>
            },
            {
                path: "/trainer-book/:slotId",
                element: <TrainerBookingPage></TrainerBookingPage>
            },
            {
                path: '/auth/login',
                element: <Login></Login>,
            },
            {
                path: '/auth/register',
                element: <Register></Register>,
            },
        ]
    },
    {
        path: '/dashboard',
        element: <DashboardLayout></DashboardLayout>,
        children: [
            {
                path: "/dashboard/add-class",
                element: <AddClassPage></AddClassPage>,
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
                element: <BeTrainerPage></BeTrainerPage>
            },
            {
                path: "/dashboard/applied-trainers",
                element: <AppliedTrainersPage></AppliedTrainersPage>
            },
            {
                path: "/dashboard/booked-trainer",
                element: <TrainerBookedPage></TrainerBookedPage>,
            },
            {
                path: "/dashboard/payment/:slotId",
                element: <PaymentPage></PaymentPage>
            },
            {
                 path: "/dashboard/profile",
                 element: <ProfilePage></ProfilePage>,
            },
        ]
    }
]);