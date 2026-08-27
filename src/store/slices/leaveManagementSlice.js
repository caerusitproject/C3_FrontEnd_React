import { createSlice } from "@reduxjs/toolkit";
import GlobalLoader from "../../Components/ui/Loader/GlobalLoader";

const initialState = {
  leaveRequest: [],
  allPendingLeaveReq: [],
  totalPendingLeaves: null,
  totalPages: null,
  totalDays: null,
};

export const leaveManagementSlice = createSlice({
  name: "assetManagement",
  initialState,
  reducers: {
    storeLeaveRequest: (state, action) => {
      state.leaveRequest = action.payload?.items;
    },
    storeallPendingLeaveRequest: (state, action) => {
      state.allPendingLeaveReq = action.payload?.items;
      state.totalPendingLeaves = action.payload?.totalElements;
      state.totalPages = action.payload?.totalPages;
      state.totalDays = action.payload?.items?.totalDays;
    },
  },
});

export const { storeLeaveRequest, storeallPendingLeaveRequest } =
  leaveManagementSlice.actions;

export default leaveManagementSlice.reducer;
