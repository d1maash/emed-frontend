import DashboardHeader from "@/components/Header";
import React from "react";
import BreadCrumbs from "./_components/BreadCrumbs";

interface CommissionLayoutProps {
  children: React.ReactNode;
}

const CommissionLayout: React.FC<CommissionLayoutProps> = ({ children }) => {
  return (
    <>
      <DashboardHeader>
        <BreadCrumbs />
      </DashboardHeader>
      <div className="mt-5 sm:mt-10">{children}</div>
    </>
  );
};

export default CommissionLayout;
