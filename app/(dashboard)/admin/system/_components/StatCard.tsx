"use client";

import React from "react";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

interface StatCardProps {
  title: string;
  percent: number; // 0-100
  value: number;
  total: number;
  change: number; // например, 2.5
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  percent,
  value,
  total,
  change,
}) => {
  return (
    <div className="w-full h-full rounded-xl border bg-white flex flex-col items-center justify-center p-6 col-span-2 min-w-[175px]">
      <div className="max-h-[65%] aspect-square mb-2">
        <CircularProgressbarWithChildren
          value={percent}
          maxValue={100}
          strokeWidth={10}
          styles={buildStyles({
            rotation: 0.625, // чтобы сделать полукруг
            strokeLinecap: "round",
            trailColor: "#E6E9F4",
            pathColor: "#A3C3F6",
            pathTransitionDuration: 0.5,
          })}
          circleRatio={0.75} // 270deg
        >
          <div className="text-2xl font-bold text-[--coolgray-60]">
            {percent}%
          </div>
        </CircularProgressbarWithChildren>
      </div>
      <div className="flex flex-col w-full">
        <div className="text-xs text-gray-400 mb-1">{title}</div>
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold">
            {value} чел. из {total}
          </span>
          <span className="text-xs rounded-full bg-[#F4F7FB] px-2 py-1 text-[--primary-60] font-semibold">
            {change > 0 ? "+" : ""}
            {change}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
