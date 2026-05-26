// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";
// import { useSelector } from "react-redux";

// import { routes } from "./routes/RoutesConfig";
// import ProtectedRoute from "./Config/ProtectedRoute";
// import PublicRoute from "./Config/PublicRoute";
// import PublicLayout from "./Config/PublicLayout";
// import SuccessFailureSnackbar from "./Config/SuccessFailureSnackbarAlert";
// import GlobalLoader from "./Config/GlobalLoader";
// import Login from "./Pages/LoginPage";

// export default function App() {
//   const isAuthenticated = useSelector((state) => state.login.isAuthenticated);

//   console.log("Authenticate__", isAuthenticated);

//   return (
//     <Router>
//       {/* <SuccessFailureSnackbar /> */}
//       {/* <GlobalLoader /> */}

//       <Routes>
//         {/*
//           Root redirect:
//           - Authenticated  → /home
//           - Unauthenticated → /login
//         */}
//         <Route
//           index
//           element={
//             isAuthenticated ? (
//               <Navigate to="/home" replace />
//             ) : (
//               <Navigate to="/login" replace />
//             )
//           }
//         />

//         {/*
//           Public-only routes — authenticated users are redirected to /home.
//           /login lives here so a logged-in user can never reach it manually.
//         */}
//         <Route element={<PublicRoute redirectPath="/home" />}>
//           <Route path="/login" element={<Login />} />
//         </Route>

//         {/* Protected / role-guarded application routes */}
//         {routes.map(({ path, element, index, roles, ...rest }) => (
//           <Route
//             key={path || "index"}
//             path={path}
//             index={index}
//             element={
//               roles ? (
//                 <ProtectedRoute roles={roles} element={element} />
//               ) : (
//                 element
//               )
//             }
//             {...rest}
//           />
//         ))}

//         {/*
//           Catch-all for unknown paths:
//           - Authenticated  → /home  (same as before)
//           - Unauthenticated → /login
//         */}
//         <Route
//           path="*"
//           element={
//             isAuthenticated ? (
//               <Navigate to="/home" replace />
//             ) : (
//               <Navigate to="/login" replace />
//             )
//           }
//         />
//       </Routes>
//     </Router>
//   );
// }

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

export default function App() {
  const isAuthenticated = useSelector((state) => state.login.isAuthenticated);

  console.log("Authenticate__", isAuthenticated);

  return (
    <Router>
      <SuccessFailureSnackbar />
      <GlobalLoader />

      <Routes>
        {/* Root — send users to the right place immediately */}
        <Route
          index
          element={
            isAuthenticated ? (
              <Navigate to="/home" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {routes.map(({ path, element, index, roles, publicOnly, ...rest }) => (
          <Route
            key={path || "index"}
            path={path}
            index={index}
            element={
              publicOnly ? (
                // e.g. /login — auth'd users → /home, guests see the page
                <PublicRoute element={element} redirectPath="/home" />
              ) : roles ? (
                // e.g. /home — must be authenticated + have the right role
                <ProtectedRoute roles={roles} element={element} />
              ) : (
                // e.g. /showcase — open to everyone, rendered as-is
                element
              )
            }
            {...rest}
          />
        ))}

        {/* Catch-all for unknown paths */}
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
