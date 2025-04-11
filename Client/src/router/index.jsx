import { createHashRouter } from "react-router-dom";
import Layout from "../pages/Layout";
import Main from "../pages/Main";
import Setting from "../pages/Setting";

import DeckPage from "../pages/DeckPage";
import Login from "../pages/Login";
import SingUp from "../pages/SingUp";
import Auth_gate from "../pages/auth_gate";
import ProtectedRoute from "../Components/ProtectedRoute";

export const route = createHashRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Main /> },
      {
        path: "setting",
        element: <Setting />,
      },
    ],
  },
  {
    path: "/deck/:id",
    element: (
      <ProtectedRoute>
        <DeckPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "signup",
    element: <SingUp />,
  },
]);
