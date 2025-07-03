"use client";
import { NavTab, NavTabs } from "@/components/NavTabs";
import { cn } from "@/lib/utils";
import { useState } from "react";

const pages = [
  "Справочные данные",
  "Рабочие часы",
  "Правила логирования",
  "Конфигурация интеграций",
  "Параметры безопасности",
];

type Page = (typeof pages)[number];

const AdminSystemPage = () => {
  const [page, setPage] = useState<Page>("Справочные данные");

  return (
    <div className="w-full flex flex-col gap-6 @container">
      <h1 className="text-3xl font-medium">{page}</h1>
      <NavTabs page={page}>
        {pages.map((p) => (
          <NavTab
            key={p}
            page={p}
            active={page === p}
            onClick={() => setPage(p)}
          />
        ))}
      </NavTabs>
    </div>
  );
};

export default AdminSystemPage;
