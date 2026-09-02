import { leaveApi, superAdminApi } from "../../Config/axiosInstance";

// fetchAllProjectMappingService

export const leaveRequestManagementService = (empCode, leaveObj) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = "";
      response = await leaveApi.post(
        `/v1/leave-management/leave-requests`,
        leaveObj,
        {
          headers: {
            "X-Emp-Code": empCode ? empCode : "",
          },
        },
      );

      if (response) resolve(response);
    } catch (err) {
      reject(err);
    }
  });
};

export const updateLeaveRequestManagementService = (leaveId, leaveObj) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = "";
      response = await leaveApi.put(
        `/v1/leave-management/${leaveId}`,
        leaveObj,
      );

      if (response) resolve(response);
    } catch (err) {
      reject(err);
    }
  });
};

export const fetchleaveRequestManagementService = (empCode) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = "";
      response = await leaveApi.get(
        `v1/leave-management/leave-requests?empCode=${empCode}`,
      );

      if (response) resolve(response);
    } catch (err) {
      reject(err);
    }
  });
};

export const getPendingAllleaveRequestManagementService = (
  pageIndex,
  pageSize,
) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = "";
      response = await leaveApi.get(
        `v1/leave-management/team/leave-requests?page=${pageIndex}&size=${pageSize}`,
        {
          headers: {
            "X-EMP-ID": 1,
          },
        },
      );

      if (response) resolve(response);
    } catch (err) {
      reject(err);
    }
  });
};

export const pendingleavesApprovalRejectManagementService = (
  leaveReqId,
  remarks,
  approveReject,
) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = "";
      response = await leaveApi.put(
        `v1/leave-management/${leaveReqId}/${approveReject}`,
        approveReject == "approve" ? {} : { remarks: remarks },
        {
          headers: {
            "X-EMP-ID": 1,
          },
        },
      );

      if (response) resolve(response);
    } catch (err) {
      reject(err);
    }
  });
};

export const allHolidaysListService = (year) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = "";
      response = await superAdminApi.get(`v1/holidays/year/${year}`);

      if (response) resolve(response);
    } catch (err) {
      reject(err);
    }
  });
};

export const fetchLeaveBalService = (empId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = "";
      response = await leaveApi.get(`v1/leave-management/leave-balances/me`, {
        headers: {
          "X-EMP-ID": empId,
        },
      });

      if (response) resolve(response);
    } catch (err) {
      reject(err);
    }
  });
};

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
