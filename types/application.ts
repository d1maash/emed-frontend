import { MedicalSpeciality, User } from "./user";

export type ConscriptApplicationStatus =
  | "draft"
  | "submitted"
  | "under_review"
  | "approved"
  | "rejected";

export interface ConscriptApplicationList {
  id: number;
  application_number: string;
  applicant: User;
  applicant_name: string;
  status: ConscriptApplicationStatus;
  status_display: string;
  created_at: string;
  schedule_date: string;
  preferred_date: string;
  days_since_submitted: string;
  document_count: string;
  detailed_status: string;
}

export interface ConscriptApplicationDetail {
  id: number;
  application_number: string;
  applicant: User;
  coordinator: User;
  status: ConscriptApplicationStatus;
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
