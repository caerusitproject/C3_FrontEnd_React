import { createSlice } from "@reduxjs/toolkit";
import GlobalLoader from "../../Config/GlobalLoader";

const initialState = {
  globalloader: {
    loading: false,
  },
  snackbar: {
    open: false,
    message: null,
    status: null,
    loading: false,
  },
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    openSnackbar: (state, action) => {
      state.snackbar = {
        open: true,
        message: action.payload?.message,
        status: action.payload?.status,
      };
      console.log("Snackbar State____", state);
      console.log("Snackbar Payload____", action.payload);
    },
    closeSnackbar: (state, action) => {
      state.snackbar = {
        open: false,
        message: action.payload?.message,
        status: action.payload?.status,
      };
    },
    globalLoaderOpen: (state, action) => {
      state.globalloader = {
        loading: true,
      };
    },

    globalLoaderClose: (state, action) => {
      state.globalloader = {
        loading: false,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  openSnackbar,
  closeSnackbar,
  globalLoaderOpen,
  globalLoaderClose,
} = globalSlice.actions;

export default globalSlice.reducer;
