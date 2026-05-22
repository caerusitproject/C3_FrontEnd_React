import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  postalvalue: [],
};

export const postsSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    valueOfPost: (state, action) => {
      console.log("here the value is ", state);
      state.postalvalue = action.payload;
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
    },
  },
});

// Action creators are generated for each case reducer function
export const { valueOfPost } = postsSlice.actions;

export default postsSlice.reducer;
