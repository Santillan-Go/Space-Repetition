import { createHashRouter } from "react-router-dom";
import Layout from "../pages/Layout";
import Main from "../pages/Main";
import Setting from "../pages/Setting";

import DeckPage from "../pages/DeckPage";
import Login from "../pages/Login";
import SingUp from "../pages/SingUp";

export const route = createHashRouter([
  {
    path: "/",
    element: <Layout />,
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
    element: <DeckPage />,
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
