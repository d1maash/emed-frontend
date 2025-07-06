import React from "react";
import AdminInfoCard, { AdminInfoCardProps } from "./AdminInfoCard";

interface AdminInfoCardsProps {
  cards: AdminInfoCardProps[];
}
const AdminInfoCards: React.FC<AdminInfoCardsProps> = ({ cards }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 min-h-max gap-6 overflow-x-hidden">
      {cards.map((card) => (
        <AdminInfoCard key={card.title} {...card} />
      ))}
    </div>
  );
};

export default AdminInfoCards;
