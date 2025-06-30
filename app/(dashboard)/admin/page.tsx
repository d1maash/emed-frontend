// AdminPanelPage.tsx
import React from "react";
import AdminInfoCards from "./_components/AdminInfoCards";
import AdminAlertTable from "./_components/admin-alert-table/AdminAlertTable";

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

const alertTableTemplate = [];

const AdminPanelPage = () => {
  return (
    <div className="w-full flex flex-col">
      <AdminInfoCards cards={mainStatsTemplate} />
      <div className="w-full mt-12 flex flex-col lg:grid lg:grid-cols-5 gap-2 md:gap-4 lg:gap-6 overflow-auto">
        <AdminAlertTable />
        {/* AdminNotifications */}
        <div className="w-full lg:w-auto lg:col-span-2 rounded-xl border py-10"></div>
      </div>
    </div>
  );
};

export default AdminPanelPage;
