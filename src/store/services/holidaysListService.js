import { superAdminApi } from "../../Config/axiosInstance";

// fetchAllProjectMappingService

export const fetchHolidaysListService = (page, size, year) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = "";
      // holiday list GET API
      response = await superAdminApi.get(
        `/v1/holidays/year/${year}?page=${page}&size=${size}`,
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

export const createHolidayListService = (payload) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = "";

      response = await superAdminApi.post(`/v1/holidays`, payload, {
        "Content-Type": "application/json",
      });

      if (response) resolve(response);
    } catch (err) {
      reject(err);
    }
  });
};
export const updateHolidayListService = (payload, holidayId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = "";

      response = await superAdminApi.put(`/v1/holidays/${holidayId}`, payload, {
        "Content-Type": "application/json",
      });

      if (response) resolve(response);
    } catch (err) {
      reject(err);
    }
  });
};
// updateHolidayListService

export const fetchHolidayTypeCodeListService = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = "";

      response = await superAdminApi.get(
        `/v1/code-master/code-sets/HOLIDAY_TYPE/values`,
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

export const deleteHolidayListService = (holidayId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = "";

      response = await superAdminApi.delete(`/v1/holidays/${holidayId}`, {
        "Content-Type": "application/json",
      });

      if (response) resolve(response);
    } catch (err) {
      reject(err);
    }
  });
};
// fetchAssetRequestApprovalByIdService
