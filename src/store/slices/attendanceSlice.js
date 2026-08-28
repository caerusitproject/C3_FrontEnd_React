import { createSlice } from "@reduxjs/toolkit";
import GlobalLoader from "../../Components/ui/Loader/GlobalLoader";

const initialState = {
  allAttendanceRequest: [],
  attendanceSummary: {},
};

export const attendanceSlice = createSlice({
  name: "assetManagement",
  initialState,
  reducers: {
    storeAllattendanceRequest: (state, action) => {
      state.allAttendanceRequest = action.payload?.days;
      state.attendanceSummary = action.payload?.summary;
    },
  },
});

export const { storeAllattendanceRequest } = attendanceSlice.actions;

export default attendanceSlice.reducer;
