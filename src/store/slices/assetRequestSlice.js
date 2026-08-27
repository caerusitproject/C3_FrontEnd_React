import { createSlice } from "@reduxjs/toolkit";
import GlobalLoader from "../../Components/ui/Loader/GlobalLoader";

const initialState = {
  assetRequestAll: [],
  countAsset: null,
  assetRequestAll: [],
  assetRequestByIdAll: {},
  totalPages: 0,
  totalElements: 0,
};

export const assetRequestSlice = createSlice({
  name: "projectMapping",
  initialState,
  reducers: {
    storeAssetRequestDash: (state, action) => {
      state.assetRequestAll = action.payload?.assets;
      state.countAsset = action.payload?.totalAssets;
    },
    storeAssetRequest: (state, action) => {
      state.assetRequestAll = action.payload?.content;
      state.totalPages = action.payload?.totalPages;
      state.totalElements = action.payload?.totalElements;
    },
    storeAssetRequestById: (state, action) => {
      state.assetRequestByIdAll = action.payload;
    },
  },
});

export const {
  storeAssetRequestDash,
  storeAssetRequest,
  storeAssetRequestById,
} = assetRequestSlice.actions;

export default assetRequestSlice.reducer;
