import {externalLinkService} from "../services/externalLinkService";
import { showAlert } from "../slices/alertSlice";
import { globalLoaderOpen, globalLoaderClose} from "../slices/globalSlice";

export const fetchExternalLinks = () => async (dispatch) => {
  dispatch(globalLoaderOpen());
    try {
        const data = await externalLinkService.getExternalLinks();
        return data;
    } catch (error) {
        dispatch(
            showAlert({
                type: "error",
                title: "Error",
                message: error?.message || "Failed to fetch external links.",
            })
        );
        return null;
    }
    finally {
        dispatch(globalLoaderClose());
    }
};

