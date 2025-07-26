import axios from "axios";
import { store } from "@/store";
import { refreshToken as refreshTokenApi } from "@/api/auth";
import { setTokens, logout } from "@/store/slices/authSlice";
import { serialize, parse } from "cookie";

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

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export function setTokenCookie(name: string, value: string, days = 7) {
  if (typeof document === "undefined") return;
  document.cookie = serialize(name, value, {
    path: "/",
    maxAge: 60 * 60 * 24 * days,
    secure: true,
    sameSite: "lax",
  });
}

export function getTokenCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const cookies = parse(document.cookie || "");
  return cookies[name] || null;
}

export function removeTokenCookie(name: string) {
  if (typeof document === "undefined") return;
  document.cookie = serialize(name, "", {
    path: "/",
    maxAge: -1,
  });
}

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
      const refresh = getTokenCookie("refresh");
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
        setTokenCookie("access", data.access);
        if (data.refresh) setTokenCookie("refresh", data.refresh);
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
