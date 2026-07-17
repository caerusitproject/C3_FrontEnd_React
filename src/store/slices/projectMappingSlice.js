import { createSlice } from "@reduxjs/toolkit";
import GlobalLoader from "../../Components/ui/Loader/GlobalLoader";

const initialState = {
  allProjects: [],
  allSoftwares: [],
  allSoftwareTypes: [],
  allProjectMappings: [],
  allEnv: [],
  allProjectStatus: [],
  countProjectList: null,
  countSoftwareList: null,
  countProjectMappings: null,
};

export const projectMappingSlice = createSlice({
  name: "projectMapping",
  initialState,
  reducers: {
    storeAllProjects: (state, action) => {
      state.allProjects = action.payload?.projectDtoList;
      state.countProjectList = action.payload?.count;
    },
    storeAllSoftware: (state, action) => {
      state.allSoftwares = action.payload?.softwareDtoList;
      state.countSoftwareList = action.payload?.count;
    },
    storeAllSoftwareTypes: (state, action) => {
      state.allSoftwareTypes = action.payload;
    },
    storeAllProjectsMapping: (state, action) => {
      state.allProjectMappings = action.payload?.allProjectMapResponseDtos;
      state.countProjectMappings = action.payload?.count;
    },
    storeAllEnv: (state, action) => {
      state.allEnv = action.payload;
    },
    storeAllProjectStatus: (state, action) => {
      state.allProjectStatus = action.payload;
    },
  },
});

export const {
  storeAllProjects,
  storeAllSoftware,
  storeAllSoftwareTypes,
  storeAllProjectsMapping,
  storeAllEnv,
  storeAllProjectStatus,
} = projectMappingSlice.actions;

export default projectMappingSlice.reducer;
