import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ roles = [], element }) => {
  const { loggedInUser, isAuthenticated } = useSelector((state) => state.login);

  const userRole = loggedInUser?.role;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (roles.length > 0 && !roles.includes(userRole)) {
    return <Navigate to="/home" replace />;
  }

  return element;
};

export default ProtectedRoute;
