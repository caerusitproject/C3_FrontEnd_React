import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Suspense, lazy } from "react";
import { useSelector } from "react-redux";

import ProtectedRoute from "./Config/ProtectedRoute";
import PublicRoute from "./Config/PublicRoute";
import PublicLayout from "./Config/Layout/PublicLayout";
import AppLayout from "./Config/Layout/AppLayout";

const Login = lazy(() => import("./Pages/Login/LoginPage"));
const Home = lazy(() => import("./Pages/Home/Home"));

export default function App() {
  const isAuthenticated = useSelector((state) => state.login.isAuthenticated);

  return (
    <Router>
      <Suspense fallback={null}>
        <Routes>

          {/* ROOT REDIRECT */}
          <Route
            path="/"
            element={<Navigate to={isAuthenticated ? "/home" : "/login"} replace />}
          />

          {/* PUBLIC ROUTES — authenticated users bounced to /home */}
          <Route element={<PublicRoute />}>
            <Route element={<PublicLayout />}>
              <Route path="/login" element={<Login />} />
            </Route>
          </Route>

          {/* PROTECTED ROUTES — unauthenticated users bounced to /login */}
          <Route element={<ProtectedRoute />}>
            <Route element={<AppLayout />}>
              <Route path="/home" element={<Home />} />

              {/* Admin-only */}
              <Route element={<ProtectedRoute roles={["admin"]} />}>
                {/* <Route path="/showcase" element={<ShowcasePage />} /> */}
              </Route>

            </Route>
          </Route>

          {/* CATCH-ALL */}
          <Route
            path="*"
            element={<Navigate to={isAuthenticated ? "/home" : "/login"} replace />}
          />

        </Routes>
      </Suspense>
    </Router>
  );
}