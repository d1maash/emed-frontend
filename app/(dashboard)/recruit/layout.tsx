import DashboardHeader from "@/components/Header";
import React from "react";
import BreadCrumbs from "./_components/BreadCrumbs";

interface RecruitLayoutProps {
  children: React.ReactNode;
}

const RecruitLayout: React.FC<RecruitLayoutProps> = ({ children }) => {
  return (
    <>
      <DashboardHeader>
        <BreadCrumbs />
      </DashboardHeader>
      <div className="mt-5 sm:mt-10">{children}</div>
    </>
  );
};

export default RecruitLayout;
