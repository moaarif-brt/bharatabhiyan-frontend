import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

export const api = axios.create({
  baseURL: API_BASE_URL,
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
