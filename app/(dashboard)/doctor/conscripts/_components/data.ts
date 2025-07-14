import { Conscript } from "./types";

export const conscripts: Conscript[] = Array.from({ length: 12 }).map(
  (_, i) => ({
    fullname: "Jane Doe",
    position: "Senior Designer",
    iin: "Cell Text",
    examType: "Cell Text",
    examDate: "Cell Text",
    status: "Cell Text",
  })
);
