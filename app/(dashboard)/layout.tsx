"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import { SidebarRouteProps } from "@/components/SidebarRoute";
import { Button } from "@/components/ui/Button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

const adminRoutes: SidebarRouteProps[] = [
  { text: "Панель администратора", link: "/admin" },
  { text: "Пользователи", link: "/admin/users" },
  { text: "Настройки системы", link: "/admin/system" },
  { text: "Отчеты и статистика", link: "/admin/stats" },
];

const commissionRoutes: SidebarRouteProps[] = [
  { text: "Дэшборд", link: "/commission" },
  { text: "Дело призывника", link: "/commission" },
  { text: "Протоколы и история", link: "/commission" },
];

const coordinatorRoutes: SidebarRouteProps[] = [
  { text: "Личный кабинет", link: "/coordinator" },
  { text: "Список призывников", link: "/coordinator" },
  { text: "График приемов", link: "/coordinator" },
  { text: "Кадровые данные", link: "/coordinator" },
  { text: "Отчеты и статистика", link: "/coordinator" },
];

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const routes = pathname.includes("admin")
    ? adminRoutes
    : pathname.includes("commission")
    ? commissionRoutes
    : coordinatorRoutes;

  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-[--primary-90]">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar routes={routes} />
      </div>

      {/* TODO: mobile Sidebar icon */}
      <div className="fixed top-4 left-4 z-50 md:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="bg-white shadow">
              <Menu className="w-7 h-7 text-black" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="p-0 bg-[--primary-90] w-72 border-none outline-none"
          >
            <Sidebar
              routes={routes.map((route) => ({
                ...route,
                onClick: () => setOpen(false), // Закрывать сайдбар при клике
              }))}
              onClick={() => setOpen(false)}
            />
          </SheetContent>
        </Sheet>
      </div>

      {/* Main content */}
      <div className="flex-1 bg-white md:rounded-s-2xl p-4 md:p-14">
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
