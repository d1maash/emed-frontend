import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

export interface SystemCardProps {
  icon: string;
  title: string;
  description: string;
  small?: boolean;
}

const SystemCard = ({ icon, title, description, small }: SystemCardProps) => {
  return (
    <div
      className={cn(
        "flex flex-col bg-white border rounded-xl justify-start items-center p-4 md:p-6 flex-shrink-0 min-h-max"
      )}
    >
      <div className="w-full flex justify-start gap-2 md:gap-4 h-max">
        <div className="flex justify-center items-center w-16 h-16 -ml-1">
          <Image alt={description} src={icon} width={60} height={60} />
        </div>
        <h3 className="text-2xl font-semibold w-full flex items-center justify-start">
          {title}
        </h3>
      </div>
      <p className="leading-tight font-medium mt-2 text-start w-full">
        {description}
      </p>
    </div>
  );
};

export default SystemCard;
