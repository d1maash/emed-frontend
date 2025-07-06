import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { adminRoutes } from "@/components/Sidebar/routes";

const BreadCrumbs = () => {
  const pathname = usePathname();

  const currentRoute = adminRoutes.find((route) => {
    if (route.link === pathname) return true;
    if (route.link !== "/admin" && pathname.startsWith(route.link + "/"))
      return true;
    return false;
  });

  const isMainAdminPage = pathname === "/admin";

  return (
    <div className="flex text-xs gap-1 items-center">
      {isMainAdminPage ? (
        <Link href="/admin">Панель администратора</Link>
      ) : (
        <>
          <Link href="/admin">Панель администратора</Link>
          <span>/</span>
          <span>{currentRoute?.text || "Панель администратора"}</span>
        </>
      )}
    </div>
  );
};

export default BreadCrumbs;
