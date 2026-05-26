import api from "../../Config/axiosInstance";
// let token = localStorage.getItem("access-token");

export const createPostsService = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await api.get("/posts", {
        // headers: {
        //     'Authorization': `Bearer ${token}`,
        //     'X-Correlation-Id': xCorrelationId
        // }
      });
      console.log("resolve__", response);
      resolve(response.data);
    } catch (err) {
      reject(err);
    }
  });
};
