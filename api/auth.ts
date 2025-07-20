import { api } from "@/utils/api";

export const login = async (data: { iin: string; password: string }) => {
  const response = await api.post(`/api/users/auth/login/`, data, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
};

export const getMe = async (access: string) => {
  const response = await api.get(`/api/users/me/`, {
    headers: {
      Authorization: `Bearer ${access}`,
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
  return response.data;
};

export const refreshToken = async (refresh: string) => {
  const response = await api.post(
    `/api/users/auth/refresh/`,
    { refresh },
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  return response.data;
};

export const logout = async (access: string) => {
  return api.post(
    `/api/users/auth/logout/`,
    {},
    {
      headers: { Authorization: `Bearer ${access}` },
    }
  );
};
