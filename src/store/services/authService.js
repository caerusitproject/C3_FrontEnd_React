import api from "../../Config/axiosInstance";

const AUTH_URL = "/auth";

export const authService = {
  login:  (payload) => api.post(`${AUTH_URL}/login`, payload).then((r) => r.data),
  logout: ()        => api.post(`${AUTH_URL}/logout`, {}).then((r) => r.data),
};
