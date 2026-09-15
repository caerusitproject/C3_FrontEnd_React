import {
  fetchPayrollManagementService,
  viewSalarySlipByYearService,
  salarySlipDownloadService,
  salarySlipPreviewService,
  handleSalarySlipDownloadService,
} from "../services/payrollManagementService";
import { showAlert } from "../slices/alertSlice";
import {
  storeAllpayrollRequest,
  storeAllSalarySlips,
  storeSalarySlipPreview,
} from "../slices/payrollSlice";
import { globalLoaderOpen, globalLoaderClose } from "../slices/globalSlice";

export const getPayrollPerEmployeeId = (employeeId, effectiveDate) => {
  return (dispatch) => {
    dispatch(globalLoaderOpen());
    fetchPayrollManagementService(employeeId, effectiveDate)
      .then((res) => {
        dispatch(globalLoaderClose());
        dispatch(storeAllpayrollRequest(res?.data?.data));
        dispatch(
          showAlert({
            type: "success",
            title: "Fetched Payroll Successfully",
          }),
        );
        console.log("employee details___", res);
      })
      .catch((err) => {
        dispatch(globalLoaderClose());
        console.log("error___", err);
        dispatch(
          showAlert({
            type: "error",
            title: err?.response?.data?.error || "Payroll Fetch Failed",
            message: err?.response?.data?.message || "Payroll API failed",
          }),
        );
        console.log("error_message", err?.message);
      });
  };
};

export const viewSalaraySlipByYear = (employeeId, year) => {
  return (dispatch) => {
    dispatch(globalLoaderOpen());
    viewSalarySlipByYearService(employeeId, year)
      .then((res) => {
        dispatch(globalLoaderClose());
        dispatch(storeAllSalarySlips(res?.data?.data));
        dispatch(
          showAlert({
            type: "success",
            title: "Fetched Salary Slips Id Successfully",
          }),
        );
        console.log("employee details___", res);
      })
      .catch((err) => {
        dispatch(globalLoaderClose());
        dispatch(
          showAlert({
            type: "error",
            title: err?.error || "Salary Slips Fetch Failed",
            message: err?.message || "Salary Slips API failed",
          }),
        );

        console.log("error_message", err?.message);
      });
  };
};

export const handleSalarySlipDownloadById = (salarySlipId) => {
  return (dispatch) => {
    dispatch(globalLoaderOpen());
    handleSalarySlipDownloadService(salarySlipId)
      .then((res) => {
        dispatch(globalLoaderClose());
        dispatch(
          showAlert({
            type: "success",
            title: "Fetched Asset Request Approval Id Successfully",
          }),
        );
        console.log("employee details___", res);
      })
      .catch((err) => {
        dispatch(globalLoaderClose());
        dispatch(
          showAlert({
            type: "error",
            title: err?.error || "Asset Request Id Approval Fetch Failed",
            message: err?.message || "Asset Request Id Approval API failed",
          }),
        );

        console.log("error_message", err?.message);
      });
  };
};

export const salarySlipPreview = (salarySlipId) => {
  return (dispatch) => {
    dispatch(globalLoaderOpen());
    salarySlipPreviewService(salarySlipId)
      .then((res) => {
        dispatch(globalLoaderClose());
        dispatch(storeSalarySlipPreview(res?.data?.data));
        dispatch(
          showAlert({
            type: "success",
            title: "Fetched Salary Slip Successfully",
          }),
        );
        console.log("employee details___", res);
      })
      .catch((err) => {
        dispatch(globalLoaderClose());
        dispatch(
          showAlert({
            type: "error",
            title: err?.error || "Salary Slip Fetch Failed",
            message: err?.message || "Salary Slip API failed",
          }),
        );

        console.log("error_message", err?.message);
      });
  };
};
