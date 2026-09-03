import { createSlice } from "@reduxjs/toolkit";
import GlobalLoader from "../../Components/ui/Loader/GlobalLoader";

const initialState = {
  holidayList: [],
  countHolidays: null,
  holidayCategoryList: [],
  paginationIndex: 0,
  paginationSize: 10,
  //   message: null,
  //   open: false,
};

export const holidayListSlice = createSlice({
  name: "holidayList",
  initialState,
  reducers: {
    storeHolidayList: (state, action) => {
      state.holidayList = action.payload?.items;
      state.countHolidays = action.payload?.totalElements;
    },
    storeAllCategoryHolidayList: (state, action) => {
      state.holidayCategoryList = action?.payload;
    },
    storePaginateIndexSize: (state, action) => {
      state.paginationIndex = action.payload.pageIndex;
      state.paginationSize = action.payload.pageSize;
    },
  },
});

export const {
  storeHolidayList,
  storeAllCategoryHolidayList,
  storePaginateIndexSize,
} = holidayListSlice.actions;

export default holidayListSlice.reducer;
