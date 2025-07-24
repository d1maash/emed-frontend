import { api } from "@/utils/api";
import { User } from "@/types/user";
import { Application, CreateApplicationResponse } from "@/types/application";

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

export const getApplicationByConscript = async (
  search: string,
  access: string
): Promise<Application[]> => {
  const response = await api.get("/api/applications/", {
    params: { search: search },
    headers: {
      Authorization: `Bearer ${access}`,
      "Content-Type": "application/json",
    },
  });
  return response.data;
};
