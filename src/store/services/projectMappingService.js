import { api } from "../../Config/axiosInstance";

// fetchAllProjectMappingService

export const fetchAllProjectMappingService = (pageIndex, pageSize) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = "";
      if (pageIndex.toString() && pageSize.toString()) {
        response = await api.get(
          `superadmin/allProjectMapping?page=${pageIndex}&size=${pageSize}`,
          {
            "Content-Type": "application/json",
          },
        );
      } else {
        response = api.get(`superadmin/allProjectMapping`, {
          "Content-Type": "application/json",
        });
      }
      if (response) resolve(response);
    } catch (err) {
      reject(err);
    }
  });
};

export const fetchAllEnvService = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await api.get(`superadmin/env`, {
        "Content-Type": "application/json",
      });
      if (response) resolve(response);
    } catch (err) {
      reject(err);
    }
  });
};

export const fetchAllProjectStatusService = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await api.get(`superadmin/allProjStatus`, {
        "Content-Type": "application/json",
      });
      if (response) resolve(response);
    } catch (err) {
      reject(err);
    }
  });
};
// fetchAllProjectStatusService

export const addProjectMappingService = (selectedProjectMap) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await api.post(
        `superadmin/mapProjectWithSoftware`,
        selectedProjectMap,
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
// fetchAllEnvService

export const showAllProjectService = (pageIndex, pageSize) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = "";
      if (pageIndex.toString() && pageSize.toString()) {
        response = await api.get(
          `superadmin/allProjects?page=${pageIndex}&size=${pageSize}`,
          {
            "Content-Type": "application/json",
          },
        );
      } else {
        response = api.get(`superadmin/allProjects`, {
          "Content-Type": "application/json",
        });
      }
      if (response) resolve(response);
    } catch (err) {
      reject(err);
    }
  });
};

export const additionProjectService = (projectData) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await api.post(`superadmin/project`, projectData);
      if (response) resolve(response);
    } catch (err) {
      reject(err);
    }
  });
};

export const updateProjectService = (projectData) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await api.patch(`superadmin/updateProject`, projectData);
      if (response) resolve(response);
    } catch (err) {
      reject(err);
    }
  });
};

export const updateProjectMappingService = (projectData) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await api.patch(
        `superadmin/updateProjectMapping`,
        projectData,
      );
      if (response) resolve(response);
    } catch (err) {
      reject(err);
    }
  });
};

export const showAllSoftwareService = (pageIndex, pageSize) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = "";
      if (pageIndex.toString() && pageSize.toString()) {
        response = api.get(
          `superadmin/allSoftwares?page=${pageIndex}&size=${pageSize}`,
        );
      } else {
        response = api.get(`superadmin/allSoftwares`);
      }
      if (response) resolve(response);
    } catch (err) {
      reject(err);
    }
  });
};
// addSoftwareService
export const addSoftwareService = (softwareData) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = api.post(`superadmin/addSoftware`, softwareData);
      if (response) resolve(response);
    } catch (err) {
      reject(err);
    }
  });
};

export const updateSoftwareService = (softwareData) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = api.patch(`superadmin/updateSoftware`, softwareData);
      if (response) resolve(response);
    } catch (err) {
      reject(err);
    }
  });
};

export const allSoftwareTypesService = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = api.get(`superadmin/allSoftwareTypes`);
      if (response) resolve(response);
    } catch (err) {
      reject(err);
    }
  });
};
