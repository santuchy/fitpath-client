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
        ]
    }
]);