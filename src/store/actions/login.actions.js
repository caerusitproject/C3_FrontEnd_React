import { authService } from "../services/authService";
import { showAlert } from "../slices/alertSlice";
import {
  loginRequest,
  loginSuccess,
  loginFailure,
  logout,
  toggleSidebar,
  setPublicKey,
} from "../slices/loginSlice";
import JSEncrypt from "jsencrypt";
import { globalLoaderOpen, globalLoaderClose} from "../slices/globalSlice";
export const userLogin = (data) => async (dispatch) => {
  dispatch(loginRequest());
  dispatch(globalLoaderOpen());

  try {


//     // ==========================================
//     // STEP 1 : Get Public Key from Login Service
//     // ==========================================

//     const response = await authService.getPublicKey();

//     const publicKey = response.data;

//     // ==========================================
//     // STEP 2 : Convert Base64 Key to PEM Format
//     // JSEncrypt expects PEM format
//     // ==========================================

//     const pemPublicKey = `-----BEGIN PUBLIC KEY-----
// ${publicKey}
// -----END PUBLIC KEY-----`;

//     // ==========================================
//     // STEP 3 : Encrypt Password
//     // ==========================================

//     const encrypt = new JSEncrypt();

//     encrypt.setPublicKey(pemPublicKey);

//     const encryptedPassword = encrypt.encrypt(data.password);

//     if (!encryptedPassword) {
//       throw new Error("Password encryption failed");
//     }

//     // ==========================================
//     // STEP 4 : Create Login Payload
//     // ==========================================

//     const loginPayload = {
//       ...data,
//       password: encryptedPassword,
//     };

//     // ==========================================
//     // STEP 5 : Call Existing Login API
//     // ==========================================

//     const loginResponse = await authService.login(loginPayload);

//     dispatch(loginSuccess(loginResponse));

//     dispatch(
//       showAlert({
//         type: "success",
//         title: "Login Successful",
//         message: `Welcome back, ${loginResponse.employee?.employeeName || ""}!`,
//       })
//     );

//     return {
//       success: true,
//       data: loginResponse,
//     };




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
  finally {
    dispatch(globalLoaderClose());
  }
};

