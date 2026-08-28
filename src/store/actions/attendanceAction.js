import {
  allattendanceService,
  fetchleaveRequestManagementService,
  getPendingAllleaveRequestManagementService,
  pendingleavesApprovalRejectManagementService,
  updateAssetManagementService,
  deleteAssetManagementService,
} from "../services/attendanceManagementService";
import { showAlert } from "../slices/alertSlice";
import { storeAllattendanceRequest } from "../slices/attendanceSlice";
import { globalLoaderOpen, globalLoaderClose } from "../slices/globalSlice";

export const fetchAllAttendanceLeaveRequest = (empCode, month) => {
  return (dispatch) => {
    dispatch(globalLoaderOpen());
    allattendanceService(empCode, month)
      .then((res) => {
        dispatch(globalLoaderClose());
        dispatch(storeAllattendanceRequest(res?.data?.data));
        dispatch(
          showAlert({
            type: "success",
            title: res?.message || "Attendance fetched Successfully",
          }),
        );
        console.log("leave details___", res);
      })
      .catch((err) => {
        dispatch(globalLoaderClose());
        dispatch(
          showAlert({
            type: "error",
            title: err?.error || "Attendance Get Failed",
            message: err?.message || "Attendance fetched API failed",
          }),
        );

        console.log("error_message", err?.message);
      });
  };
};

// export const getLeaveRequest = (empCode) => {
//   return (dispatch) => {
//     dispatch(globalLoaderOpen());
//     fetchleaveRequestManagementService(empCode)
//       .then((res) => {
//         dispatch(globalLoaderClose());
//         dispatch(storeLeaveRequest(res?.data?.data));
//         dispatch(
//           showAlert({
//             type: "success",
//             title: res?.message || "Leave Request Fetched Successfully",
//           }),
//         );
//         console.log("leave details___", res);
//       })
//       .catch((err) => {
//         dispatch(globalLoaderClose());
//         dispatch(
//           showAlert({
//             type: "error",
//             title: err?.error || "Leave Post Failed",
//             message: err?.message || "Leave Management API failed",
//           }),
//         );

//         console.log("error_message", err?.message);
//       });
//   };
// };

// export const fetchPendingAllLeaveRequest = () => {
//   return (dispatch) => {
//     dispatch(globalLoaderOpen());
//     getPendingAllleaveRequestManagementService()
//       .then((res) => {
//         dispatch(globalLoaderClose());
//         dispatch(storeallPendingLeaveRequest(res?.data?.data));
//         dispatch(
//           showAlert({
//             type: "success",
//             title: res?.message || "Leave Request Fetched Successfully",
//           }),
//         );
//         console.log("leave details___", res);
//       })
//       .catch((err) => {
//         dispatch(globalLoaderClose());
//         dispatch(
//           showAlert({
//             type: "error",
//             title: err?.error || "Leave Post Failed",
//             message: err?.message || "Leave Management API failed",
//           }),
//         );

//         console.log("error_message", err?.message);
//       });
//   };
// };

// export const ApprovalRejectAllPendingLeaveRequest = (
//   leaveReqId,
//   approveReject,
// ) => {
//   return (dispatch) => {
//     dispatch(globalLoaderOpen());
//     pendingleavesApprovalRejectManagementService(leaveReqId, approveReject)
//       .then((res) => {
//         dispatch(globalLoaderClose());
//         dispatch(storeallPendingLeaveRequest(res?.data?.data));
//         dispatch(
//           showAlert({
//             type: "success",
//             title: res?.message || "Leave Request Fetched Successfully",
//           }),
//         );
//         console.log("leave details___", res);
//       })
//       .catch((err) => {
//         dispatch(globalLoaderClose());
//         dispatch(
//           showAlert({
//             type: "error",
//             title: err?.error || "Leave Post Failed",
//             message: err?.message || "Leave Management API failed",
//           }),
//         );

//         console.log("error_message", err?.message);
//       });
//   };
// };
