import axios from "axios";
import { store } from "../store";
import { logout } from "../store/slices/loginSlice";
import { showAlert } from "../store/slices/alertSlice";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     const status = error?.response?.status;
//     const errData = error?.response?.data;
//     console.log("status data", status, errData);

//     if (status === 401) {
//       store.dispatch(logout());
//       return Promise.reject(errData);
//     }

//     if (status >= 500) {
//       store.dispatch(
//         showAlert({
//           type: "error",
//           title: "Server Error",
//           message:
//             errData?.message || "Something went wrong. Please try again.",
//         }),
//       );
//     }

//     // shape the rejection to match your API error format:
//     // { timestamp, status, error, message }
//     return Promise.reject(errData || error);
//   },
// );

//  New Addition for refresh token call and setting of the accessToken

let isRefreshing = false;
// Queue to hold requests while refreshing
let failedQueue = [];

// Process queued requests after token refresh
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

// Add request interceptor to attach access token
api.interceptors.request.use(
  (config) => {
    if (config.skipAuth) {
      return config; // no tokens attached
    }
    const accessToken = localStorage.getItem("access-token");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Add response interceptor to handle 401 errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (originalRequest?.skipAuth) {
      return Promise.reject(error);
    }

    // Check if error is 401 and request hasn't been retried
    if (
      error.response?.status === 401 ||
      (error.response?.status === 404 && !originalRequest._retry)
    ) {
      if (isRefreshing) {
        // Queue the request if refresh is in progress
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers["Authorization"] = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = localStorage.getItem("refresh-token");
        // Make request to refresh token endpoint
        const response = await axios.post(
          `${process.env.REACT_APP_API_BASE_URL}/auth/refresh`,
          {
            refreshToken: refreshToken,
          },
        );
        console.log("axios instance__", response?.data);
        const newAccessToken = response?.data.accessToken;
        localStorage.setItem("access-token", newAccessToken);

        // Update authorization header for original request
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

        // Process queued requests
        processQueue(null, newAccessToken);

        // Retry original request
        return api(originalRequest);
      } catch (refreshError) {
        // Handle refresh token failure (e.g., invalid refresh token)
        // processQueue(refreshError);
        // console.error('Refresh token error:', refreshError);
        // localStorage.removeItem("access-token");
        // localStorage.removeItem("refresh-token");
        // Optionally redirect to login page
        // window.location.href = "/login";
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

export default api;
