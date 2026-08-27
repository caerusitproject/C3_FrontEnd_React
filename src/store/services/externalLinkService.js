import { api } from "../../Config/axiosInstance";

const HOME_URL = "/home";

export const authService = {
  getExternalLinks: () =>
    api.get(`${HOME_URL}/externalLinks`).then((r) => r.data),
};
