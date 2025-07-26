import { api } from "@/utils/api";
// import { Conscript } from "@/types/conscript";
import { User } from "@/types/user";

export const listConscripts = async (
  search: string,
  access: string,
  isVerified?: boolean
): Promise<User[]> => {
  try {
    const response = await api.get<User[]>("/api/users/list/", {
      params: { role: "conscript", search: search, verified: isVerified },
      headers: {
        Authorization: `Bearer ${access}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error: any) {
    if (error.response?.status === 404) {
      throw new Error("Призывники не найдены");
    }
    throw new Error(error.response?.data?.message || "Призывники не найдены");
  }
};
