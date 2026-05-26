import { lazy } from "react";
import { ThemeProvider } from "../context/ThemeContext";

const Counter = lazy(() => import("../Pages/Counter"));
const ShowcasePage = lazy(() => import("../Pages/ShowcasePage"));
const Login_Page = lazy(() => import("../Pages/LoginPage"));
const Home_Page = lazy(() => import("../Pages/Home"));

export const routes = [
  {
    path: "/login",
    element: (
      <ThemeProvider>
        <Login_Page />
      </ThemeProvider>
    ),
  },
  {
    path: "/home",
    element: (
      <ThemeProvider>
        <Home_Page />
      </ThemeProvider>
    ),
  },
  {
    path: "/showcase",
    element: (
      <ThemeProvider>
        <ShowcasePage />
      </ThemeProvider>
    ),
  },

  // { path: "/account-details", element: <AccountDetails />, roles: ["user"] },
];
