import { createSlice } from "@reduxjs/toolkit";
import GlobalLoader from "../../Components/ui/Loader/GlobalLoader";

const initialState = {
  allAttendanceRequest: [],
  attendanceSummary: {},
  employeeList: [],
};

export const attendanceSlice = createSlice({
  name: "assetManagement",
  initialState,
  reducers: {
    storeAllattendanceRequest: (state, action) => {
      state.allAttendanceRequest = action.payload?.days;
      state.attendanceSummary = action.payload?.summary;
    },
    storeAllEmployeeList: (state, action) => {
      state.employeeList = action.payload;
    },
  },
});

export const { storeAllattendanceRequest, storeAllEmployeeList } =
  attendanceSlice.actions;

export default attendanceSlice.reducer;
