"use client";

import { TrendingUp } from "lucide-react";
import { Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A donut chart";

const chartData = [
  { browser: "chrome", visitors: 120, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 120, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 120, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 120, fill: "var(--color-edge)" },
  { browser: "other", visitors: 120, fill: "var(--color-other)" },
  { browser: "salam", visitors: 120, fill: "var(--color-salam)" },
  { browser: "othe3", visitors: 120, fill: "var(--color-othe3)" },
];

const chartConfig = {
  visitors: {
    label: "Step1",
  },
  chrome: {
    label: "1 этап",
    color: "#C1C7CD",
  },
  safari: {
    label: "2 этап",
    color: "#878D96",
  },
  firefox: {
    label: "3 этап",
    color: "var(--primary-60)",
  },
  edge: {
    label: "4 этап",
    color: "#878D96",
  },
  other: {
    label: "5 этап",
    color: "var(--primary-90)",
  },
  salam: {
    label: "6 этап",
    color: "black",
  },
  othe3: {
    label: "7 этап",
    color: "#515151",
  },
} satisfies ChartConfig;

export function ChartPieDonut({ className }: { className: string }) {
  return (
    <Card className={`flex flex-col ${className}`}>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="visitors"
              nameKey="browser"
              innerRadius={60}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="grid grid-cols-3 gap-1 text-[10px] p-2">
        <div className="flex items-center gap-1 whitespace-nowrap">
          <div className="w-3 h-3 aspect-square bg-[#D9D9D9]" />
          <p>120 призывников</p>
        </div>
        <div className="flex items-center gap-1 whitespace-nowrap">
          <div className="w-3 h-3 aspect-square bg-[#878D96]" />
          <p>120 призывников</p>
        </div>
        <div className="flex items-center gap-1 whitespace-nowrap">
          <div className="w-3 h-3 aspect-square bg-[#D9D9D9]" />
          <p>120 призывников</p>
        </div>
        <div className="flex items-center gap-1 whitespace-nowrap">
          <div className="w-3 h-3 aspect-square bg-[#D9D9D9]" />
          <p>120 призывников</p>
        </div>
        <div className="flex items-center gap-1 whitespace-nowrap">
          <div className="w-3 h-3 aspect-square bg-[#D9D9D9]" />
          <p>120 призывников</p>
        </div>
        <div className="flex items-center gap-1 whitespace-nowrap">
          <div className="w-3 h-3 aspect-square bg-[#D9D9D9]" />
          <p>120 призывников</p>
        </div>
        <div className="flex items-center gap-1 whitespace-nowrap">
          <div className="w-3 h-3 aspect-square bg-[#D9D9D9]" />
          <p>120 призывников</p>
        </div>
      </CardFooter>
    </Card>
  );
}
