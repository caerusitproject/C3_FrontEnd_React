import { createSlice } from "@reduxjs/toolkit";
import GlobalLoader from "../../Components/ui/Loader/GlobalLoader";

const initialState = {
  payrollRequest: null,
};

export const payrollSlice = createSlice({
  name: "payroll",
  initialState,
  reducers: {
    storeAllpayrollRequest: (state, action) => {
      state.payrollRequest = action.payload;
    },
    clearPayroll: (state, action) => {
      state.payrollRequest = null;
    },
  },
});

export const { storeAllpayrollRequest, clearPayroll } = payrollSlice.actions;

export default payrollSlice.reducer;
