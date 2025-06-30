// AdminPanelPage.tsx
import React from "react";
import AdminInfoCard from "./_components/AdminInfoCard";

const adminCardTemplateInfo = [
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
  return (
    <div className="w-full">
      <div className="flex gap-6 overflow-x-auto pb-2">
        {adminCardTemplateInfo.map((card) => (
          <AdminInfoCard key={card.title} {...card} />
        ))}
      </div>
      <div className="mt-10">check</div>
    </div>
  );
};

export default AdminPanelPage;
