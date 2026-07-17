import {
  showAllProjectService,
  showAllSoftwareService,
  additionProjectService,
  updateProjectService,
  addSoftwareService,
  updateSoftwareService,
  allSoftwareTypesService,
  fetchAllProjectMappingService,
  fetchAllEnvService,
  addProjectMappingService,
  fetchAllProjectStatusService,
  updateProjectMappingService,
} from "../services/projectMappingService";
import { showAlert } from "../slices/alertSlice";
import {
  storeAllProjects,
  storeAllSoftware,
  storeAllSoftwareTypes,
  storeAllProjectsMapping,
  storeAllEnv,
  storeAllProjectStatus,
} from "../slices/projectMappingSlice";
import { globalLoaderOpen, globalLoaderClose } from "../slices/globalSlice";

export const addProjectMapping = (selectedProjectedMapping, setPagination) => {
  return (dispatch) => {
    dispatch(globalLoaderOpen());
    addProjectMappingService(selectedProjectedMapping)
      .then((res) => {
        dispatch(globalLoaderClose());
        setPagination((prev) => ({
          ...prev,
          pageIndex: 0,
        }));
        // dispatch(fetchAllProjectsMappings(0, 5));
        dispatch(
          showAlert({
            type: "success",
            title: "Added projects mapping Successfully",
          }),
        );
        console.log("employee details___", res);
      })
      .catch((err) => {
        dispatch(globalLoaderClose());
        dispatch(
          showAlert({
            type: "error",
            title: err?.error || "Projects Mapping addition Failed",
            message: err?.message || "Projects Mapping Addition API failed",
          }),
        );

        console.log("error_message", err?.message);
      });
  };
};

export const updateProjectMapping = (projectData, setPagination) => {
  return (dispatch) => {
    dispatch(globalLoaderOpen());
    updateProjectMappingService(projectData)
      .then((res) => {
        setPagination((prev) => ({
          ...prev,
          pageIndex: 0,
        }));
        // dispatch(fetchAllProjectsMappings(0, 5));
        dispatch(globalLoaderClose());
        dispatch(
          showAlert({
            type: "success",
            title: "Project Mapping updated Successfully",
          }),
        );
        console.log("employee details___", res);
      })
      .catch((err) => {
        dispatch(globalLoaderClose());
        dispatch(
          showAlert({
            type: "error",
            title: err?.error || "Project Mapping Update Failed",
            message: err?.message || "Project Mappping update API failed",
          }),
        );

        console.log("error_message", err?.message);
      });
  };
};

export const fetchAllProjectsMappings = (pageIndex, pageSize) => {
  return (dispatch) => {
    dispatch(globalLoaderOpen());
    fetchAllProjectMappingService(pageIndex, pageSize)
      .then((res) => {
        dispatch(globalLoaderClose());
        dispatch(storeAllProjectsMapping(res?.data));
        dispatch(
          showAlert({
            type: "success",
            title: "Fetched projects mapping Successfully",
          }),
        );
        console.log("employee details___", res);
      })
      .catch((err) => {
        dispatch(globalLoaderClose());
        dispatch(
          showAlert({
            type: "error",
            title: err?.error || "Projects Mapping Fetch Failed",
            message: err?.message || "Projects Mapping API failed",
          }),
        );

        console.log("error_message", err?.message);
      });
  };
};

export const fetchAllProjectStatus = () => {
  return (dispatch) => {
    dispatch(globalLoaderOpen());
    fetchAllProjectStatusService()
      .then((res) => {
        dispatch(globalLoaderClose());
        dispatch(storeAllProjectStatus(res?.data));
        dispatch(
          showAlert({
            type: "success",
            title: "Fetched Project Status Successfully",
          }),
        );
        console.log("employee details___", res);
      })
      .catch((err) => {
        dispatch(globalLoaderClose());
        dispatch(
          showAlert({
            type: "error",
            title: err?.error || "Project Status Fetch Failed",
            message: err?.message || "Project Status API failed",
          }),
        );

        console.log("error_message", err?.message);
      });
  };
};

export const fetchAllEnv = () => {
  return (dispatch) => {
    dispatch(globalLoaderOpen());
    fetchAllEnvService()
      .then((res) => {
        dispatch(globalLoaderClose());
        dispatch(storeAllEnv(res?.data));
        dispatch(
          showAlert({
            type: "success",
            title: "Fetched Env Successfully",
          }),
        );
        console.log("employee details___", res);
      })
      .catch((err) => {
        dispatch(globalLoaderClose());
        dispatch(
          showAlert({
            type: "error",
            title: err?.error || "Env Fetch Failed",
            message: err?.message || "Env API failed",
          }),
        );

        console.log("error_message", err?.message);
      });
  };
};

