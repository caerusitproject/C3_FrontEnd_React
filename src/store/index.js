import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "./slices/globalSlice";
import loginReducer from "./slices/loginSlice";
import alertReducer from "./slices/alertSlice";
import employeeReducer from "./slices/employeeSlice";
import projectMappingReducer from "./slices/projectMappingSlice";
import assetRequestReducer from "./slices/assetRequestSlice";

export const store = configureStore({
  reducer: {
    global: globalReducer,
    login: loginReducer,
    alert: alertReducer,
    employee: employeeReducer,
    projectMapping: projectMappingReducer,
    assetRequest: assetRequestReducer,
  },
});
