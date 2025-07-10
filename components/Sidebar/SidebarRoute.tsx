"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { SidebarRouteProps } from "./routes";

const SidebarRoute: React.FC<SidebarRouteProps> = ({ text, link, onClick }) => {
  const pathname = usePathname();
  const active =
    pathname === link ||
    (link !== "/admin" &&
      link !== "/recruit" &&
      link !== "/commission" &&
      pathname.startsWith(link + "/"));

  return (
    <div
      className={cn(
        "flex justify-start items-center p-2 w-full rounded-xl text-white text-sm font-medium",
        !!active && "bg-white text-black"
      )}
      onClick={onClick}
    >
      <Link href={link} className="p-3">
        {text}
      </Link>
    </div>
  );
};

export default SidebarRoute;
