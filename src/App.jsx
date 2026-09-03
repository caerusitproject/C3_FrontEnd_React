import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Suspense, lazy } from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ProtectedRoute from "./Config/ProtectedRoute";
import PublicRoute from "./Config/PublicRoute";
import PublicLayout from "./Config/Layout/PublicLayout";
import AppLayout from "./Config/Layout/AppLayout";

const Login = lazy(() => import("./Pages/Login/LoginPage"));
const Leave = lazy(() => import("./Pages/Leave/Leave.jsx"));
const Payroll = lazy(() => import("./Pages/Payroll/Payroll.jsx"));
const Home = lazy(() => import("./Pages/Home/Home"));
const LeaveRequest = lazy(() => import("./Pages/LeaveRequest/LeaveReq.jsx"));
const Profile = lazy(() => import("./Pages/Profile/ProfileView.jsx"));
const AttendanceNew = lazy(
  () => import("./Pages/Attendance/AttendanceNew.jsx"),
);
const RequestAsset = lazy(
  () => import("./Pages/RequestAsset/RequestAssetTable.jsx"),
);
const AssetRequest = lazy(
  () => import("./Pages/AssetRequest/AssetRequestMain.jsx"),
);
const FormBuilder = lazy(() => import("./Pages/FormBuilder/FormBuilder.jsx"));
const AssetManagement = lazy(
  () => import("./Pages/AssetManagement/AssetManagementTable.jsx"),
);
const ProjectMappingTable = lazy(
  () => import("./Pages/ProjectMapping/ProjectMappingTable.jsx"),
);
const HolidayConfig = lazy(
  () => import("./Pages/HolidayConfiguration/HolidayConfig.jsx"),
);

export default function App() {
  const isAuthenticated = useSelector((state) => state.login.isAuthenticated);
  const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

    return null;
  };
  return (
    <Router>
      <Suspense fallback={null}>
        <Routes>
          <Route element={<ScrollToTop />} />

          {/* ROOT REDIRECT */}
          <Route
            path="/"
            element={
              <Navigate to={isAuthenticated ? "/home" : "/login"} replace />
            }
          />

          {/* <Route path="/" element={<Navigate to={"/home"} replace />} /> */}

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
              <Route path="/attendance" element={<AttendanceNew />} />
              <Route
                path="/holiday-configuration"
                element={<HolidayConfig />}
              />
              <Route path="/lms" element={<Leave />} />
              <Route path="/leave-requests" element={<LeaveRequest />} />
              <Route path="/payroll" element={<Payroll />} />
              {/* <Route path="/attendance" element={<AttendanceNew />} /> */}
              <Route path="/form-builder" element={<FormBuilder />} />
              <Route path="/request-asset" element={<RequestAsset />} />
              <Route path="/asset-requests" element={<AssetRequest />} />
              <Route path="/asset-management" element={<AssetManagement />} />
              <Route
                path="/project-mapping"
                element={<ProjectMappingTable />}
              />

              {/* Admin-only */}
              <Route element={<ProtectedRoute roles={["admin"]} />}></Route>
            </Route>
          </Route>

          {/* CATCH-ALL */}
          <Route
            path="*"
            element={
              <Navigate to={isAuthenticated ? "/home" : "/login"} replace />
            }
          />
          {/* <Route path="*" element={<Navigate to={"/home"} replace />} /> */}
        </Routes>
      </Suspense>
    </Router>
  );
}
