import React from "react";
import AdminInfoCard, { AdminInfoCardProps } from "./AdminInfoCard";

interface AdminInfoCardsProps {
  cards: AdminInfoCardProps[];
}
const AdminInfoCards: React.FC<AdminInfoCardsProps> = ({ cards }) => {
  return (
    <div className="flex gap-6 overflow-x-auto pb-2">
      {cards.map((card) => (
        <AdminInfoCard key={card.title} {...card} />
      ))}
    </div>
  );
};

export default AdminInfoCards;
