"use client";
import { NavTab, NavTabs } from "@/components/NavTabs";
import React from "react";
import { useRouter, usePathname } from "next/navigation";

const pages = [
  "Справочные данные",
  "Рабочие часы",
  "Правила логирования",
  "Конфигурация интеграций",
  "Параметры безопасности",
] as const;

const pageRoutes: Record<(typeof pages)[number], string> = {
  "Справочные данные": "/admin/system/reference-data",
  "Рабочие часы": "/admin/system/working-hours",
  "Правила логирования": "/admin/system/logging-rules",
  "Конфигурация интеграций": "/admin/system/integrations",
  "Параметры безопасности": "/admin/system/security",
};

const PageNavigation = () => {
  const router = useRouter();
  const pathname = usePathname();

  const currentPage =
    pages.find((p) => pathname.startsWith(pageRoutes[p])) || pages[0];

  return (
    <>
      <h1 className="text-3xl font-medium">{currentPage}</h1>
      <NavTabs>
        {pages.map((p) => (
          <NavTab
            key={p}
            page={p}
            active={currentPage === p}
            onClick={() => router.push(pageRoutes[p])}
          />
        ))}
      </NavTabs>
    </>
  );
};

export default PageNavigation;
