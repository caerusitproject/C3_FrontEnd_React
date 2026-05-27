import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

/**
 * Used as a layout wrapper in App.jsx.
 * - No roles → just checks isAuthenticated
 * - roles={["admin"]} → also checks user role
 *
 * <Route element={<ProtectedRoute />}>          // auth guard
 *   <Route element={<ProtectedRoute roles={["admin"]} />}>  // role guard
 */
const ProtectedRoute = ({ roles = [] }) => {
  const { loggedInUser, isAuthenticated } = useSelector(
    (state) => state.login
  );

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (roles.length > 0 && !roles.includes(loggedInUser?.role)) {
    return <Navigate to="/home" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;