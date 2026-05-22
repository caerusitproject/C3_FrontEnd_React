import React from "react";
import { Outlet } from "react-router-dom";
import GlobalLoader from "./GlobalLoader";
import SuccessFailureSnackbar from "./SuccessFailureSnackbarAlert";

export default function PublicLayout() {
  return (
    <div style={{ minHeight: "100vh" }}>
      <SuccessFailureSnackbar />
      <GlobalLoader />
      <Outlet />
    </div>
  );
}
