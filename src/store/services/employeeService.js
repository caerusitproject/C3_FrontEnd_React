import { api } from "../../Config/axiosInstance";

let token = localStorage.getItem("access-token");

export const fetchEmployeeService = (empCode, role) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await api.get(
        `employees/profile-details?empCode=${empCode}`,
        {
          headers: {
            "X-Emp-Code": empCode ? empCode : "",
            "X-Role": role ? role : "",
          },
        },
      );
      if (response) resolve(response);
    } catch (err) {
      reject(err);
    }
  });
};

export const updateEmployeeService = (empCode, role, empObj) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await api.put(
        `employees/update?empCode=${empCode}`,
        empObj,
        // {
        //   headers: {
        //     "X-Emp-Code": empCode ? empCode : "",
        //     "X-Role": role ? role : "",
        //   },
        // },
      );
      if (response) resolve(response);
    } catch (err) {
      reject(err);
    }
  });
};
