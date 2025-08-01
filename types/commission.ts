import { LMODetail } from "./lmo";

export type CommissionHearingStatus =
  | "scheduled"
  | "in_progress"
  | "completed"
  | "cancelled";

export type CommissionHearingPriorityLevel =
  | "high"
  | "medium"
  | "low"
  | "urgent";

export interface CommissionHearingList {
  id: number;
  lmo_nubmer: string;
  conscript_name: string;
  status: CommissionHearingStatus;
  status_display: string;
  hearing_date: string;
  hearing_date_formatted: string;
  priority_level: CommissionHearingPriorityLevel;
  has_decision: string;
}

export interface CommissionSchedule {
  id: number;
  scheduled_date: string;
  scheduled_date_formatted: string;
  location: string;
  chairman: number;
  members: number[];
  max_hearings: number;
  hearings_count: string;
  status: CommissionHearingStatus;
  notes: string;
  created_at: string;
}

export interface CommissionHearingDetail {
  id: number;
  lmo: LMODetail;
  schedule: CommissionSchedule;
  conscript_name: string;
  status: CommissionHearingStatus;
  status_display: string;
  hearing_date: string;
  hearing_date_formatted: string;
  priority_level: CommissionHearingPriorityLevel;
  notes: string;
  decision: string;
  created_at: string;
}
