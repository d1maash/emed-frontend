import { ListMedical } from "./types";

export const listMedicalData: ListMedical[] = Array.from({ length: 12 }).map(
  (_, i) => ({
    fullname: "Jane Doe",
    position: "Senior Designer",
    iin: "Cell Text",
    examType: "Cell Text",
    examDate: "Cell Text",
    status: "Cell Text",
  })
);
