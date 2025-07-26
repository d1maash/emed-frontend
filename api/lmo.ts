import { LMO } from "@/types/application";
import { api } from "@/utils/api";

export const getLMOByConscript = async (
  search: string,
  access: string
): Promise<LMO[]> => {
  const response = await api.get("/api/medical/lmos/", {
    params: { search: search },
    headers: {
      Authorization: `Bearer ${access}`,
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const getLMOById = async (
  lmoId: number,
  access: string
): Promise<LMO> => {
  const response = await api.get(`/api/medical/lmos/${lmoId}`, {
    headers: {
      Authorization: `Bearer ${access}`,
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const assignDoctor = async (
  lmoId: number,
  doctorId: number,
  queueId: number,
  access: string
): Promise<{ doctorId: number; queueId: number }> => {
  const response = await api.post(
    `api/medical/lmos/${lmoId}/assign-doctor/`,
    {
      doctor_id: doctorId,
      queue_id: queueId,
    },
    {
      headers: {
        Authorization: `Bearer ${access}`,
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};
