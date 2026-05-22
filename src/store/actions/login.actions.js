import { loginRequest } from "../slices/loginSlice";

export const userLogin = (data) => {
  return (dispatch) => {
    const user_details = {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      role: "user",
    };
    localStorage.setItem("user", JSON.stringify(user_details));
    try {
      // Simulate an API call with a delay
      dispatch(loginRequest({ user: user_details }));
    } catch (err) {
      console.error("Login failed:", err);
    }
  };
};
