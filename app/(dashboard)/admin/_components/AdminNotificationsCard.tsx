"use client";
import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Bell, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const notifications = [
  {
    id: 1,
    title: "Step Name",
    labels:
      "Optional Label Optional Label Optional Label Optional Label Optional Label",
    date: "2025-05-27",
    unread: false,
    important: false,
  },
  {
    id: 2,
    title: "Step Name",
    labels:
      "Optional Label Optional Label Optional Label Optional Label Optional Label",
    date: "2025-05-27",
    unread: true,
    important: false,
  },
  {
    id: 3,
    title: "Step Name",
    labels:
      "Optional Label Optional Label Optional Label Optional Label Optional Label",
    date: "2025-05-27",
    unread: false,
    important: false,
  },
  {
    id: 4,
    title: "Step Name",
    labels:
      "Optional Label Optional Label Optional Label Optional Label Optional Label",
    date: "2025-05-27",
    unread: true,
    important: true,
  },
  {
    id: 5,
    title: "Step Name",
    labels:
      "Optional Label Optional Label Optional Label Optional Label Optional Label",
    date: "2025-05-27",
    unread: false,
    important: false,
  },
  {
    id: 6,
    title: "Step Name",
    labels:
      "Optional Label Optional Label Optional Label Optional Label Optional Label",
    date: "2025-05-27",
    unread: false,
    important: false,
  },
  {
    id: 7,
    title: "Step Name",
    labels:
      "Optional Label Optional Label Optional Label Optional Label Optional Label",
    date: "2025-05-27",
    unread: false,
    important: false,
  },
  {
    id: 8,
    title: "Step Name",
    labels:
      "Optional Label Optional Label Optional Label Optional Label Optional Label",
    date: "2025-05-27",
    unread: false,
    important: true,
  },
  {
    id: 9,
    title: "Step Name",
    labels:
      "Optional Label Optional Label Optional Label Optional Label Optional Label",
    date: "2025-05-27",
    unread: false,
    important: false,
  },
  {
    id: 10,
    title: "Step Name",
    labels:
      "Optional Label Optional Label Optional Label Optional Label Optional Label",
    date: "2025-05-27",
    unread: true,
    important: false,
  },
  {
    id: 11,
    title: "Step Name",
    labels:
      "Optional Label Optional Label Optional Label Optional Label Optional Label",
    date: "2025-05-27",
    unread: false,
    important: false,
  },
  {
    id: 12,
    title: "Step Name",
    labels:
      "Optional Label Optional Label Optional Label Optional Label Optional Label",
    date: "2025-05-27",
    unread: true,
    important: true,
  },
  {
    id: 13,
    title: "Step Name",
    labels:
      "Optional Label Optional Label Optional Label Optional Label Optional Label",
    date: "2025-05-27",
    unread: false,
    important: false,
  },
  {
    id: 14,
    title: "Step Name",
    labels:
      "Optional Label Optional Label Optional Label Optional Label Optional Label",
    date: "2025-05-27",
    unread: false,
    important: false,
  },
  {
    id: 15,
    title: "Step Name",
    labels:
      "Optional Label Optional Label Optional Label Optional Label Optional Label",
    date: "2025-05-27",
    unread: false,
    important: false,
  },
  {
    id: 16,
    title: "Step Name",
    labels:
      "Optional Label Optional Label Optional Label Optional Label Optional Label",
    date: "2025-05-27",
    unread: false,
    important: true,
  },
];

const PAGE_SIZE = 5;

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

const AdminNotificationsCard = () => {
  const [tab, setTab] = useState("all");
  const [page, setPage] = useState(2);

  const filtered = notifications.filter((n) =>
    tab === "all" ? true : tab === "unread" ? n.unread : n.important
  );
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="w-full flex flex-col justify-start xl:h-[820px] xl:col-span-2 rounded-xl border px-6 py-8 md:p-10 bg-white">
      <div className="flex items-center justify-between">
        <h4 className="text-2xl font-bold">Уведомления</h4>
        <Bell size={24} />
      </div>
      <Tabs
        value={tab}
        onValueChange={setTab}
        className="w-full mt-8 @container"
      >
        <TabsList className="w-full flex flex-col gap-2 px-2 py-2 @[360px]:flex-row bg-[--primary-60] rounded-lg lg:gap-2 h-max">
          <TabsTrigger
            value="all"
            className={cn(
              "w-full  flex-1 rounded-md px-4 py-1 sm:py-0.5 text-sm transition",
              tab === "all"
                ? "bg-white text-black"
                : "bg-transparent text-white"
            )}
          >
            Все
          </TabsTrigger>
          <TabsTrigger
            value="unread"
            className={cn(
              "w-full flex-1 rounded-md px-4 py-1 sm:py-0.5 text-sm transition",
              tab === "unread"
                ? "bg-white text-black"
                : "bg-transparent text-white"
            )}
          >
            Непрочитанные
          </TabsTrigger>
          <TabsTrigger
            value="important"
            className={cn(
              "w-full flex-1 rounded-md px-4 py-1 sm:py-0.5 text-sm transition",
              tab === "important"
                ? "bg-white text-black"
                : "bg-transparent text-white"
            )}
          >
            Важные
          </TabsTrigger>
        </TabsList>
        <TabsContent value={tab}>
          <div className="flex flex-col gap-0">
            {paged.map((n) => (
              <div
                key={n.id}
                className={cn(
                  "flex items-start gap-2 px-4 py-5 border-b last:border-b-0 group transition",
                  n.unread ? "bg-[#e8f1ff]" : ""
                )}
              >
                <span
                  className={cn(
                    "mt-2 mr-2 block h-2 w-2 rounded-full",
                    n.unread ? "bg-[--primary-90]" : "bg-transparent"
                  )}
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span
                      className={cn(
                        "font-semibold text-sm line-clamp-1",
                        n.unread && "text-[--primary-90]"
                      )}
                    >
                      {n.title}
                    </span>
                    <span className="text-xs text-gray-400 line-clamp-1">
                      {formatDate(n.date)}
                    </span>
                  </div>
                  <div className="text-gray-500 text-xs mt-1 line-clamp-2">
                    {n.labels}
                  </div>
                </div>
              </div>
            ))}
            {paged.length === 0 && (
              <div className="text-center text-gray-400 py-10">
                Нет уведомлений
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
      {/* Pagination */}
      <div className="flex justify-center items-center gap-1 mt-8 xl:mt-auto select-none">
        <button
          className="w-8 h-8 flex items-center justify-center bg-white text-[--primary-90] disabled:text-[#6B7280] disabled:opacity-50"
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
        >
          <ChevronLeft size={20} strokeWidth={2.5} />
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={cn(
              "w-8 h-8 flex items-center justify-center text-[--primary-90]",
              page === i + 1 ? "bg-[--primary-30]" : "bg-white"
            )}
            onClick={() => setPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
        <button
          className="w-8 h-8 flex items-center justify-center  bg-white text-[--primary-90] disabled:text-[#6B7280] disabled:opacity-50"
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
        >
          <ChevronRight size={20} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
};

export default AdminNotificationsCard;
