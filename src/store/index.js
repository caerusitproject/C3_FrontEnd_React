import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slices/counterSlice";
import postReducer from "./slices/postsSlice";
import globalReducer from "./slices/globalSlice";
import loginReducer from "./slices/loginSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    post: postReducer,
    global: globalReducer,
    login: loginReducer,
  },
});
