import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import React from "react";

interface AdminInfoCardProps {
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
    <div className="flex flex-col p-4 pb-9 h-24 w-56 md:w-64 border bg-white">
      <div className="text-base text-muted-foreground font-medium whitespace-nowrap">
        {title}
      </div>
      <div className="flex justify-between items-center gap-4">
        <h4 className="text-2xl font-bold">{text}</h4>
        <div
          className={cn(
            "py-[3px] px-3 text-sm rounded-full",
            change < 0 ? "bg-[#4f9cda] text-white" : "bg-[#b3d1ff]"
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
