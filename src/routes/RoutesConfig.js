// import { lazy } from "react";
// import { ThemeProvider } from "../context/ThemeContext";

// const Counter = lazy(() => import("../Pages/Counter"));
// const ShowcasePage = lazy(() => import("../Pages/ShowcasePage"));
// const Login_Page = lazy(() => import("../Pages/LoginPage"));
// const Home_Page = lazy(() => import("../Pages/Home"));

// export const routes = [
//   {
//     path: "/login",
//     element: (
//       <ThemeProvider>
//         <Login_Page />
//       </ThemeProvider>
//     ),
//   },
//   {
//     path: "/home",
//     element: (
//       <ThemeProvider>
//         <Home_Page />
//       </ThemeProvider>
//     ),
//     roles: ["user", "admin"],
//   },
//   {
//     path: "/showcase",
//     element: (
//       <ThemeProvider>
//         <ShowcasePage />
//       </ThemeProvider>
//     ),
//     roles: ["admin"],
//   },

//   // { path: "/account-details", element: <AccountDetails />, roles: ["user"] },
// ];

import { lazy } from "react";
import { ThemeProvider } from "../context/ThemeContext";

const Counter = lazy(() => import("../Pages/Counter"));
const ShowcasePage = lazy(() => import("../Pages/ShowcasePage"));
const Login_Page = lazy(() => import("../Pages/LoginPage"));
const Home_Page = lazy(() => import("../Pages/Home"));

/**
 * Route shape
 * ──────────────────────────────────────────────────────────────
 * roles      → string[]  present  →  ProtectedRoute  (auth + role check)
 * publicOnly → true      present  →  PublicRoute     (auth'd users → /home)
 * neither               →  open route, rendered as-is (e.g. /showcase)
 *
 * Every element keeps its own <ThemeProvider> so theme tokens are always
 * available regardless of which guard wraps the route.
 */
export const routes = [
  {
    path: "/login",
    publicOnly: true, // ← authenticated users are sent to /home
    element: (
      <ThemeProvider>
        <Login_Page />
      </ThemeProvider>
    ),
  },
  {
    path: "/home",
    roles: ["user", "admin"], // ← protected; unauthenticated → /login
    element: (
      <ThemeProvider>
        <Home_Page />
      </ThemeProvider>
    ),
  },
  {
    path: "/showcase",
    // no roles, no publicOnly → open to everyone regardless of auth state
    // ThemeProvider here means theme switching & persistence work identically
    // whether the user is logged in or not.
    element: (
      <ThemeProvider>
        <ShowcasePage />
      </ThemeProvider>
    ),
  },
];
