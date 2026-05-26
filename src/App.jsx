import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";

import { routes } from "./routes/RoutesConfig";
import ProtectedRoute from "./Config/ProtectedRoute";
import PublicRoute from "./Config/PublicRoute";
import PublicLayout from "./Config/PublicLayout";
import SuccessFailureSnackbar from "./Config/SuccessFailureSnackbarAlert";
import GlobalLoader from "./Config/GlobalLoader";
import Login from "./Pages/LoginPage";

export default function App() {
  const isAuthenticated = useSelector((state) => state.login.isAuthenticated);

  console.log("Authenticate__", isAuthenticated);

  return (
    <Router>
      <SuccessFailureSnackbar />
      <GlobalLoader />

      <Routes>
        <Route index element={<Navigate to="/login" replace />} />

        {routes.map(({ path, element, index, roles, ...rest }) => (
          <Route
            key={path || "index"}
            path={path}
            index={index}
            element={
              roles ? (
                <ProtectedRoute roles={roles} element={element} />
              ) : (
                element
              )
            }
            {...rest}
          />
        ))}

        <Route
          path="*"
          element={
            isAuthenticated ? (
              <Navigate to="/home" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
}
