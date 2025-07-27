import { GetActiveLMOsResponse, GetArchiveLMOsResponse } from "@/types/doctor";
import { LMODetail, LMOList } from "@/types/lmo";
import { api } from "@/utils/api";

export const getLMOList = async (
  search: string,
  access: string
): Promise<LMOList[]> => {
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
): Promise<LMODetail> => {
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

export const GetActiveLMOs = async (
  access: string
): Promise<GetActiveLMOsResponse> => {
  const response = await api.get("api/users/dashboard/doctor/active-lmos/", {
    headers: {
      Authorization: `Bearer ${access}`,
      "Content-Type": "application/json",
    },
  });

  return response.data;
};

export const GetArchiveLMOs = async (
  access: string
): Promise<GetArchiveLMOsResponse> => {
  const response = await api.get("api/users/dashboard/doctor/archive-lmos/", {
    headers: {
      Authorization: `Bearer ${access}`,
      "Content-Type": "application/json",
    },
  });

  return response.data;
};
