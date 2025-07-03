"use client";

import React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

const AuthLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const pathname = usePathname();
  const decorationBg = pathname.includes("/reset-password")
    ? "/illustrations/reset-pwd-decoration.svg"
    : "/illustrations/login-decoration.svg";

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[--primary-90]">
      <div className="hidden md:flex flex-1 flex-col justify-center items-center relative overflow-hidden">
        <Image
          src={decorationBg}
          alt="decoration"
          width={520}
          height={520}
          className="z-10 w-full max-w-[520px] h-auto"
        />
      </div>
      <div className="flex-1 flex justify-center items-center px-2 sm:px-8 py-8">
        <div className="bg-white rounded-3xl shadow-lg px-4 sm:px-16 py-16 min-w-0 w-full h-auto max-w-[420px] md:max-w-[480px] lg:max-w-[520px] overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
