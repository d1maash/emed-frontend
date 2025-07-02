"use client";

import React, { useState } from "react";
import SystemCards from "./_components/SystemCards";
import StatCard from "./_components/StatCard";
import { cn } from "@/lib/utils";

const AdminStatsPage = () => {
  const [page, setPage] = useState<"stats" | "reports">("stats");

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
            <div className="w-full h-full flex justify-center items-center text-4xl md:text-6xl xl:text-8xl text-center font-extrabold p-4">
              Здесь могла быть ваша реклама
            </div>
          </div>
          <div className="w-full h-max gap-4 grid @container grid-cols-2 ">
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
      </div>
    );
};

export default AdminStatsPage;
