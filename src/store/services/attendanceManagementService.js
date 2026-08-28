import { attendanceApi } from "../../Config/axiosInstance";

// fetchAllProjectMappingService

export const allattendanceService = (empCode, month) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = "";
      response = await attendanceApi.get(
        `v1/attendances/employee/1/calendar?employeeCode=${empCode}&month=${month}`,
      );

      if (response) resolve(response);
    } catch (err) {
      reject(err);
    }
  });
};

// export const fetchleaveRequestManagementService = (empCode) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       let response = "";
//       response = await leaveApi.get(
//         `v1/leave-management/leave-requests?empCode=${empCode}`,
//       );

//       if (response) resolve(response);
//     } catch (err) {
//       reject(err);
//     }
//   });
// };

// export const getPendingAllleaveRequestManagementService = () => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       let response = "";
//       response = await leaveApi.get(`v1/leave-management/team/leave-requests`, {
//         headers: {
//           "X-EMP-ID": 1,
//         },
//       });

//       if (response) resolve(response);
//     } catch (err) {
//       reject(err);
//     }
//   });
// };

// export const pendingleavesApprovalRejectManagementService = (
//   leaveReqId,
//   approveReject,
// ) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       let response = "";
//       response = await leaveApi.put(
//         `v1/leave-management/${leaveReqId}/${approveReject}`,
//         null,
//         {
//           headers: {
//             "X-EMP-ID": 1,
//           },
//         },
//       );

//       if (response) resolve(response);
//     } catch (err) {
//       reject(err);
//     }
//   });
// };

// export const addAssetManagementService = (selectedAssetManagement) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       let response = "";

//       response = await api.post(`/v1/assets`, selectedAssetManagement, {
//         "Content-Type": "application/json",
//       });

//       if (response) resolve(response);
//     } catch (err) {
//       reject(err);
//     }
//   });
// };

// export const updateAssetManagementService = (
//   selectedAssetManagement,
//   assetId,
// ) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       let response = "";

//       response = await api.put(
//         `/v1/assets/${assetId}`,
//         selectedAssetManagement,
//         {
//           "Content-Type": "application/json",
//         },
//       );

//       if (response) resolve(response);
//     } catch (err) {
//       reject(err);
//     }
//   });
// };

// export const deleteAssetManagementService = (assetId) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       let response = "";

//       response = await api.delete(`/v1/assets/${assetId}`, {
//         "Content-Type": "application/json",
//       });

//       if (response) resolve(response);
//     } catch (err) {
//       reject(err);
//     }
//   });
// };
// updateAssetManagementService
// addAssetManagementService
