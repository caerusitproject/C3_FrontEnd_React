import axios from "axios";
import { domainurl } from "./domain.js";

// Create Axios instance
const api = axios.create({
  baseURL: domainurl,
  timeout: 3000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
