import { api } from "@/utils/api";

export const getCoordinatorDashboard = async (access: string) => {
  const response = await api.get(`/api/users/dashboard/coordinator/`, {
    headers: {
      Authorization: `Bearer ${access}`,
    },
  });
  return response.data;
};