export const showAllProjects = (pageIndex, pageSize) => {
  return (dispatch) => {
    dispatch(globalLoaderOpen());
    showAllProjectService(pageIndex, pageSize)
      .then((res) => {
        dispatch(globalLoaderClose());
        dispatch(storeAllProjects(res?.data));
        dispatch(
          showAlert({
            type: "success",
            title: "Fetched projects Successfully",
          }),
        );
        console.log("employee details___", res);
      })
      .catch((err) => {
        dispatch(globalLoaderClose());
        dispatch(
          showAlert({
            type: "error",
            title: err?.error || "Projects Fetch Failed",
            message: err?.message || "Projects API failed",
          }),
        );

        console.log("error_message", err?.message);
      });
  };
};

export const addProject = (projectData, setPagination) => {
  return (dispatch) => {
    dispatch(globalLoaderOpen());
    additionProjectService(projectData)
      .then((res) => {
        // dispatch(showAllProjects(0, 5));
        dispatch(globalLoaderClose());
        setPagination((prev) => ({
          ...prev,
          pageIndex: 0,
        }));
        dispatch(
          showAlert({
            type: "success",
            title: "Project Added Successfully",
          }),
        );
        console.log("employee details___", res);
      })
      .catch((err) => {
        dispatch(globalLoaderClose());
        dispatch(
          showAlert({
            type: "error",
            title: err?.error || "Projects Addition Failed",
            message: err?.message || "Projects addition API failed",
          }),
        );

        console.log("error_message", err?.message);
      });
  };
};

export const updateProject = (projectData, setPagination) => {
  return (dispatch) => {
    dispatch(globalLoaderOpen());
    updateProjectService(projectData)
      .then((res) => {
        setPagination((prev) => ({
          ...prev,
          pageIndex: 0,
        }));
        // dispatch(showAllProjects(0, 5));
        dispatch(globalLoaderClose());
        dispatch(
          showAlert({
            type: "success",
            title: "Project updated Successfully",
          }),
        );
        console.log("employee details___", res);
      })
      .catch((err) => {
        dispatch(globalLoaderClose());
        dispatch(
          showAlert({
            type: "error",
            title: err?.error || "Projects Update Failed",
            message: err?.message || "Projects update API failed",
          }),
        );

        console.log("error_message", err?.message);
      });
  };
};

export const showAllSoftware = (pageIndex, pageSize) => {
  return (dispatch) => {
    dispatch(globalLoaderOpen());
    showAllSoftwareService(pageIndex, pageSize)
      .then((res) => {
        dispatch(globalLoaderClose());
        dispatch(storeAllSoftware(res?.data));
        dispatch(
          showAlert({
            type: "success",
            title: "Fetched software Successfully",
          }),
        );
        console.log("employee details___", res);
      })
      .catch((err) => {
        dispatch(globalLoaderClose());
        dispatch(
          showAlert({
            type: "error",
            title: err?.error || "Software Fetch Failed",
            message: err?.message || "Software API failed",
          }),
        );

        console.log("error_message", err?.message);
      });
  };
};

export const addSoftware = (softwareData, setPagination) => {
  return (dispatch) => {
    dispatch(globalLoaderOpen());
    addSoftwareService(softwareData)
      .then((res) => {
        // dispatch(showAllSoftware());
        setPagination((prev) => ({
          ...prev,
          pageIndex: 0,
        }));
        dispatch(globalLoaderClose());
        dispatch(
          showAlert({
            type: "success",
            title: "Software added Successfully",
          }),
        );
        console.log("employee details___", res);
      })
      .catch((err) => {
        dispatch(globalLoaderClose());
        dispatch(
          showAlert({
            type: "error",
            title: err?.error || "Software Addition Failed",
            message: err?.message || "Software API failed",
          }),
        );

        console.log("error_message", err?.message);
      });
  };
};

export const updateSoftware = (softwareData, setPagination) => {
  return (dispatch) => {
    dispatch(globalLoaderOpen());
    updateSoftwareService(softwareData)
      .then((res) => {
        setPagination((prev) => ({
          ...prev,
          pageIndex: 0,
        }));
        // dispatch(showAllSoftware());
        dispatch(globalLoaderClose());
        dispatch(
          showAlert({
            type: "success",
            title: "Software updated Successfully",
          }),
        );
        console.log("employee details___", res);
      })
      .catch((err) => {
        dispatch(globalLoaderClose());
        dispatch(
          showAlert({
            type: "error",
            title: err?.error || "Software Update Failed",
            message: err?.message || "Software update API failed",
          }),
        );

        console.log("error_message", err?.message);
      });
  };
};

export const allSoftwareTypes = () => {
  return (dispatch) => {
    dispatch(globalLoaderOpen());
    allSoftwareTypesService()
      .then((res) => {
        dispatch(globalLoaderClose());
        dispatch(storeAllSoftwareTypes(res?.data));
        dispatch(
          showAlert({
            type: "success",
            title: "Software Types fetched Successfully",
          }),
        );
        console.log("employee details___", res);
      })
      .catch((err) => {
        dispatch(globalLoaderClose());
        dispatch(
          showAlert({
            type: "error",
            title: err?.error || "Software Types Fetch Failed",
            message: err?.message || "Software Types API failed",
          }),
        );

        console.log("error_message", err?.message);
      });
  };
};
