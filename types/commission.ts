type CommissionHearingListStatus =
  | "scheduled"
  | "in_progress"
  | "completed"
  | "cancelled";

type CommissionHearingListPriorityLevel = "low" | "medium" | "high" | "urgent";

interface CommissionHearingList {
  id: number;
  lmo_number: string;
  conscript_name: string;
  status: CommissionHearingListStatus;
  status_display: string;
  hearing_date: string;
  hearing_date_formatted: string;
  priority_level: CommissionHearingListPriorityLevel;
  has_decision: string;
}
