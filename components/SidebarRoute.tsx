"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export interface SidebarRouteProps {
  text: string;
  link: string;
  onClick?: () => void;
}

const SidebarRoute: React.FC<SidebarRouteProps> = ({ text, link, onClick }) => {
  const pathname = usePathname();
  const active = pathname.endsWith(link) ? true : false;

  return (
    <div
      className={cn(
        "flex justify-start items-center p-2 w-full rounded-xl text-white text-base font-medium",
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
