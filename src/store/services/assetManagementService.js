import { api } from "../../Config/axiosInstance";

// fetchAllProjectMappingService

export const fetchAssetManagementService = (pageIndex, pageSize) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = "";
      if (pageIndex.toString() && pageSize.toString()) {
        response = await api.get(
          `/v1/assets?page=${pageIndex}&size=${pageSize}`,
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

export const addAssetManagementService = (selectedAssetManagement) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = "";

      response = await api.post(`/v1/assets`, selectedAssetManagement, {
        "Content-Type": "application/json",
      });

      if (response) resolve(response);
    } catch (err) {
      reject(err);
    }
  });
};

export const updateAssetManagementService = (
  selectedAssetManagement,
  assetId,
) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = "";

      response = await api.put(
        `/v1/assets/${assetId}`,
        selectedAssetManagement,
        {
          "Content-Type": "application/json",
        },
      );

      if (response) resolve(response);
    } catch (err) {
      reject(err);
    }
  });
};

export const deleteAssetManagementService = (assetId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = "";

      response = await api.delete(`/v1/assets/${assetId}`, {
        "Content-Type": "application/json",
      });

      if (response) resolve(response);
    } catch (err) {
      reject(err);
    }
  });
};
// updateAssetManagementService
// addAssetManagementService
