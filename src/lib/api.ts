import axios from "axios";

export const api = axios.create({
  baseURL: "/api",
  withCredentials: true,
  timeout: 10000,
});

/* ================================
   REQUEST INTERCEPTOR
   - Attach access token if exists
================================ */
api.interceptors.request.use(
  (config) => {
    const accessToken = sessionStorage.getItem("access");

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/* ================================
   RESPONSE INTERCEPTOR
   - Handle auth & permission errors
================================ */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;

    if (status === 401) {
      sessionStorage.clear();
      window.location.href = "/login";
    }

    if (status === 403) {
      console.warn("Access forbidden:", error?.response?.data);
    }

    return Promise.reject(error);
  }
);
