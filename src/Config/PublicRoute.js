import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

/**
 * Used as a layout wrapper in App.jsx.
 * Authenticated users are redirected to /home (or custom redirectPath).
 *
 * <Route element={<PublicRoute />}>
 *   <Route element={<PublicLayout />}>
 *     <Route path="/login" element={<Login />} />
 *   </Route>
 * </Route>
 */
const PublicRoute = ({ redirectPath = "/home" }) => {
  const isAuthenticated = useSelector((state) => state.login.isAuthenticated);
  return isAuthenticated ? <Navigate to={redirectPath} replace /> : <Outlet />;
};

export default PublicRoute;