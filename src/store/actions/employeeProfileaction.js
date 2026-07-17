import {
  fetchEmployeeService,
  updateEmployeeService,
} from "../services/employeeService";
import { fetchEmplyeePro } from "../slices/employeeSlice";
import { showAlert } from "../slices/alertSlice";
import { globalLoaderOpen, globalLoaderClose } from "../slices/globalSlice";

export const fetchEmployeeProfile = (empCode, role) => {
  return (dispatch) => {
    dispatch(globalLoaderOpen());
    fetchEmployeeService(empCode, role)
      .then((res) => {
        dispatch(globalLoaderClose());
        dispatch(
          showAlert({
            type: "success",
            title: "Profile fetched Successfully",
          }),
        );
        console.log("employee details___", res);
        if (res) {
          dispatch(fetchEmplyeePro(res?.data));
        }
      })
      .catch((err) => {
        dispatch(globalLoaderClose());

        dispatch(
          showAlert({
            type: "error",
            title: err?.error || "Profile Fetch Failed",
            message: err?.message || "Employee API failed",
          }),
        );

        console.log("error_message", err?.message);
      });
  };
};

export const updateEmployeeProfile = (empCode, role, employeeProfileObj) => {
  return (dispatch) => {
    dispatch(globalLoaderOpen());
    updateEmployeeService(empCode, role, employeeProfileObj)
      .then((res) => {
        dispatch(globalLoaderClose());
        dispatch(fetchEmployeeProfile(empCode, role));
        dispatch(
          showAlert({
            type: "success",
            title: "Profile updated Successfully",
          }),
        );
        console.log("employee details___", res);
      })
      .catch((err) => {
        dispatch(globalLoaderClose());

        dispatch(
          showAlert({
            type: "error",
            title: err?.error || "Profile Fetch Failed",
            message: err?.message || "Employee API failed",
          }),
        );

        console.log("error_message", err?.message);
      });
  };
};
