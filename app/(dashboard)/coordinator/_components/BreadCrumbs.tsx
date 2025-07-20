"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { coordinatorRoutes } from "@/components/Sidebar/routes";

const BreadCrumbs = () => {
  const pathname = usePathname();

  const currentRoute = coordinatorRoutes.find((route) => {
    if (route.link === pathname) return true;
    if (route.link !== "/coordinator" && pathname.startsWith(route.link + "/"))
      return true;
    return false;
  });

  const isMainAdminPage = pathname === "/coordinator";

  return (
    <div className="hidden sm:flex text-xs gap-1 items-center">
      {isMainAdminPage ? (
        <Link href="/coordinator">Координатор / Личный кабинет</Link>
      ) : (
        <>
          <Link href="/coordinator">Координатор</Link>
          <span>/</span>
          <span>{currentRoute?.text}</span>
        </>
      )}
    </div>
  );
};

export default BreadCrumbs;
