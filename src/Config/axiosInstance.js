import axios from "axios";
import { store } from "../store";
import { logout } from "../store/slices/loginSlice";
import { showAlert } from "../store/slices/alertSlice";

const api = axios.create({
  baseURL: "https://plenty-constant-residual.ngrok-free.dev/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status  = error?.response?.status;
    const errData = error?.response?.data;

    if (status === 401) {
      store.dispatch(logout());
      return Promise.reject(errData);
    }

    if (status >= 500) {
      store.dispatch(
        showAlert({
          type: "error",
          title: "Server Error",
          message: errData?.message || "Something went wrong. Please try again.",
        })
      );
    }

    // shape the rejection to match your API error format:
    // { timestamp, status, error, message }
    return Promise.reject(errData || error);
  }
);

export default api;
