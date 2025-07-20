import { api } from "@/utils/api";

export const getRecruitDashboard = async (access: string) => {
  const response = await api.get(`/api/users/dashboard/conscript/`, {
    headers: {
      Authorization: `Bearer ${access}`,
    },
  });
  return response.data;
};
