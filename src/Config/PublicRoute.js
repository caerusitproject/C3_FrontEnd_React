import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PublicRoute = ({ redirectPath = "/home" }) => {
  const isAuthenticated = useSelector(
    (state) => state.login.isAuthenticated.isAuthenticated,
  );

  return isAuthenticated ? <Navigate to={redirectPath} replace /> : <Outlet />;
};

export default PublicRoute;
