import { authService } from "../services/authService";
import { showAlert } from "../slices/alertSlice";
import {
  loginRequest,
  loginSuccess,
  loginFailure,
} from "../slices/loginSlice";

export const userLogin = (data) => async (dispatch) => {
  dispatch(loginRequest());

  try {
    // response shape: { employee: {...}, menus: [...] }
    const response = await authService.login(data);

    dispatch(loginSuccess(response));
    dispatch(
      showAlert({
        type: "success",
        title: "Login Successful",
        message: `Welcome back, ${response.employee?.employeeName || ""}!`,
      })
    );

    return { success: true, data: response };

  } catch (err) {
    // err shape from API: { timestamp, status, error, message }
    const message = err?.message || "Login failed";

    dispatch(loginFailure(message));
    dispatch(
      showAlert({
        type: "error",
        title: err?.error || "Login Failed",
        message,
      })
    );

    return { success: false, message };
  }
};
