export type ConscriptStatus =
  | "Ожидает приема"
  | "На приеме"
  | "Завершено"
  | "На комиссии"
  | "Результат готов";

export interface Conscript {
  id: number;
  name: string;
  login: string;
  militaryId: string;
  department: string;
  status: ConscriptStatus;
}
