"use client";

import { Bell, ChevronDown, User } from "lucide-react";
import React from "react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { logout as logoutAction } from "@/store/slices/authSlice";
import { logout as logoutApi } from "@/api/auth";

const DashboardHeader = ({ children }: { children: React.ReactNode }) => {
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const access = useAppSelector((state) => state.auth.access);

  const handleLogout = async () => {
    try {
      await logoutApi(access || localStorage.getItem("access") || "");
    } catch (e) {}
    dispatch(logoutAction());
    window.location.href = "/login";
  };

  return (
    <div className="pl-12 md:pl-0 flex w-full items-center justify-start">
      {children}
      <div className="ml-auto flex justify-end items-center gap-3">
        <Bell />
        <User />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex text-sm items-center gap-1 rounded-white bg-[--primary-30] pl-4 pr-3 rounded-lg py-2 cursor-pointer">
              {user?.full_name || user?.first_name || "Аккаунт"}
              <ChevronDown size={16} />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={handleLogout}
              className="text-red-600 font-semibold"
            >
              Выйти
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default DashboardHeader;
