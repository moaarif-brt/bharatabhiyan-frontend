import axios from "axios";

const BACKEND_ORIGIN = import.meta.env.VITE_BACKEND_ORIGIN || "https://bharatabhiyan.onrender.com";
const API_BASE_URL = `${BACKEND_ORIGIN}/api`;

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
