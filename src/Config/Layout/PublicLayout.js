import React from "react";
import { Outlet } from "react-router-dom";
import GlobalLoader from "../../Components/ui/Loader/GlobalLoader";
import { GlobalAlert } from "../../Components/ui/Alert/GlobalAlert";

export default function PublicLayout() {
  return (
    <div style={{ minHeight: "100vh" }}>
      <GlobalAlert />
      <GlobalLoader />
      <Outlet />
    </div>
  );
}