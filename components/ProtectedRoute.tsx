"use client";

import React, { useEffect, useState, useRef } from "react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { useRouter } from "next/navigation";
import type { RootState } from "@/store";
import {
  getMe,
  rehydrateAuth,
  logout as logoutAction,
  setTokens,
} from "@/store/slices/authSlice";
import LoadingScreen from "@/components/LoadingScreen";
import { refreshToken as refreshTokenApi } from "@/api/auth";
import { getTokenCookie, setTokenCookie } from "@/utils/api";

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

function isJwtExpired(token: string | null): boolean {
  if (!token) return true;
  try {
    const [, payload] = token.split(".");
    const decoded = JSON.parse(atob(payload));
    if (!decoded.exp) return true;
    return Date.now() / 1000 > decoded.exp;
  } catch {
    return true;
  }
}

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
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (
      !access &&
      typeof document !== "undefined" &&
      getTokenCookie("access")
    ) {
      dispatch(rehydrateAuth());
      return;
    }
    let token = access || getTokenCookie("access");
    const refresh = getTokenCookie("refresh");
    if (!token) {
      dispatch(logoutAction());
      router.replace("/login");
      return;
    }
    if (isJwtExpired(token)) {
      if (!refresh) {
        dispatch(logoutAction());
        router.replace("/login");
        return;
      }
      if (!refreshing) {
        setRefreshing(true);
        refreshTokenApi(refresh)
          .then((data) => {
            dispatch(
              setTokens({
                access: data.access,
                refresh: data.refresh || refresh,
              })
            );
            setTokenCookie("access", data.access);
            if (data.refresh) setTokenCookie("refresh", data.refresh);
          })
          .catch(() => {
            dispatch(logoutAction());
            setRefreshing(false);
            router.replace("/login");
          })
          .finally(() => setRefreshing(false));
      }
      return;
    }
    if (token && !user && !loading && !hasFetched.current && !refreshing) {
      hasFetched.current = true;
      dispatch(getMe(token));
      return;
    }
    if (allowedRoles && user && !allowedRoles.includes(user.role)) {
      router.replace(roleToDashboard[user.role] || "/");
    }
  }, [access, user, allowedRoles, router, dispatch, loading, refreshing]);

  if (!mounted) return null;

  const token =
    access || (typeof window !== "undefined" && getTokenCookie("access"));
  if (!token) return null;
  if (loading || refreshing || (token && !user)) return <LoadingScreen />;
  if (allowedRoles && user && !allowedRoles.includes(user.role)) return null;

  return <>{children}</>;
};

export default ProtectedRoute;
