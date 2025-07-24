import { User } from "@/types/user";
import { Application, LMO } from "@/types/application";

export interface Conscript {
  user: User;
  application: Application | null; // бывает, что заявки ещё нет
  lmo: LMO | null; // или ЛМО ещё не создан
}
