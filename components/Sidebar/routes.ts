export interface SidebarRouteProps {
  text: string;
  link: string;
  onClick?: () => void;
}

export const adminRoutes: SidebarRouteProps[] = [
  { text: "Панель администратора", link: "/admin" },
  { text: "Пользователи", link: "/admin/users" },
  { text: "Настройки системы", link: "/admin/system" },
  { text: "Отчеты и статистика", link: "/admin/stats" },
];

export const commissionRoutes: SidebarRouteProps[] = [
  { text: "Дэшборд", link: "/commission" },
  { text: "Дело призывника", link: "/commission/case" },
  { text: "Протоколы и история", link: "/commission/history" },
];

export const coordinatorRoutes: SidebarRouteProps[] = [
  { text: "Личный кабинет", link: "/coordinator" },
  { text: "Список призывников", link: "/coordinator/conscripts" },
  { text: "График приемов", link: "/coordinator/schedule" },
  { text: "Кадровые данные", link: "/coordinator/info" },
  { text: "Отчеты и статистика", link: "/coordinator/stats" },
];

export const doctorRoutes: SidebarRouteProps[] = [
  { text: "Личный кабинет", link: "/doctor" },
  { text: "График приемов", link: "/doctor/schedule" },
  { text: "Призывники на осмотр", link: "/doctor/conscripts" },
  { text: "Медицинские заключения", link: "/doctor/medical-conclusions" },
  { text: "Лист мед. освидетельствования", link: "/doctor/list-medical" },
  { text: "Профиль", link: "/doctor/profile" },
  { text: "Справки и документы", link: "/doctor/docs" },
  { text: "Техподдержка / FAQ", link: "/doctor/support" },
];

export const recruitRoutes: SidebarRouteProps[] = [
  { text: "Личный кабинет", link: "/recruit" },
  { text: "График приемов", link: "/recruit/schedule" },
  { text: "Результаты осмотров", link: "/recruit/results" },
  { text: "Профиль", link: "/recruit/profile" },
  { text: "Справки и документы", link: "/recruit/docs" },
  { text: "Техподдержка / FAQ", link: "/recruit/support" },
];
