import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { recruitRoutes } from "@/components/Sidebar/routes";

const BreadCrumbs = () => {
  const pathname = usePathname();

  const currentRoute = recruitRoutes.find((route) => {
    if (route.link === pathname) return true;
    if (route.link !== "/recruit" && pathname.startsWith(route.link + "/"))
      return true;
    return false;
  });

  const isMainAdminPage = pathname === "/recruit";

  return (
    <div className="hidden sm:flex text-xs gap-1 items-center">
      {isMainAdminPage ? (
        <Link href="/recruit">Призывник / Личный кабинет</Link>
      ) : (
        <>
          <Link href="/recruit">Призывник</Link>
          <span>/</span>
          <span>{currentRoute?.text}</span>
        </>
      )}
    </div>
  );
};

export default BreadCrumbs;
