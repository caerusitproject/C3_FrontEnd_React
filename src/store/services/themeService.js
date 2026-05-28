import api from "../../Config/axiosInstance";

const THEME_URL = "auth/theme";

const getAuthHeaders = () => {
  const user = JSON.parse(localStorage.getItem("user")); // 👈 key where you stored object

  return {
    employeeId: user?.employeeId,
    role: user?.role,
  };
};

export const themeService = {
  getThemes: () =>
    api
      .get(THEME_URL, {
        //headers: getAuthHeaders(),
      })
      .then((r) => r.data),

  updateActiveTheme: (themeId) =>
    api
      .post(
        `${THEME_URL}/active`,
        { themeId },
        {
         // headers: getAuthHeaders(),
        }
      )
      .then((r) => r.data),
};