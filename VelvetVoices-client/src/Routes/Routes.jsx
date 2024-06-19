import {
  createBrowserRouter,
} from "react-router-dom";
import Root from "../Layout/Root";
import Home from "../Pages/Home/Home";
import Surveys from "../Pages/Surveys/Surveys";
import SurveyDetails from "../Pages/SurveyDetails/SurveyDetails";
import PricingPage from "../Pages/PricingPage/PricingPage";
import SignUp from "../Pages/SignUp/SignUp";
import SignIn from "../Pages/SignIn/SignIn";
import Dashboard from "../Layout/Dashboard";
import PrivateRoute from "./PrivateRoute";
import SurveyorDashboard from "../Pages/SurveyorDashboard/SurveyorDashboard";
import UpdateSurvey from "../Pages/SurveyorDashboard/UpdateSurvey";
import ViewSurveys from "../Pages/SurveyorDashboard/ViewSurveys";
import SurveyDetailsForSurveyor from "../Pages/SurveyorDashboard/SurveyDetailsForSurveyor";
import SurveyCreationForm from "../Pages/SurveyorDashboard/SurveyCreationForm";
import AdminRoute from "./AdminRoute";
import AdminDashboard from "../Pages/AdminDashboard/AdminDashboard";
import SurveyorRoute from "./SurveyorRoute";
import ManageUsers from "../Pages/AdminDashboard/ManageUsers";
import ManageSurveys from "../Pages/AdminDashboard/ManageSurveys";
import ViewPayments from "../Pages/AdminDashboard/ViewPayments";
import Payment from "../Pages/PricingPage/Payment";
import UserDashboard from "../Pages/UserDashboard/UserDashboard";
import ReportedSurveys from "../Pages/UserDashboard/ReportedSurveys";
import ProUserRoute from "./ProUserRoute";
import CommentsOfPro from "../Pages/UserDashboard/CommentsOfPro";
import ErrorPage from "../Pages/ErrorPage";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: '/surveys',
        element: <Surveys />,
      },
      {
        path: '/surveyDetails/:id',
        element: <SurveyDetails></SurveyDetails>
      },
      {
        path: '/pricingPage',
        element: <PricingPage></PricingPage>
      },
      {
        path: '/signUp',
        element: <SignUp></SignUp>
      },
      {
        path: '/signIn',
        element: <SignIn></SignIn>
      }
    ]
  },
  {
    path: 'dashboard',
    element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      //user route
      {
        path: 'payment',
        element : <Payment></Payment>
      },
      {
        path : 'user',
        element : <UserDashboard></UserDashboard>
      },
      {
        path : 'user/vote',
        element : <Surveys></Surveys>
      },
      {
        path: 'user/reports',
        element: <ReportedSurveys></ReportedSurveys>
      },
      {
        path: 'user/pro-comments',
        element: <ProUserRoute><CommentsOfPro></CommentsOfPro></ProUserRoute>
      },
      //surveyor route
      {
        path: 'surveyor',
        element: <SurveyorRoute><SurveyorDashboard></SurveyorDashboard></SurveyorRoute>,
      },
      {
        path: 'surveyor/create',
        element: <SurveyorRoute><SurveyCreationForm></SurveyCreationForm></SurveyorRoute>
      },
      {
        path: 'surveyor/update/:id',
        element: <SurveyorRoute><UpdateSurvey></UpdateSurvey></SurveyorRoute>
      },
      {
        path: 'surveyor/surveys',
        element: <SurveyorRoute><ViewSurveys></ViewSurveys></SurveyorRoute>
      },
      {
        path: 'surveyor/surveys/:id',
        element: <SurveyorRoute><SurveyDetailsForSurveyor></SurveyDetailsForSurveyor></SurveyorRoute>
      },
      //admin route
      {
        path : "admin",
        element : <AdminRoute><AdminDashboard></AdminDashboard></AdminRoute>
      },
      {
        path: 'admin/users' ,
        element : <AdminRoute><ManageUsers></ManageUsers></AdminRoute>
      },
      {
        path: 'admin/surveys',
        element: <AdminRoute><ManageSurveys></ManageSurveys></AdminRoute>
      },
      {
        path: 'admin/payments',
        element: <AdminRoute><ViewPayments></ViewPayments></AdminRoute>
      }
    ]
  }
]);