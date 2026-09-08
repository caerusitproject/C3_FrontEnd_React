import {
  fetchPayrollManagementService,
  fetchAssetRequestByIdService,
  fetchAssetRequestApprovalByIdService,
} from "../services/payrollManagementService";
import { showAlert } from "../slices/alertSlice";
import {
  storeAllpayrollRequest,
  storeAssetRequestById,
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

// export const fetchAssetRequestById = (assetId) => {
//   return (dispatch) => {
//     dispatch(globalLoaderOpen());
//     fetchAssetRequestByIdService(assetId)
//       .then((res) => {
//         dispatch(globalLoaderClose());
//         dispatch(storeAssetRequestById(res?.data?.data));
//         dispatch(
//           showAlert({
//             type: "success",
//             title: "Fetched Asset Request Id Successfully",
//           }),
//         );
//         console.log("employee details___", res);
//       })
//       .catch((err) => {
//         dispatch(globalLoaderClose());
//         dispatch(
//           showAlert({
//             type: "error",
//             title: err?.error || "Asset Request Id Fetch Failed",
//             message: err?.message || "Asset Request Id API failed",
//           }),
//         );

//         console.log("error_message", err?.message);
//       });
//   };
// };

// export const fetchAssetRequestApprovalById = (assetObj) => {
//   return (dispatch) => {
//     dispatch(globalLoaderOpen());
//     fetchAssetRequestApprovalByIdService(assetObj)
//       .then((res) => {
//         dispatch(globalLoaderClose());
//         dispatch(
//           showAlert({
//             type: "success",
//             title: "Fetched Asset Request Approval Id Successfully",
//           }),
//         );
//         console.log("employee details___", res);
//       })
//       .catch((err) => {
//         dispatch(globalLoaderClose());
//         dispatch(
//           showAlert({
//             type: "error",
//             title: err?.error || "Asset Request Id Approval Fetch Failed",
//             message: err?.message || "Asset Request Id Approval API failed",
//           }),
//         );

//         console.log("error_message", err?.message);
//       });
//   };
// };
