import { api } from "../../Config/axiosInstance";
import { assetManagementApi } from "../../Config/axiosInstance";

// fetchAllProjectMappingService

export const fetchAssetManagementService = (pageIndex, pageSize) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = "";
      if (pageIndex.toString() && pageSize.toString()) {
        response = await assetManagementApi.get(
          `/v1/assets?page=${pageIndex}&size=${pageSize}`,
          {
            "Content-Type": "application/json",
          },
        );
      } else {
        response = await assetManagementApi.get(`/v1/assets`, {
          "Content-Type": "application/json",
        });
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

      response = await assetManagementApi.post(
        `/v1/assets`,
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

export const updateAssetManagementService = (
  selectedAssetManagement,
  assetId,
) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = "";

      response = await assetManagementApi.put(
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

      response = await assetManagementApi.delete(`/v1/assets/${assetId}`, {
        "Content-Type": "application/json",
      });

      if (response) resolve(response);
    } catch (err) {
      reject(err);
    }
  });
};

export const quickAssignAssetTaggingService = (payload) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = "";

      response = await assetManagementApi.post(
        `/v1/assets/quick-assign`,
        payload,
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
// updateAssetManagementService
// addAssetManagementService
