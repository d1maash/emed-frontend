export type ScheduleStatus =
  | "Ожидает приема"
  | "На приеме"
  | "Завершено"
  | "На комиссии"
  | "Результат готов";

export interface ScheduleRow {
  id: number;
  doctor: string;
  conscript: string;
  room: string;
  slot: string;
  status: ScheduleStatus;
}
