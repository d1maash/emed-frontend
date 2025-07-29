import { api } from "@/utils/api";

export const getCommissionDashboard = async (access: string) => {
  const response = await api.get(`/api/users/dashboard/commission/`, {
    headers: {
      Authorization: `Bearer ${access}`,
    },
  });
  return response.data;
};
