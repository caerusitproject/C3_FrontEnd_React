import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  open: false,
  type: "info",
  title: "",
  message: "",
};

const alertSlice = createSlice({
  name: "alert",

  initialState,

  reducers: {
    showAlert: (state, action) => {
      state.open = true;

      state.type = action.payload.type || "info";

      state.title = action.payload.title || "";

      state.message = action.payload.message || "";
    },

    hideAlert: (state) => {
      state.open = false;
    },
  },
});

export const {
  showAlert,
  hideAlert,
} = alertSlice.actions;

export default alertSlice.reducer;