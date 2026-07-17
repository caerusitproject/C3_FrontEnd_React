import { requestAssetDashService } from "../services/requestAssetService";
import { storeAssetRequestDash } from "../slices/assetRequestSlice";
import { globalLoaderOpen, globalLoaderClose } from "../slices/globalSlice";
import { showAlert } from "../slices/alertSlice";

export const fetchrequestAssetDashboard = () => {
  return (dispatch) => {
    dispatch(globalLoaderOpen());
    requestAssetDashService()
      .then((res) => {
        dispatch(globalLoaderClose());
        dispatch(storeAssetRequestDash(res?.data?.data));
        dispatch(
          showAlert({
            type: "success",
            title: "Fetched Asset Request Successfully",
          }),
        );
        console.log("employee details___", res);
      })
      .catch((err) => {
        dispatch(globalLoaderClose());
        dispatch(
          showAlert({
            type: "error",
            title: err?.error || "Asset Request Fetch Failed",
            message: err?.message || "Project Request API failed",
          }),
        );

        console.log("error_message", err?.message);
      });
  };
};
