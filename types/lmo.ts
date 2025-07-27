import { ConscriptApplicationDetail } from "./application";
import { MedicalSpeciality, User } from "./user";

export interface MedicalRecord {
  id: number;
  doctor: User;
  doctor_specialty: string;
  examination_date: string;
  examination_date_formatted: string;
  diagnosis: string;
  recommendations: string;
  vision_od: string;
  vision_os: string;
  color_vision: string;
  hearing_ad: string;
  hearing_as: string;
  is_signed: boolean;
  signature_date: string;
  // measurements: []idk; TODO: Clarify
  // attachments: idk; TODO: Clarify
}

export interface DoctorQueueElement {
  id: number;
  specialty: MedicalSpeciality;
  order: number;
  is_completed: boolean;
  assigned_doctor: User | null;
  assigned_doctor_name: string | null;
}

export type LMOStatus =
  | "created"
  | "in_progress"
  | "on_commission"
  | "completed"
  | "rejected";

export type FitnessCategory = "A" | "B" | "V" | "G" | "D";

export interface LMOList {
  id: number;
  number: string;
  conscript: User;
  conscript_name: string;
  status: LMOStatus;
  status_display: string;
  fitness_category: FitnessCategory;
  fitness_category_display: string;
  created_at: string;
  progress_percentage: string;
  days_since_created: string;
}

export interface LMODetail {
  id: number;
  number: string;
  conscript: User;
  coordinator: User;
  status: LMOStatus; // (enum better)
  status_display: string;
  odo_region: string;
  osp_ddo_region: string;
  assigned_team: string;
  height: number;
  weight: number;
  chest_circumference: number;
  spirometry: string;
  bmi: number;
  fitness_category: FitnessCategory;
  fitness_category_display: string;
  final_diagnosis: string;
  commission_notes: string;
  created_at: string;
  updated_at: string;
  completed_at: string | null;
  doctor_queue: DoctorQueueElement[];
  medical_records: MedicalRecord[];
  completed_specialties: MedicalSpeciality[];
  pending_specialties: MedicalSpeciality[];
  progress_percentage: number;
  current_stage: string; // enum better i guess
}

export interface CreateApplicationResponse {
  application: ConscriptApplicationDetail;
  lmo: LMODetail;
}
