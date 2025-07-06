"use client";

import React, { useState } from "react";
import SystemCards from "./_components/SystemCards";
import StatCard from "./_components/StatCard";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Download, Search, Plus } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { reports } from "./_components/admin-reports-table/data";
import { AdminReportsTable } from "./_components/admin-reports-table/AdminReportsTable";
import { DynamicsBlock } from "./_components/DynamicsBlock";

const AdminStatsPage = () => {
  const [page, setPage] = useState<"stats" | "reports">("stats");

  const [globalFilter, setGlobalFilter] = useState("");

  const filteredReports = reports.filter((r) => {
    const matchesText =
      r.name.toLowerCase().includes(globalFilter.toLowerCase()) ||
      String(r.id).includes(globalFilter);

    return matchesText;
  });

  if (page === "stats" || !page)
    return (
      <div className="w-full @container">
        <div className="rounded-lg bg-[--primary-60] p-1.5 gap-2 flex text-sm w-max">
          <button
            className={cn(
              "px-8 py-0.5 rounded-md transition",
              page === "stats" ? "bg-white" : "text-white"
            )}
            onClick={() => {
              setPage("stats");
            }}
          >
            Статистика
          </button>
          <button
            className={cn("px-8 py-0.5 rounded-md transition text-white")}
            onClick={() => {
              setPage("reports");
            }}
          >
            Отчеты
          </button>
        </div>
        <div className="w-full h-max flex flex-col mt-7 @lg:grid grid-cols-4 gap-4">
          <div className="w-full h-full border col-span-3 bg-white rounded-xl ">
            <DynamicsBlock />
          </div>
          <div className="w-full h-max sm:h-[400px] gap-4 grid @container grid-cols-2 ">
            <StatCard
              title="Завершено"
              percent={66}
              value={100000}
              total={150000}
              change={75}
            />
            <StatCard
              title="Направлены в стационар"
              percent={66}
              value={100000}
              total={150000}
              change={750}
            />
          </div>
        </div>

        <SystemCards />
      </div>
    );
  if (page === "reports" || !page)
    return (
      <div className="w-full @container">
        <div className="rounded-lg bg-[--primary-60] p-1.5 gap-2 flex text-sm w-max">
          <button
            className={cn("px-8 py-0.5 rounded-md transition text-white")}
            onClick={() => {
              setPage("stats");
            }}
          >
            Статистика
          </button>
          <button
            className={cn(
              "px-8 py-0.5 rounded-md transition",
              page === "reports" ? "bg-white" : "text-white"
            )}
            onClick={() => {
              setPage("reports");
            }}
          >
            Отчеты
          </button>
        </div>
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mt-6">
          <h3 className="text-3xl font-medium">Регламентные отчеты</h3>
          <div className="flex flex-col md:flex-row gap-2 md:gap-4 mt-4 md:mt-2">
            <div className="max-w-md relative h-max">
              <Input
                placeholder="Поиск по ФИО или ID"
                value={globalFilter}
                onChange={(e) => setGlobalFilter(e.target.value)}
                className="w-full bg-white shadow-none pl-10"
              />
              <Search
                className="text-[--coolgray-90] absolute left-3 top-1/2 -translate-y-1/2"
                size={16}
              />
            </div>
            <div className="flex gap-2 ml-auto">
              <Button variant="ghost" size="icon">
                <Download className="w-6 h-6" />
              </Button>
              <Button variant="ghost" size="icon">
                <Plus className="w-6 h-6" />
              </Button>
            </div>
          </div>
        </div>
        <AdminReportsTable data={filteredReports} />
      </div>
    );
};

export default AdminStatsPage;
