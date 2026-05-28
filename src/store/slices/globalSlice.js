import { createSlice } from "@reduxjs/toolkit";
import GlobalLoader from "../../Components/ui/Loader/GlobalLoader";

const initialState = {
  globalloader: {
    loading: false,
  },
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    globalLoaderOpen: (state) => {
      state.globalloader.loading = true;
    },
    globalLoaderClose: (state) => {
      state.globalloader.loading = false;
    },
  },
});

export const { globalLoaderOpen, globalLoaderClose } = globalSlice.actions;

export default globalSlice.reducer;
