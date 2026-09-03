import { createSlice } from "@reduxjs/toolkit";
import GlobalLoader from "../../Components/ui/Loader/GlobalLoader";

const initialState = {
  leaveRequest: [],
  allPendingLeaveReq: [],
  allHolidaysLeaveList: [],
  totalPendingLeaves: null,
  leaveBalanceLeave: [],
  pageIndex: 0,
  pageSize: 5,
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
      state.allHolidaysLeaveList = action.payload?.items;
    },
    storeLeaveBalance: (state, action) => {
      state.leaveBalanceLeave = action.payload?.leaveBalances;
    },
    storePaginateIndexSize: (state, action) => {
      state.pageIndex = action.payload?.pageIndex;
      state.pageSize = action.payload?.pageSize;
    },
    // storeLeaveBalance
  },
});

export const {
  storeLeaveRequest,
  storeallPendingLeaveRequest,
  storeAllHolidayList,
  storeLeaveBalance,
  storePaginateIndexSize,
} = leaveManagementSlice.actions;

export default leaveManagementSlice.reducer;
