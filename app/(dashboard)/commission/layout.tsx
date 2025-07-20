import DashboardHeader from "@/components/Header";
import React from "react";
import BreadCrumbs from "./_components/BreadCrumbs";
import ProtectedRoute from "@/components/ProtectedRoute";

interface CommissionLayoutProps {
  children: React.ReactNode;
}

export default function CommissionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute allowedRoles={["commission"]}>
      <DashboardHeader>
        <BreadCrumbs />
      </DashboardHeader>
      <div className="mt-5 sm:mt-10">{children}</div>
    </ProtectedRoute>
  );
}
