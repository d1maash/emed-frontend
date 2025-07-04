import { Report } from "./types";

export const reports: Report[] = Array.from({ length: 12 }).map((_, i) => ({
  id: i + 1,
  name: "Отчет какой-то",
  interval: "Ежедневно",
  responsible: "Фамилия Имя Отчество" + i,
  lastGeneration: new Date(Date.now()),
}));
