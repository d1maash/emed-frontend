"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "@/components/Sidebar/Sidebar";
import { Button } from "@/components/ui/Button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import {
  adminRoutes,
  commissionRoutes,
  coordinatorRoutes,
  doctorRoutes,
  recruitRoutes,
} from "@/components/Sidebar/routes";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const routes = pathname.includes("admin")
    ? adminRoutes
    : pathname.includes("commission")
    ? commissionRoutes
    : pathname.includes("coordinator")
    ? coordinatorRoutes
    : pathname.includes("recruit")
    ? recruitRoutes
    : pathname.includes("doctor")
    ? doctorRoutes
    : [];
  const [open, setOpen] = useState(false);

  return (
    <ProtectedRoute>
      <div className="min-h-screen flex flex-col md:flex-row bg-[--primary-90]">
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
        <div className="flex flex-col flex-1 bg-[#f9faff] md:rounded-s-2xl p-4 lg:p-8 gap-4 lg:gap-8 overflow-auto">
          <div className="mt-5 sm:mt-0">{children}</div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
