import api from "../../Config/axiosInstance";
const baseURl = "https://plenty-constant-residual.ngrok-free.dev";

let token = localStorage.getItem("access-token");

const AUTH_URL = "/auth";

export const authService = {
  getPublicKey: () => api.get("/auth/public-key"),
  login: (payload) =>
    api.post(`${AUTH_URL}/login`, payload).then((r) => r.data),
  logout: () => api.post(`${AUTH_URL}/logout`, {}).then((r) => r.data),
};

export const logoutService = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = api.post(
        `/auth/logout`,
        {}, // request body (empty)
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      resolve(response?.data);
    } catch (err) {
      reject(err);
    }
  });
};
