"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { doctorRoutes } from "@/components/Sidebar/routes";

const BreadCrumbs = () => {
  const pathname = usePathname();

  const currentRoute = doctorRoutes.find((route) => {
    if (route.link === pathname) return true;
    if (route.link !== "/doctor" && pathname.startsWith(route.link + "/"))
      return true;
    return false;
  });

  const isMainAdminPage = pathname === "/doctor";

  return (
    <div className="hidden sm:flex text-xs gap-1 items-center">
      {isMainAdminPage ? (
        <Link href="/doctor">Врач / Личный кабинет</Link>
      ) : (
        <>
          <Link href="/doctor">Врач</Link>
          <span>/</span>
          <span>{currentRoute?.text}</span>
        </>
      )}
    </div>
  );
};

export default BreadCrumbs;
