import {
  api,
  getTokenCookie,
  setTokenCookie,
  removeTokenCookie,
} from "@/utils/api";

export const login = async (data: { iin: string; password: string }) => {
  const response = await api.post(`/api/users/auth/login/`, data, {
    headers: { "Content-Type": "application/json" },
  });
  setTokenCookie("access", response.data.access);
  setTokenCookie("refresh", response.data.refresh);
  return response.data;
};

export const getMe = async (access?: string) => {
  const token = access || getTokenCookie("access");
  const response = await api.get(`/api/users/me/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const ecpLogin = async (data: {
  p12_base64: string;
  password: string;
}) => {
  const response = await api.post(`/api/users/auth/ecp-login/`, data, {
    headers: { "Content-Type": "application/json" },
  });
  setTokenCookie("access", response.data.access);
  setTokenCookie("refresh", response.data.refresh);
  return response.data;
};

export const refreshToken = async (refresh?: string) => {
  const token = refresh || getTokenCookie("refresh");
  const response = await api.post(
    `/api/users/auth/refresh/`,
    { refresh: token },
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  setTokenCookie("access", response.data.access);
  if (response.data.refresh) setTokenCookie("refresh", response.data.refresh);
  return response.data;
};

export const logout = async (access?: string) => {
  const token = access || getTokenCookie("access");
  removeTokenCookie("access");
  removeTokenCookie("refresh");
  return api.post(
    `/api/users/auth/logout/`,
    {},
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};
