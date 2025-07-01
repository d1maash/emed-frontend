// AdminPanelPage.tsx
"use client";

import React from "react";
import AdminInfoCards from "./_components/AdminInfoCards";
import AdminAlertTable from "./_components/admin-alert-table/AdminAlertTable";
import AdminNotificationsCard from "./_components/AdminNotificationsCard";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useContainerWidth } from "@/app/hooks/useContainerWidth";

const mainStatsTemplate = [
  {
    title: "Число пользователей",
    text: "11.8M",
    change: +2.5,
  },
  {
    title: "Врачи",
    text: "11.8M",
    change: +2.5,
  },
  {
    title: "Призывники",
    text: "11.8M",
    change: -2.5,
  },
  {
    title: "Координаторы",
    text: "11.8M",
    change: +2.5,
  },
  {
    title: "Комиссия",
    text: "11.8M",
    change: -5.5,
  },
];

const AdminPanelPage = () => {
  const { ref, isWide } = useContainerWidth(768);

  return (
    <div ref={ref} className="w-full flex flex-col">
      <AdminInfoCards cards={mainStatsTemplate} />
      <ResizablePanelGroup
        direction={isWide ? "horizontal" : "vertical"}
        className="w-full min-h-max mt-12 flex flex-col md:flex-row gap-2 md:gap-4 xl:gap-6 overflow-auto"
      >
        <ResizablePanel className="min-h-max">
          <AdminAlertTable />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel className="min-h-max">
          <AdminNotificationsCard />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default AdminPanelPage;
