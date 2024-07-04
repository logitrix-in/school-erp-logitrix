import axios from "axios";

const api = axios.create({
  baseURL: "https://server.sociolinq.com/api",
  headers: { "x-api-key": "a8518942-17ea-44a6-b4e1-a974189a9a90" },
  withCredentials: true,
});

const exportAPI = axios.create({
  baseURL: "https://downloads.sociolinq.com",
  headers: { "x-api-key": "a8518942-17ea-44a6-b4e1-a974189a9a90" },
  withCredentials: true,
});

export default api;

export { exportAPI };
