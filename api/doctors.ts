import { DoctorList } from "@/types/user";
import { api } from "@/utils/api";

export enum DoctorSpecialty {
  ТЕРАПЕВТ = 1,
  ХИРУРГ = 2,
  ОФТАЛЬМОЛОГ = 3,
  ЛОР = 4,
  НЕВРОЛОГ = 5,
  ПСИХИАТР = 6,
  ДЕРМАТОЛОГ = 7,
  СТОМАТОЛОГ = 8,
  КАРДИОЛОГ = 9,
  ЭНДОКРИНОЛОГ = 10,
}

export const GetDoctorsBySpecialityID = async (
  specialty_id: DoctorSpecialty | number,
  access: string
): Promise<DoctorList[]> => {
  const response = await api.get("/api/users/doctors/", {
    params: { specialty: specialty_id },
    headers: {
      Authorization: `Bearer ${access}`,
      "Content-Type": "application/json",
    },
  });
  return response.data;
};
