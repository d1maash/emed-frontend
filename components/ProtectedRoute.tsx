"use client";

import React, { useEffect, useState, useRef } from "react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { useRouter } from "next/navigation";
import type { RootState } from "@/store";
import { getMe, rehydrateAuth } from "@/store/slices/authSlice";
import LoadingScreen from "@/components/LoadingScreen";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

const roleToDashboard: Record<string, string> = {
  admin: "/admin",
  commission: "/commission",
  coordinator: "/coordinator",
  doctor: "/doctor",
  conscript: "/recruit",
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRoles,
}) => {
  const access = useAppSelector((state: RootState) => state.auth.access);
  const user = useAppSelector((state: RootState) => state.auth.user);
  const loading = useAppSelector((state: RootState) => state.auth.loading);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const hasFetched = useRef(false);

  useEffect(() => {
    setMounted(true);
    if (
      !access &&
      typeof window !== "undefined" &&
      localStorage.getItem("access")
    ) {
      dispatch(rehydrateAuth());
      return;
    }
    const token = access || localStorage.getItem("access");
    if (!token) {
      router.replace("/login");
      return;
    }
    if (token && !user && !loading && !hasFetched.current) {
      hasFetched.current = true;
      dispatch(getMe(token));
      return;
    }
    if (allowedRoles && user && !allowedRoles.includes(user.role)) {
      router.replace(roleToDashboard[user.role] || "/");
    }
  }, [access, user, allowedRoles, router, dispatch, loading]);

  if (!mounted) return null;

  const token =
    access || (typeof window !== "undefined" && localStorage.getItem("access"));
  if (!token) return null;
  if (loading || (token && !user)) return <LoadingScreen />;
  if (allowedRoles && user && !allowedRoles.includes(user.role)) return null;

  return <>{children}</>;
};

export default ProtectedRoute;
