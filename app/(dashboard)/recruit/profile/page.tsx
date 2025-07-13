"use client";

import React, { useState } from "react";
import ProfileTab from "./_components/ProfileTab";
import SecurityTab from "./_components/SecurityTab";

const Page = () => {
  const [tab, setTab] = useState<"profile" | "security">("profile");

  return (
    <div className="flex flex-col">
      <div className="flex gap-6 border-b w-full">
        <button
          className={`text-base pb-2 border-b-2 transition font-medium ${
            tab === "profile"
              ? "border-black text-black"
              : "border-transparent text-gray-500"
          }`}
          onClick={() => setTab("profile")}
        >
          Профиль
        </button>
        <button
          className={`text-base pb-2 border-b-2 transition font-medium ${
            tab === "security"
              ? "border-black text-black"
              : "border-transparent text-gray-500"
          }`}
          onClick={() => setTab("security")}
        >
          Безопасность аккаунта
        </button>
      </div>
      {tab === "profile" && <ProfileTab />}
      {tab === "security" && <SecurityTab />}
    </div>
  );
};

export default Page;
