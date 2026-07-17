import { createSlice } from "@reduxjs/toolkit";
import GlobalLoader from "../../Components/ui/Loader/GlobalLoader";

const initialState = {
  assetRequestAll: [],
  countAsset: null,
};

export const assetRequestSlice = createSlice({
  name: "projectMapping",
  initialState,
  reducers: {
    storeAssetRequestDash: (state, action) => {
      state.assetRequestAll = action.payload?.assets;
      state.countAsset = action.payload?.totalAssets;
    },
  },
});

export const { storeAssetRequestDash } = assetRequestSlice.actions;

export default assetRequestSlice.reducer;
