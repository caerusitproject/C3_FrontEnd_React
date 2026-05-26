// services/auth/authService.js

import api from "../../Config/axiosInstance";

const AUTH_BASE_URL = "/auth";

const getAuthHeaders = () => {
  const token = getCookie("accessToken");

  return {
    "Content-Type": "application/json",
  };
};

export const authService = {
  login: async (payload) => {
    try {
      const response = await api.post(
        `${AUTH_BASE_URL}/login`,
        payload,
        {
          headers: getAuthHeaders(),
          withCredentials: true,
        }
      );

      return response.data;
    } catch (error) {
      console.error("login_error__", error);

      throw (
        error?.response?.data || {
          message: "Login failed",
        }
      );
    }
  },

  logout: async () => {
    try {
      const response = await api.post(
        `${AUTH_BASE_URL}/logout`,
        {},
        {
          headers: getAuthHeaders(),
          withCredentials: true,
        }
      );

      return response.data;
    } catch (error) {
      console.error("logout_error__", error);

      throw error?.response?.data;
    }
  },

  
};