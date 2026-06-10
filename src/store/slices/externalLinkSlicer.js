import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  externalLinks: [],
  loading: false,
  error: null,
};

const externalLinkSlice = createSlice({
  name: "externalLinks",
  initialState,
  reducers: {
    setExternalLinks: (state, action) => {
      state.externalLinks = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setExternalLinks, setLoading, setError } = externalLinkSlice.actions;
export default externalLinkSlice.reducer;