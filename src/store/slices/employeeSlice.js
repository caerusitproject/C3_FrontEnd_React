import { createSlice } from "@reduxjs/toolkit";
import GlobalLoader from "../../Components/ui/Loader/GlobalLoader";

const initialState = {
  employeeProfile: {},
  employeeList: [],
};

export const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    fetchEmplyeePro: (state, action) => {
      state.employeeProfile = action.payload;
    },
    storeEmployeeList: (state, action) => {
      state.employeeList = action.payload;
    },
  },
  //
});

export const { fetchEmplyeePro, storeEmployeeList } = employeeSlice.actions;

export default employeeSlice.reducer;
