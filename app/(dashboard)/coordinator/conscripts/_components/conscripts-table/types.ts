import { Application, LMO } from "@/types/application";
import { User } from "@/types/user";

export type ConscriptStatus =
  | "Ожидает приема"
  | "На приеме"
  | "Завершено"
  | "На комиссии"
  | "Результат готов";

export interface Conscript {
  user: User;
  application: Application;
  lmo: LMO;
}
