import { api } from "../../Config/axiosInstance";

// fetchAllProjectMappingService

export const fetchAssetRequestService = (page, size) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = "";

      response = await api.get(`/v1/asset-requests?page=${page}&size=${size}`, {
        "Content-Type": "application/json",
      });

      if (response) resolve(response);
    } catch (err) {
      reject(err);
    }
  });
};

export const fetchAssetRequestByIdService = (assetId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = "";

      response = await api.get(`/v1/asset-requests/${assetId}`, {
        "Content-Type": "application/json",
      });

      if (response) resolve(response);
    } catch (err) {
      reject(err);
    }
  });
};

export const fetchAssetRequestApprovalByIdService = (assetObj) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = "";

      response = await api.post(`/v1/asset-request-approvals`, assetObj, {
        "Content-Type": "application/json",
      });

      if (response) resolve(response);
    } catch (err) {
      reject(err);
    }
  });
};
// fetchAssetRequestApprovalByIdService
