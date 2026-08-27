import axios from "axios";
import { store } from "../store";
import { logout } from "../store/slices/loginSlice";
import { showAlert } from "../store/slices/alertSlice";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL_LOGIN,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

const leaveApi = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL_LEAVE,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

/* ============================================================
   REQUEST INTERCEPTOR
   Attach access token to BOTH api and leaveApi
   ============================================================ */

const attachAccessToken = (config) => {
  if (config.skipAuth) {
    return config;
  }

  const accessToken = localStorage.getItem("access-token");

  if (accessToken) {
    config.headers = config.headers || {};

    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
};

/* api */
api.interceptors.request.use(attachAccessToken, (error) =>
  Promise.reject(error),
);

/* leaveApi */
leaveApi.interceptors.request.use(attachAccessToken, (error) =>
  Promise.reject(error),
);

/* ============================================================
   TOKEN REFRESH
   ============================================================ */

let isRefreshing = false;

let failedQueue = [];

/* ============================================================
   PROCESS QUEUED REQUESTS
   ============================================================ */

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (token) {
      prom.resolve(token);
    } else {
      prom.reject(error);
    }
  });

  failedQueue = [];
};

/* ============================================================
   RESPONSE INTERCEPTOR
   api
   ============================================================ */

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (originalRequest?.skipAuth) {
      return Promise.reject(error);
    }

    if (
      error.response?.status === 401 ||
      (error.response?.status === 404 && !originalRequest._retry)
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve,
            reject,
          });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;

            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = localStorage.getItem("refresh-token");

        const response = await axios.post(
          `${process.env.REACT_APP_API_BASE_URL}/auth/refresh`,
          {
            refreshToken,
          },
        );

        const newAccessToken = response?.data?.accessToken;

        localStorage.setItem("access-token", newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        processQueue(null, newAccessToken);

        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);

        if (
          refreshError.response?.status === 401 ||
          refreshError.response?.status === 404
        ) {
          localStorage.removeItem("access-token");
          localStorage.removeItem("refresh-token");

          store.dispatch(logout());

          store.dispatch(
            showAlert({
              type: "error",
              title: "Session Expired",
              message: "Your session has expired. Please login again.",
            }),
          );

          window.location.href = "/login";
        }

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

/* ============================================================
   RESPONSE INTERCEPTOR
   leaveApi
   ============================================================ */

leaveApi.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (originalRequest?.skipAuth) {
      return Promise.reject(error);
    }

    if (
      error.response?.status === 401 ||
      (error.response?.status === 404 && !originalRequest._retry)
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve,
            reject,
          });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;

            return leaveApi(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = localStorage.getItem("refresh-token");

        const response = await axios.post(
          `${process.env.REACT_APP_API_BASE_URL}/auth/refresh`,
          {
            refreshToken,
          },
        );

        const newAccessToken = response?.data?.accessToken;

        localStorage.setItem("access-token", newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        processQueue(null, newAccessToken);

        return leaveApi(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);

        if (
          refreshError.response?.status === 401 ||
          refreshError.response?.status === 404
        ) {
          localStorage.removeItem("access-token");
          localStorage.removeItem("refresh-token");

          store.dispatch(logout());

          store.dispatch(
            showAlert({
              type: "error",
              title: "Session Expired",
              message: "Your session has expired. Please login again.",
            }),
          );

          window.location.href = "/login";
        }

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

export { api, leaveApi };
