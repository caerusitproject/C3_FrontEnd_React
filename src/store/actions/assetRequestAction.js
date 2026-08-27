import {
  fetchAssetRequestService,
  fetchAssetRequestByIdService,
  fetchAssetRequestApprovalByIdService,
} from "../services/assetRequestService";
import { showAlert } from "../slices/alertSlice";
import {
  storeAssetRequest,
  storeAssetRequestById,
} from "../slices/assetRequestSlice";
import { globalLoaderOpen, globalLoaderClose } from "../slices/globalSlice";

export const fetchAssetRequest = (page, size) => {
  return (dispatch) => {
    dispatch(globalLoaderOpen());
    fetchAssetRequestService(page, size)
      .then((res) => {
        dispatch(globalLoaderClose());
        dispatch(storeAssetRequest(res?.data?.data));
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

export const fetchAssetRequestById = (assetId) => {
  return (dispatch) => {
    dispatch(globalLoaderOpen());
    fetchAssetRequestByIdService(assetId)
      .then((res) => {
        dispatch(globalLoaderClose());
        dispatch(storeAssetRequestById(res?.data?.data));
        dispatch(
          showAlert({
            type: "success",
            title: "Fetched Asset Request Id Successfully",
          }),
        );
        console.log("employee details___", res);
      })
      .catch((err) => {
        dispatch(globalLoaderClose());
        dispatch(
          showAlert({
            type: "error",
            title: err?.error || "Asset Request Id Fetch Failed",
            message: err?.message || "Asset Request Id API failed",
          }),
        );

        console.log("error_message", err?.message);
      });
  };
};

export const fetchAssetRequestApprovalById = (assetObj) => {
  return (dispatch) => {
    dispatch(globalLoaderOpen());
    fetchAssetRequestApprovalByIdService(assetObj)
      .then((res) => {
        dispatch(globalLoaderClose());
        dispatch(
          showAlert({
            type: "success",
            title: "Fetched Asset Request Approval Id Successfully",
          }),
        );
        console.log("employee details___", res);
      })
      .catch((err) => {
        dispatch(globalLoaderClose());
        dispatch(
          showAlert({
            type: "error",
            title: err?.error || "Asset Request Id Approval Fetch Failed",
            message: err?.message || "Asset Request Id Approval API failed",
          }),
        );

        console.log("error_message", err?.message);
      });
  };
};
