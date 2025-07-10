"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { commissionRoutes } from "@/components/Sidebar/routes";

const BreadCrumbs = () => {
  const pathname = usePathname();

  const currentRoute = commissionRoutes.find((route) => {
    if (route.link === pathname) return true;
    if (route.link !== "/commission" && pathname.startsWith(route.link + "/"))
      return true;
    return false;
  });

  const isMainCommissionPage = pathname === "/commission";

  return (
    <div className="hidden sm:flex text-xs gap-1 items-center">
      {isMainCommissionPage ? (
        <Link href="/commission">Комиссия / Главная</Link>
      ) : (
        <>
          <Link href="/commission">Комиссия</Link>
          <span>/</span>
          <span>{currentRoute?.text}</span>
        </>
      )}
    </div>
  );
};

export default BreadCrumbs;
