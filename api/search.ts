import { User } from "@/types/user";
import { api } from "@/utils/api";

export interface SearchUserParams {
  iin: string;
  role?: "conscript" | "coordinator" | "doctor" | "commission";
}

export const searchUser = async (
  iin: SearchUserParams,
  access: string
): Promise<User> => {
  const response = await api.post(
    `/api/users/search/`,
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

export const searchConscript = async (
  iin: string,
  access: string
): Promise<User> => {
  try {
    const response = await api.post(
      `/api/users/search/`,
      { iin },
      {
        headers: {
          Authorization: `Bearer ${access}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.data.role !== "conscript") {
      throw new Error("Пользователь не является призывником");
    }
    return response.data;
  } catch (error: any) {
    if (error.response?.status === 404) {
      throw new Error("Призывник не найден");
    }
    throw new Error(error.response?.data?.message || "Призывник не найден");
  }
};

export const searchCoordinator = async (
  iin: string,
  access: string
): Promise<User> => {
  try {
    const response = await api.post(
      `/api/users/search/`,
      { iin },
      {
        headers: {
          Authorization: `Bearer ${access}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.data.role !== "coordinator") {
      throw new Error("Пользователь не является координатором");
    }
    return response.data;
  } catch (error: any) {
    if (error.response?.status === 404) {
      throw new Error("Координатор не найден");
    }
    throw new Error(error.response?.data?.message || "Координатор не найден");
  }
};

export const searchDoctor = async (
  iin: string,
  access: string
): Promise<User> => {
  try {
    const response = await api.post(
      `/api/users/search/`,
      { iin },
      {
        headers: {
          Authorization: `Bearer ${access}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.data.role !== "doctor") {
      throw new Error("Пользователь не является доктором");
    }
    return response.data;
  } catch (error: any) {
    if (error.response?.status === 404) {
      throw new Error("Доктор не найден");
    }
    throw new Error(error.response?.data?.message || "Доктор не найден");
  }
};
