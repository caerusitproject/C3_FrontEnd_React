import { createSlice } from "@reduxjs/toolkit";
import GlobalLoader from "../../Components/ui/Loader/GlobalLoader";

const initialState = {
  leaveRequest: [],
  allPendingLeaveReq: [],
  allHolidaysLeaveList: [],
  totalPendingLeaves: null,
  leaveBalanceLeave: [],
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
    storeAllHolidayList: (state, action) => {
      state.allHolidaysLeaveList = action.payload;
    },
    storeLeaveBalance: (state, action) => {
      state.leaveBalanceLeave = action.payload?.leaveBalances;
    },
    // storeLeaveBalance
  },
});

export const {
  storeLeaveRequest,
  storeallPendingLeaveRequest,
  storeAllHolidayList,
  storeLeaveBalance,
} = leaveManagementSlice.actions;

export default leaveManagementSlice.reducer;
