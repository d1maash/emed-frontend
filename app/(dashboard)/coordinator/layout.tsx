import DashboardHeader from "@/components/Header";
import React from "react";
import BreadCrumbs from "./_components/BreadCrumbs";
import ProtectedRoute from "@/components/ProtectedRoute";

interface CoordinatorLayoutProps {
  children: React.ReactNode;
}

export default function CoordinatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute allowedRoles={["coordinator"]}>
      <DashboardHeader>
        <BreadCrumbs />
      </DashboardHeader>
      <div className="mt-5 sm:mt-10">{children}</div>
    </ProtectedRoute>
  );
}
