export type UserStatus = "Активен" | "Заблокирован";
export type UserRole = "Призывник" | "Врач" | "Координатор" | "Комиссия";
export type UserDepartment = "Первое" | "Второе" | "Третье" | "Четвертое";

export interface AdminUser {
  id: number;
  name: string;
  login: string;
  role: UserRole;
  department: UserDepartment;
  status: UserStatus;
}
