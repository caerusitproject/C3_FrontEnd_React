import { payrollApi } from "../../Config/axiosInstance";

// fetchAllProjectMappingService

export const fetchPayrollManagementService = (employeeId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = "";
      if (employeeId) {
        response = await payrollApi.get(
          `/v1/payroll/salary-structures/employee/${employeeId}/current`,
          {
            "Content-Type": "application/json",
          },
        );
      }
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
