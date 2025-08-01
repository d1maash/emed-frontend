import { CommissionHearingList } from "@/types/commission";
import { api } from "@/utils/api";

export interface CommissionDashboardResponse {
  profile: {
    name: string;
    position: string;
  };
  scheduled_hearings: CommissionHearingList[];
  current_hearings: CommissionHearingList[];
  pending_appeals: any[];
  stats: {
    scheduled_hearings: number;
    current_hearings: number;
    hearings_today: number;
    decisions_week: number;
    decisions_month: number;
    pending_appeals: number;
  };
  tasks: any[];
  notificat4ions_count: number;
}

export const getCommissionDashboard = async (
  access: string
): Promise<CommissionDashboardResponse> => {
  const response = await api.get(`/api/users/dashboard/commission/`, {
    headers: {
      Authorization: `Bearer ${access}`,
    },
  });
  return response.data;
};

export const getCommissionHearingDetailById = async (
  access: string,
  id: string | number
) => {
  const response = await api.get(`/api/commission/hearings/${id}/`, {
    headers: {
      Authorization: `Bearer ${access}`,
    },
  });
  return response.data;
};
