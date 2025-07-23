import { api } from "@/utils/api";
import { User } from "@/types/user";
import { CreateApplicationResponse } from "@/types/application";

export interface Application {
  id: number;
  conscript_iin: string;
  status: string;
  created_at: string;
  updated_at: string;
  lmo_id?: number;
}

export interface LMO {
  id: number;
  name: string;
  address: string;
  phone: string;
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
