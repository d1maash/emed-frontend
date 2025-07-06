import React, { useState } from "react";
import { ChartBarInteractive } from "./ChartGraphic";
import { SlidersHorizontal } from "lucide-react";
import MyButton from "@/components/myui/MyButton";

const periods = [
  { label: "Сегодня", value: "today" },
  { label: "Неделя", value: "week" },
  { label: "Месяц", value: "month" },
  { label: "Год", value: "year" },
];

export function DynamicsBlock() {
  const [activeTab, setActiveTab] = useState("year");

  return (
    <div className="w-full h-full bg-white rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl sm:text-2xl font-bold">Динамика</h2>
        <MyButton
          variant="outline"
          className="px-4 py-2 text-xs sm:text-sm flex items-center gap-3"
        >
          Военкомат
          <SlidersHorizontal size={16} />
        </MyButton>
      </div>

      <div className="flex border-b mb-6">
        {periods.map((tab) => (
          <button
            key={tab.value}
            className={`px-3 sm:px-10 py-2 -mb-px text-xs sm:text-sm border-b-2 transition-colors duration-150 focus:outline-none ${
              activeTab === tab.value
                ? "border-black font-semibold text-black"
                : "border-transparent text-gray-500 hover:text-black"
            }`}
            onClick={() => setActiveTab(tab.value)}
            type="button"
          >
            {tab.label}
          </button>
        ))}
      </div>

      <ChartBarInteractive period={activeTab} />
    </div>
  );
}
