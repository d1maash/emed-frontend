import { AdminUser } from "./types";

export const users: AdminUser[] = Array.from({ length: 12 }).map((_, i) => ({
  id: i + 1,
  name: "Фамилия Имя Отчество" + i,
  login: "login.kz.army",
  role: i % 2 === 0 ? "Призывник" : "Комиссия",
  department: i % 2 === 0 ? "Первое" : "Второе",
  status: i % 2 === 0 ? "Активен" : "Заблокирован",
}));
