import { Bell, ChevronDown, User } from "lucide-react";
import React from "react";

const DashboardHeader = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="pl-12 md:pl-0 flex w-full items-center justify-start">
      {children}
      <div className="ml-auto flex justify-end items-center gap-3">
        <Bell />
        <User />
        <div className="flex text-sm items-center gap-1 rounded-white bg-[--primary-30] pl-4 pr-3 rounded-lg py-2">
          temp_account
          <ChevronDown size={16} />
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
