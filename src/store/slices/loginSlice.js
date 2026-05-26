import { createSlice } from "@reduxjs/toolkit";
import GlobalLoader from "../../Config/GlobalLoader";

const storeuser = JSON.parse(localStorage.getItem("user")) || null;

const initialState = {
  loggedInUser: storeuser,
  isAuthenticated: storeuser ? true : false,
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    loginRequest: (state, action) => {
      state.loggedInUser = action.payload?.user;
      state.isAuthenticated = true;
    },
  },
});

// Action creators are generated for each case reducer function
export const { loginRequest } = loginSlice.actions;

export default loginSlice.reducer;
