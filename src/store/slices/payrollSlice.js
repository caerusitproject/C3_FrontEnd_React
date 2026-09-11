import { createSlice } from "@reduxjs/toolkit";
import GlobalLoader from "../../Components/ui/Loader/GlobalLoader";

const initialState = {
  payrollRequest: null,
  allSalarySlips: [],
  salaryPreview: {},
};

export const payrollSlice = createSlice({
  name: "payroll",
  initialState,
  reducers: {
    storeAllpayrollRequest: (state, action) => {
      state.payrollRequest = action.payload;
    },
    storeAllSalarySlips: (state, action) => {
      state.allSalarySlips = action.payload;
    },
    storeSalarySlipPreview: (state, action) => {
      state.salaryPreview = action.payload;
    },
    clearPayroll: (state, action) => {
      state.payrollRequest = null;
    },
  },
});

export const {
  storeAllpayrollRequest,
  clearPayroll,
  storeAllSalarySlips,
  storeSalarySlipPreview,
} = payrollSlice.actions;

export default payrollSlice.reducer;
