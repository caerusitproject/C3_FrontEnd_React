import {
  fetchAssetManagementService,
  addAssetManagementService,
  updateAssetManagementService,
  deleteAssetManagementService,
} from "../services/assetManagementService";
import { showAlert } from "../slices/alertSlice";
import { storeAssetManagement } from "../slices/assetManagementSlice";
import { globalLoaderOpen, globalLoaderClose } from "../slices/globalSlice";

export const fetchAssetManagement = (pageIndex, pageSize) => {
  return (dispatch) => {
    dispatch(globalLoaderOpen());
    fetchAssetManagementService(pageIndex, pageSize)
      .then((res) => {
        dispatch(globalLoaderClose());
        dispatch(storeAssetManagement(res?.data?.data));
        dispatch(
          showAlert({
            type: "success",
            title: "Fetched Asset Management Successfully",
          }),
        );
        console.log("employee details___", res);
      })
      .catch((err) => {
        dispatch(globalLoaderClose());
        dispatch(
          showAlert({
            type: "error",
            title: err?.error || "Asset Management Fetch Failed",
            message: err?.message || "Asset Management API failed",
          }),
        );

        console.log("error_message", err?.message);
      });
  };
};

export const addAssetManagement = (selectedAssetManagement, setPagination) => {
  return (dispatch) => {
    dispatch(globalLoaderOpen());
    addAssetManagementService(selectedAssetManagement)
      .then((res) => {
        dispatch(globalLoaderClose());
        setPagination((prev) => ({
          ...prev,
          pageIndex: 0,
        }));
        dispatch(fetchAssetManagement(0, 5));
        dispatch(
          showAlert({
            type: "success",
            title: "Added asset management Successfully",
          }),
        );
        console.log("employee details___", res);
      })
      .catch((err) => {
        dispatch(globalLoaderClose());
        dispatch(
          showAlert({
            type: "error",
            title: err?.error || "Projects Mapping addition Failed",
            message: err?.message || "Projects Mapping Addition API failed",
          }),
        );

        console.log("error_message", err?.message);
      });
  };
};

export const updateAssetManagement = (assetId, setPagination, assetData) => {
  return (dispatch) => {
    dispatch(globalLoaderOpen());
    updateAssetManagementService(assetData, assetId)
      .then((res) => {
        dispatch(globalLoaderClose());
        setPagination((prev) => ({
          ...prev,
          pageIndex: 0,
        }));
        dispatch(fetchAssetManagement(0, 5));
        dispatch(
          showAlert({
            type: "success",
            title: "Project Mapping updated Successfully",
          }),
        );
        console.log("employee details___", res);
      })
      .catch((err) => {
        dispatch(globalLoaderClose());
        dispatch(
          showAlert({
            type: "error",
            title: err?.error || "Project Mapping Update Failed",
            message: err?.message || "Project Mappping update API failed",
          }),
        );

        console.log("error_message", err?.message);
      });
  };
};

export const deleteAssetManagement = (assetId) => {
  return (dispatch) => {
    dispatch(globalLoaderOpen());
    deleteAssetManagementService(assetId)
      .then((res) => {
        dispatch(globalLoaderClose());
        dispatch(fetchAssetManagement(0, 5));
        // dispatch(storeAllProjectStatus(res?.data));
        dispatch(
          showAlert({
            type: "success",
            title: "Deleted Asset Successfully",
          }),
        );
      })
      .catch((err) => {
        dispatch(globalLoaderClose());
        dispatch(
          showAlert({
            type: "error",
            title: err?.error || "Delete Asset Failed",
            message: err?.message || "Deleted message failed failed",
          }),
        );

        console.log("error_message", err?.message);
      });
  };
};

// export const fetchAllEnv = () => {
//   return (dispatch) => {
//     dispatch(globalLoaderOpen());
//     fetchAllEnvService()
//       .then((res) => {
//         dispatch(globalLoaderClose());
//         dispatch(storeAllEnv(res?.data));
//         dispatch(
//           showAlert({
//             type: "success",
//             title: "Fetched Env Successfully",
//           }),
//         );
//         console.log("employee details___", res);
//       })
//       .catch((err) => {
//         dispatch(globalLoaderClose());
//         dispatch(
//           showAlert({
//             type: "error",
//             title: err?.error || "Env Fetch Failed",
//             message: err?.message || "Env API failed",
//           }),
//         );

//         console.log("error_message", err?.message);
//       });
//   };
// };

// export const showAllProjects = (pageIndex, pageSize) => {
//   return (dispatch) => {
//     dispatch(globalLoaderOpen());
//     showAllProjectService(pageIndex, pageSize)
//       .then((res) => {
//         dispatch(globalLoaderClose());
//         dispatch(storeAllProjects(res?.data));
//         dispatch(
//           showAlert({
//             type: "success",
//             title: "Fetched projects Successfully",
//           }),
//         );
//         console.log("employee details___", res);
//       })
//       .catch((err) => {
//         dispatch(globalLoaderClose());
//         dispatch(
//           showAlert({
//             type: "error",
//             title: err?.error || "Projects Fetch Failed",
//             message: err?.message || "Projects API failed",
//           }),
//         );

