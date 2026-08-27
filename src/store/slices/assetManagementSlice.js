import { createSlice } from "@reduxjs/toolkit";
import GlobalLoader from "../../Components/ui/Loader/GlobalLoader";

const initialState = {
  assetMangementAll: [],
  countAssetManagement: null,
  message: null,
  open: false,
};

export const assetManagementSlice = createSlice({
  name: "assetManagement",
  initialState,
  reducers: {
    storeAssetManagement: (state, action) => {
      state.assetMangementAll = action.payload?.content;
      state.countAssetManagement = action.payload?.totalElements;
    },
    openConfirmationDialogue: (state, action) => {
      state.message = action?.payload;
      state.open = true;
    },
    closeConfirmationDialogue: (state, action) => {
      state.open = false;
      state.message = "";
    },
  },
});

export const {
  storeAssetManagement,
  openConfirmationDialogue,
  closeConfirmationDialogue,
} = assetManagementSlice.actions;

export default assetManagementSlice.reducer;
