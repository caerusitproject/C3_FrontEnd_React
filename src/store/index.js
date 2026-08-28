import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "./slices/globalSlice";
import loginReducer from "./slices/loginSlice";
import alertReducer from "./slices/alertSlice";
import employeeReducer from "./slices/employeeSlice";
import projectMappingReducer from "./slices/projectMappingSlice";
import assetRequestReducer from "./slices/assetRequestSlice";
import assetManagementReducer from "./slices/assetManagementSlice";
import leaveManagementReducer from "./slices/leaveManagementSlice";
import attendanceManagementReducer from "./slices/attendanceSlice";

export const store = configureStore({
  reducer: {
    global: globalReducer,
    login: loginReducer,
    alert: alertReducer,
    employee: employeeReducer,
    projectMapping: projectMappingReducer,
    assetRequest: assetRequestReducer,
    assetManagement: assetManagementReducer,
    leaveManagement: leaveManagementReducer,
    attendanceManagement: attendanceManagementReducer,
  },
});
