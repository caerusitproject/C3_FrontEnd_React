import { createSlice } from "@reduxjs/toolkit";

const safeParse = (item) => {
  try {
    if (!item || item === "undefined" || item === "null") {
      return null;
    }
    return JSON.parse(item);
  } catch (e) {
    return null;
  }
};

const storedUser = safeParse(localStorage.getItem("user"));
const storedMenus = safeParse(localStorage.getItem("menus")) || [];

const initialState = {
  loggedInUser: storedUser,
  isAuthenticated: !!storedUser,
  collapsed: false, // tablet starts icon-only by default
  menus: storedMenus,
  loading: false,
  error: null,
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    // 🔵 API START
    loginRequest: (state) => {
      state.loading = true;
      state.error = null;
    },

    // 🟢 API SUCCESS
    loginSuccess: (state, action) => {
      state.loading = false;

      state.loggedInUser = action.payload.employee;
      state.isAuthenticated = true;
      state.menus = action.payload.menus || [];

      localStorage.setItem("user", JSON.stringify(action.payload.employee));

      localStorage.setItem("menus", JSON.stringify(action.payload.menus || []));
    },

    // 🔴 API FAILURE
    loginFailure: (state, action) => {
      state.loading = false;

      state.error =
        typeof action.payload === "string"
          ? action.payload
          : action.payload?.message || "Login failed";
    },

    // 🚪 LOGOUT
    logout: (state) => {
      state.loggedInUser = null;
      state.isAuthenticated = false;
      state.menus = [];
      state.error = null;

      localStorage.removeItem("user");
      localStorage.removeItem("menus");
    },

    // UI
    toggleSidebar: (state) => {
      state.collapsed = !state.collapsed;
    },
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  logout,
  toggleSidebar,
} = loginSlice.actions;

export default loginSlice.reducer;