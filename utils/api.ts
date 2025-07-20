// src/utils/api.ts
import axios from "axios";
import { store } from "@/store";
import { refreshToken as refreshTokenApi } from "@/api/auth";
import { setTokens, logout } from "@/store/slices/authSlice";

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response &&
      error.response.status === 401 &&
      error.response.data?.code === "token_not_valid" &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers["Authorization"] = "Bearer " + token;
            return api(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }
      isRefreshing = true;
      const refresh = localStorage.getItem("refresh");
      if (!refresh) {
        store.dispatch(logout());
        isRefreshing = false;
        return Promise.reject(error);
      }
      try {
        const data = await refreshTokenApi(refresh);
        store.dispatch(
          setTokens({ access: data.access, refresh: data.refresh || refresh })
        );
        localStorage.setItem("access", data.access);
        if (data.refresh) localStorage.setItem("refresh", data.refresh);
        api.defaults.headers["Authorization"] = "Bearer " + data.access;
        processQueue(null, data.access);
        originalRequest.headers["Authorization"] = "Bearer " + data.access;
        return api(originalRequest);
      } catch (err) {
        processQueue(err, null);
        store.dispatch(logout());
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(error);
  }
);

export { api };
