import axios from "axios";

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

export const setupInterceptors = (
  apiInstance: any,
  onTokenRefresh: (access: string, refresh?: string) => void,
  onLogout: () => void,
  refreshTokenFn: (
    refresh: string
  ) => Promise<{ access: string; refresh?: string }>
) => {
  apiInstance.interceptors.response.use(
    (response: any) => response,
    async (error: any) => {
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
              return apiInstance(originalRequest);
            })
            .catch((err) => {
              return Promise.reject(err);
            });
        }

        isRefreshing = true;
        const refresh = localStorage.getItem("refresh");

        if (!refresh) {
          onLogout();
          isRefreshing = false;
          return Promise.reject(error);
        }

        try {
          const data = await refreshTokenFn(refresh);
          onTokenRefresh(data.access, data.refresh || refresh);

          localStorage.setItem("access", data.access);
          if (data.refresh) localStorage.setItem("refresh", data.refresh);

          apiInstance.defaults.headers["Authorization"] =
            "Bearer " + data.access;
          processQueue(null, data.access);
          originalRequest.headers["Authorization"] = "Bearer " + data.access;

          return apiInstance(originalRequest);
        } catch (err) {
          processQueue(err, null);
          onLogout();
          return Promise.reject(err);
        } finally {
          isRefreshing = false;
        }
      }

      return Promise.reject(error);
    }
  );
};
