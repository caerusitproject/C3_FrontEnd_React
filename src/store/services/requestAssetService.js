import api from "../../Config/axiosInstance";

export const requestAssetDashService = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = "";

      response = await api.get(`v1/dashboard`, {
        "Content-Type": "application/json",
      });
      if (response) resolve(response);
    } catch (err) {
      reject(err);
    }
  });
};
