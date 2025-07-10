import DashboardHeader from "@/components/Header";
import React from "react";
import BreadCrumbs from "./_components/BreadCrumbs";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <>
      <DashboardHeader>
        <BreadCrumbs />
      </DashboardHeader>
      <div className="mt-5 sm:mt-10">{children}</div>
    </>
  );
};

export default AdminLayout;
