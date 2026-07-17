import { createSlice } from "@reduxjs/toolkit";
import GlobalLoader from "../../Components/ui/Loader/GlobalLoader";

const initialState = {
  employeeProfile: {},
};

export const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    fetchEmplyeePro: (state, action) => {
      state.employeeProfile = action.payload;
    },
  },
});

export const { fetchEmplyeePro } = employeeSlice.actions;

export default employeeSlice.reducer;
