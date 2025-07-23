import { MedicalSpeciality, User } from "./user";

export interface Application {
  id: number;
  application_number: string;
  applicant: User;
  coordinator: User;
  status: string; // draft? enum idk
  status_display: string;
  contact_phone: string;
  contact_email: string;
  current_address: string;
  preferred_date: string | null;
  preferred_time: string | null;
  special_requirements: string;
  has_chronic_diseases: boolean;
  chronic_diseases_description: string;
  takes_medications: boolean;
  medications_description: string;
  has_allergies: boolean;
  allergies_description: string;
  coordinator_notes: string;
  scheduled_date: string | null;
  lmo: number;
  created_at: string;
  updated_at: string;
  completed_at: string | null;
  documents: []; // gotta add document type
  days_since_submitted: number;
  can_edit: boolean;
  detailed_status: string;
}

export interface MedicalRecord {
  id: number;
  doctor: User;
  doctor_specialty: string;
  examination_date: string;
  examination_date_formatted: string;
  diagnosis: string;
  recommendations: string;
  // measurements: []idk;
  vision_od: string;
  vision_os: string;
  color_vision: string;
  hearing_ad: string;
  hearing_as: string;
  is_signed: boolean;
  signature_date: string;
  // attachments: idk
}

export interface DoctorQueueElement {
  id: number;
  specialty: MedicalSpeciality;
  order: number;
  is_completed: boolean;
  assigned_doctor: User | null;
  assigned_doctor_name: string | null;
}

export interface LMO {
  id: number;
  number: string;
  conscript: User;
  coordinator: User;
  status: string; // (enum better)
  status_display: string;
  odo_region: string;
  osp_ddo_region: string;
  assigned_team: string;
  height: number;
  weight: number;
  chest_circumference: number;
  spirometry: string;
  bmi: number;
  fitness_category: string;
  fitness_category_display: string;
  final_diagnosis: string;
  commission_notes: string;
  created_at: string;
  updated_at: string;
  completed_at: string | null;
  doctor_queue: DoctorQueueElement;
  medical_records: MedicalRecord[];
  completed_specialties: MedicalSpeciality[];
  pending_specialties: MedicalSpeciality[];
  progress_percentage: number;
  current_stage: string; // enum better i guess
}

export interface CreateApplicationResponse {
  application: Application;
  lmo: LMO;
}
