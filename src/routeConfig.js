import { lazy } from "react";

export const Login = lazy(() => import("./Pages/Login/LoginPage"));
export const Home = lazy(() => import("./Pages/Home/Home"));
export const Attendance = lazy(() => import("./Pages/Attendance/Attendance"));

export const publicRoutes = [
  {
    path: "/login",
    component: Login,
  },
];

export const protectedRoutes = [
  {
    path: "/home",
    component: Home,
    roles: ["user", "admin"],
  },
  {
    path: "/attendance",
    component: Attendance,
    roles: ["admin"],
  },
];
