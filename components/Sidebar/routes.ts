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
  { text: "Дело призывника", link: "/commission" },
  { text: "Протоколы и история", link: "/commission" },
];

export const coordinatorRoutes: SidebarRouteProps[] = [
  { text: "Личный кабинет", link: "/coordinator" },
  { text: "Список призывников", link: "/coordinator" },
  { text: "График приемов", link: "/coordinator" },
  { text: "Кадровые данные", link: "/coordinator" },
  { text: "Отчеты и статистика", link: "/coordinator" },
];

export const doctorRoutes: SidebarRouteProps[] = [
  { text: "Личный кабинет", link: "/doctor" },
  { text: "График приемов", link: "/doctor/" },
  { text: "Призывники на осмотр", link: "/doctor/" },
  { text: "Медицинские заключения", link: "/doctor/" },
  { text: "Профиль", link: "/doctor/" },
  { text: "Справки и документы", link: "/doctor/" },
  { text: "Техподдержка / FAQ", link: "/doctor/" },
];

export const recruitRoutes: SidebarRouteProps[] = [
  { text: "Личный кабинет", link: "/recruit" },
  { text: "График приемов", link: "/recruit/schedule" },
  { text: "Результаты осмотров", link: "/recruit/results" },
  { text: "Профиль", link: "/recruit/profile" },
  { text: "Справки и документы", link: "/recruit/docs" },
  { text: "Техподдержка / FAQ", link: "/recruit/support" },
];
