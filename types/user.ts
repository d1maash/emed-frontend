export interface MedicalSpeciality {
  id: number;
  name: string;
  code: string;
  description: string;
  order: number;
}

export interface DoctorProfile {
  specialty: MedicalSpeciality;
  specialty_id: number;
  license_number: string;
  experience_years: number;
  department: string;
  digital_signature_active: boolean;
}

export interface CoordinatorProfile {
  region: string;
  district: string;
  position: string;
}

export interface User {
  id: number;
  iin: string;
  role: string;
  first_name: string;
  last_name: string;
  middle_name: string;
  full_name: string;
  birth_date: string;
  age: number | string;
  nationality: string;
  phone: string;
  email: string;
  education: string;
  specialty: string;
  sport_category: string;
  height: number;
  weight: number;
  bmi: number | string;
  chest_circumference: number;
  spirometry: string;
  is_verified: boolean;
  created_at: string;
  doctor_profile: DoctorProfile | null;
  coordinator_profile: CoordinatorProfile | null;
}

export interface DoctorList {
  id: number;
  full_name: string;
  doctor_profile: DoctorProfile;
}
