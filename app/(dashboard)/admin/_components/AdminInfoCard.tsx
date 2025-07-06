// AdminInfoCard.tsx
import { cn } from "@/lib/utils";
import React from "react";

export interface AdminInfoCardProps {
  title: string;
  text: string;
  change: number;
}

const AdminInfoCard: React.FC<AdminInfoCardProps> = ({
  title,
  text,
  change,
}) => {
  return (
    <div className="flex flex-col p-4 pb-9  flex-shrink-0 border bg-white ">
      <div className="text-xs sm:text-sm text-muted-foreground font-medium overflow-hidden">
        <span className="block text-center sm:text-left sm:truncate">
          {title}
        </span>
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h4 className="text-xl sm:text-2xl font-bold">{text}</h4>
        <div
          className={cn(
            "py-[3px] px-3 text-sm rounded-full",
            change < 0 ? "bg-[--primary-60] text-white" : "bg-[--primary-30]"
          )}
        >
          {change > 0 && "+"}
          {change}%
        </div>
      </div>
    </div>
  );
};

export default AdminInfoCard;
