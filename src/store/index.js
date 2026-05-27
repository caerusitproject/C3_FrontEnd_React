import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "./slices/globalSlice";
import loginReducer from "./slices/loginSlice";
import alertReducer from "./slices/alertSlice";

export const store = configureStore({
  reducer: {
    global: globalReducer,
    login: loginReducer,
    alert: alertReducer,
  },
});
