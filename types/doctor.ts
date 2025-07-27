import { string } from "zod";
import { DoctorQueueElement, LMOStatus, MedicalRecord } from "./lmo";

export interface DoctorDashboardLMO {
  id: number;
  number: string;
  conscript_name: string;
  conscript_iin: string;
  conscript_age: number;
  conscript_phone: string;
  conscript_address: string;
  speciality_required: string;
  order: number;
  created_at: string;
  days_waiting: number;
  has_record: boolean;
  record_id: number | null;
  examination_date: string | null;
  diagnosis: string | null;
  recommendations: string | null;
  is_urgent: boolean;
  lmo_status: LMOStatus;
  lmo_status_display: string;
  can_examine: boolean;
  can_sign: boolean;
}

export interface GetActiveLMOsResponse {
  active_lmos: DoctorDashboardLMO[];
  total_count: number;
  urgent_count: number;
  with_records_count: number;
  without_records_count: number;
}

export interface GetArchiveLMOsResponse {
  archive_lmos: DoctorDashboardLMO[];
  total_count: number;
  this_month_count: number;
  this_week_count: 0;
}

export interface DoctorDashboardLMOMore {
  id: number;
  number: string;
  status: LMOStatus;
  created_at: string;
  conscript: {
    id: number;
    name: string;
    iin: string;
    age: number;
    phone: string;
    address: string;
  };
  current_doctor_queue_item: {
    id: number;
    speciality: {
      id: number;
      name: string;
      code: string;
    };
    order: number;
    is_completed: boolean;
  };
  current_doctor_states: string;
  medical_record: MedicalRecord | null;
  full_doctor_queue: {
    id: number;
    speciality: {
      id: number;
      name: string;
      code: string;
    };
    order: number;
    is_completed: boolean;
    assigned_doctor: {
      id: number;
      name: string;
    };
    is_current_doctor: boolean;
  }[];
  days_waiting: number;
  is_urgent: boolean;
  can_examin: boolean;
  can_sign: boolean;
}

export interface GetDoctorDashboardLMOsResponse {
  lmos: DoctorDashboardLMOMore[];
  total_count: number;
  active_count: number;
  complete_count: number;
  urgent_count: number;
}
