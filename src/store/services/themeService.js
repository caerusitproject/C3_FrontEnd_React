import api from "../../Config/axiosInstance";

const THEME_URL = "auth/theme";

export const themeService = {
  getThemes: () =>
    api.get(THEME_URL).then((r) => r.data),

  updateActiveTheme: (themeId) =>
    api
      .post(`${THEME_URL}/active`, {
        themeId,
      })
      .then((r) => r.data),
};