//         console.log("error_message", err?.message);
//       });
//   };
// };

// export const addProject = (projectData, setPagination) => {
//   return (dispatch) => {
//     dispatch(globalLoaderOpen());
//     additionProjectService(projectData)
//       .then((res) => {
//         // dispatch(showAllProjects(0, 5));
//         dispatch(globalLoaderClose());
//         setPagination((prev) => ({
//           ...prev,
//           pageIndex: 0,
//         }));
//         dispatch(
//           showAlert({
//             type: "success",
//             title: "Project Added Successfully",
//           }),
//         );
//         console.log("employee details___", res);
//       })
//       .catch((err) => {
//         dispatch(globalLoaderClose());
//         dispatch(
//           showAlert({
//             type: "error",
//             title: err?.error || "Projects Addition Failed",
//             message: err?.message || "Projects addition API failed",
//           }),
//         );

//         console.log("error_message", err?.message);
//       });
//   };
// };

// export const updateProject = (projectData, setPagination) => {
//   return (dispatch) => {
//     dispatch(globalLoaderOpen());
//     updateProjectService(projectData)
//       .then((res) => {
//         setPagination((prev) => ({
//           ...prev,
//           pageIndex: 0,
//         }));
//         // dispatch(showAllProjects(0, 5));
//         dispatch(globalLoaderClose());
//         dispatch(
//           showAlert({
//             type: "success",
//             title: "Project updated Successfully",
//           }),
//         );
//         console.log("employee details___", res);
//       })
//       .catch((err) => {
//         dispatch(globalLoaderClose());
//         dispatch(
//           showAlert({
//             type: "error",
//             title: err?.error || "Projects Update Failed",
//             message: err?.message || "Projects update API failed",
//           }),
//         );

//         console.log("error_message", err?.message);
//       });
//   };
// };

// export const showAllSoftware = (pageIndex, pageSize) => {
//   return (dispatch) => {
//     dispatch(globalLoaderOpen());
//     showAllSoftwareService(pageIndex, pageSize)
//       .then((res) => {
//         dispatch(globalLoaderClose());
//         dispatch(storeAllSoftware(res?.data));
//         dispatch(
//           showAlert({
//             type: "success",
//             title: "Fetched software Successfully",
//           }),
//         );
//         console.log("employee details___", res);
//       })
//       .catch((err) => {
//         dispatch(globalLoaderClose());
//         dispatch(
//           showAlert({
//             type: "error",
//             title: err?.error || "Software Fetch Failed",
//             message: err?.message || "Software API failed",
//           }),
//         );

//         console.log("error_message", err?.message);
//       });
//   };
// };

// export const addSoftware = (softwareData, setPagination) => {
//   return (dispatch) => {
//     dispatch(globalLoaderOpen());
//     addSoftwareService(softwareData)
//       .then((res) => {
//         // dispatch(showAllSoftware());
//         setPagination((prev) => ({
//           ...prev,
//           pageIndex: 0,
//         }));
//         dispatch(globalLoaderClose());
//         dispatch(
//           showAlert({
//             type: "success",
//             title: "Software added Successfully",
//           }),
//         );
//         console.log("employee details___", res);
//       })
//       .catch((err) => {
//         dispatch(globalLoaderClose());
//         dispatch(
//           showAlert({
//             type: "error",
//             title: err?.error || "Software Addition Failed",
//             message: err?.message || "Software API failed",
//           }),
//         );

//         console.log("error_message", err?.message);
//       });
//   };
// };

// export const updateSoftware = (softwareData, setPagination) => {
//   return (dispatch) => {
//     dispatch(globalLoaderOpen());
//     updateSoftwareService(softwareData)
//       .then((res) => {
//         setPagination((prev) => ({
//           ...prev,
//           pageIndex: 0,
//         }));
//         // dispatch(showAllSoftware());
//         dispatch(globalLoaderClose());
//         dispatch(
//           showAlert({
//             type: "success",
//             title: "Software updated Successfully",
//           }),
//         );
//         console.log("employee details___", res);
//       })
//       .catch((err) => {
//         dispatch(globalLoaderClose());
//         dispatch(
//           showAlert({
//             type: "error",
//             title: err?.error || "Software Update Failed",
//             message: err?.message || "Software update API failed",
//           }),
//         );

//         console.log("error_message", err?.message);
//       });
//   };
// };

// export const allSoftwareTypes = () => {
//   return (dispatch) => {
//     dispatch(globalLoaderOpen());
//     allSoftwareTypesService()
//       .then((res) => {
//         dispatch(globalLoaderClose());
//         dispatch(storeAllSoftwareTypes(res?.data));
//         dispatch(
//           showAlert({
//             type: "success",
//             title: "Software Types fetched Successfully",
//           }),
//         );
//         console.log("employee details___", res);
//       })
//       .catch((err) => {
//         dispatch(globalLoaderClose());
//         dispatch(
//           showAlert({
//             type: "error",
//             title: err?.error || "Software Types Fetch Failed",
//             message: err?.message || "Software Types API failed",
//           }),
//         );

//         console.log("error_message", err?.message);
//       });
//   };
// };
