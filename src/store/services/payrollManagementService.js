import { payrollApi } from "../../Config/axiosInstance";

// fetchAllProjectMappingService

export const fetchPayrollManagementService = (employeeId, effectiveDate) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = "";
      if (employeeId) {
        response = await payrollApi.get(
          `/v1/salary-structures/employee/${employeeId}/current?effectiveDate=${effectiveDate}`,
          {
            "Content-Type": "application/json",
          },
        );
      }
      if (response) resolve(response);
    } catch (err) {
      reject(err);
    }
  });
};

export const viewSalarySlipByYearService = (employeeId, year) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = "";

      response = await payrollApi.get(
        `/v1/salary-slips/employee/${employeeId}?year=${year}`,
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

export const salarySlipDownloadService = (salarySlipId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = "";

      response = await payrollApi.get(
        `/v1/salary-slips/${salarySlipId}/download`,
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

export const handleSalarySlipDownloadService = async (salarySlipId) => {
  try {
    const response = await payrollApi.get(
      `/v1/salary-slips/${salarySlipId}/download`,
      {
        responseType: "blob",
      },
    );

    console.log("response:", response);
    console.log("data type:", response.data?.type);
    console.log("data size:", response.data?.size);

    const url = window.URL.createObjectURL(response.data);

    const link = document.createElement("a");
    link.href = url;
    link.download = "salary-slip.pdf";

    document.body.appendChild(link);
    link.click();
    link.remove();

    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Failed to download salary slip:", error);
  }
};

export const salarySlipPreviewService = (salarySlipId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = "";

      response = await payrollApi.get(`/v1/salary-slips/${salarySlipId}`, {
        "Content-Type": "application/json",
      });

      if (response) resolve(response);
    } catch (err) {
      reject(err);
    }
  });
};
// updateAssetManagementService
// addAssetManagementService
