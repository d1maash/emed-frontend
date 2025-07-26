import { api } from "@/utils/api";
import { User } from "@/types/user";
import {
  ConscriptApplicationDetail,
  ConscriptApplicationList,
} from "@/types/application";
import { LMODetail } from "@/types/lmo";

export interface CreateApplicationResponse {
  application: ConscriptApplicationDetail;
  lmo: LMODetail;
}

export const createApplicationByCoordinator = async (
  iin: string,
  access: string
): Promise<CreateApplicationResponse> => {
  const response = await api.post(
    `/api/applications/create_by_coordinator/`,
    { iin },
    {
      headers: {
        Authorization: `Bearer ${access}`,
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

export const sendToMedical = async (
  applicationId: number,
  access: string
): Promise<{ message: string }> => {
  const response = await api.post(
    `/api/applications/${applicationId}/send_to_medical/`,
    {},
    {
      headers: {
        Authorization: `Bearer ${access}`,
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

export const getApplicationsList = async (
  search: string,
  access: string
): Promise<ConscriptApplicationList[]> => {
  const response = await api.get("/api/applications/", {
    params: { search: search },
    headers: {
      Authorization: `Bearer ${access}`,
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const getApplicationById = async (
  id: number,
  access: string
): Promise<ConscriptApplicationDetail> => {
  const response = await api.get(`/api/applications/${id}/`, {
    headers: {
      Authorization: `Bearer ${access}`,
      "Content-Type": "application/json",
    },
  });
  return response.data;
};
