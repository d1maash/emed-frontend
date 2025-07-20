import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChartPieDonut } from "../_components/ChartPieDonut";
import { ChartBarInteractive } from "../_components/ChartGraphic";
import { ChartBarHorizontal } from "../_components/ChartBarHorizontal";
import { Input } from "@/components/ui/Input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Download,
  Plus,
  Search,
  SlidersHorizontal,
  FileText,
  FileSpreadsheet,
} from "lucide-react";
import Image from "next/image";

const rightCards = [
  {
    id: 1,
    top: "Description Top",
    title: "Title",
    bottom: "Description Bottom",
    percent: "+2,5%",
  },
  {
    id: 2,
    top: "Description Top",
    title: "Title",
    bottom: "Description Bottom",
    percent: "+2,5%",
  },
  {
    id: 3,
    top: "Description Top",
    title: "Title",
    bottom: "Description Bottom",
    percent: "+2,5%",
  },
  {
    id: 4,
    top: "Description Top",
    title: "Title",
    bottom: "Description Bottom",
    percent: "+2,5%",
  },
  {
    id: 5,
    top: "Description Top",
    title: "Title",
    bottom:
      "Description Bottom Description Bottom Description Bottom Description Bottom Description Bottom",
    percent: "+2,5%",
  },
];

const CoordinatorStatsPage = () => {
  return (
    <div className="w-full flex flex-col gap-6">
      {/* Top filter bar */}
      <div className="flex flex-wrap lg:flex-nowrap items-center justify-between gap-4 mt-4 mb-2">
        <div className="flex flex-wrap lg:flex-nowrap items-center gap-3 w-full">
          <div className="relative w-full sm:w-auto">
            <Input
              className="pl-10 min-w-[240px] max-w-xs h-11 rounded-lg border border-gray-200 bg-white w-full"
              placeholder="Поиск по ФИО или ID"
              type="text"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>
          <Select>
            <SelectTrigger className="h-11 rounded-lg border border-gray-200 bg-white w-auto flex items-center gap-2">
              <SelectValue placeholder="Даты" />
              <SlidersHorizontal className="ml-2 w-4 h-4 text-gray-400" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Январь</SelectItem>
              <SelectItem value="2">Февраль</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="h-11 rounded-lg border border-gray-200 bg-white w-auto flex items-center gap-2">
              <SelectValue placeholder="Регионы" />
              <SlidersHorizontal className="ml-2 w-4 h-4 text-gray-400" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Регион 1</SelectItem>
              <SelectItem value="2">Регион 2</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="h-11 rounded-lg border border-gray-200 bg-white w-auto flex items-center gap-2">
              <SelectValue placeholder="Подразделение" />
              <SlidersHorizontal className="ml-2 w-4 h-4 text-gray-400" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Подразделение 1</SelectItem>
              <SelectItem value="2">Подразделение 2</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-3">
          <button className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition">
            <Download className="w-5 h-5 text-gray-700" />
          </button>
          <button className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition">
            <Plus className="w-5 h-5 text-gray-700" />
          </button>
        </div>
      </div>
      {/* Main grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-3">
        <ChartPieDonut className="col-span-1 lg:col-span-2" />
        <ChartBarInteractive
          period="year"
          className="col-span-1 md:col-span-1 lg:col-span-3"
        />
        <div className="flex flex-col gap-3 col-span-1 md:col-span-2 lg:col-span-2">
          {rightCards.slice(0, 4).map((card) => (
            <Card key={card.id} className="flex-1 relative">
              <CardContent className="h-full p-4 flex flex-row justify-between items-center">
                <div>
                  <div className="text-xs text-gray-500 mb-1">{card.top}</div>
                  <div className="font-bold text-base mb-1">{card.title}</div>
                  <div className="text-xs text-gray-500">{card.bottom}</div>
                </div>
                <div className="ml-auto font-semibold text-sm text-[--primary-90] bg-blue-50 rounded-full px-3 py-1">
                  {card.percent}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <Card className="col-span-1 md:col-span-2 lg:col-span-3 flex items-stretch">
          <CardContent className="p-3 h-full w-full flex flex-col justify-center">
            <ChartBarHorizontal />
          </CardContent>
        </Card>
        <Card className="col-span-1 md:col-span-2 lg:col-span-2 row-span-2 flex flex-col gap-3 shadow-none border-none bg-transparent">
          <CardContent className="h-full p-2 flex flex-col gap-3">
            <Card className="flex-1 relative">
              <CardContent className="h-full p-4 flex flex-row justify-between items-center">
                <div>
                  <div className="text-xs text-gray-500 mb-1">
                    {rightCards[4].top}
                  </div>
                  <div className="font-bold text-base mb-1">
                    {rightCards[4].title}
                  </div>
                  <div className="text-xs text-gray-500">
                    {rightCards[4].bottom}
                  </div>
                </div>
                <div className="ml-auto font-semibold text-sm text-[--primary-90] bg-blue-50 rounded-full px-3 py-1">
                  {rightCards[4].percent}
                </div>
              </CardContent>
            </Card>
            <div className="flex flex-col gap-2 mt-2">
              <button className="flex items-center gap-2 border border-[--primary-60] text-[--primary-90] rounded-lg px-4 py-2 font-medium hover:bg-blue-50 transition">
                <Image
                  src="/icons/PDFIcon.svg"
                  alt="pdf"
                  width={18}
                  height={18}
                />
                Выгрузить в PDF
              </button>
              <button className="flex items-center gap-2 border border-[--primary-60] text-[--primary-90] rounded-lg px-4 py-2 font-medium hover:bg-blue-50 transition">
                <Image
                  src="/icons/EXCELIcon.svg"
                  alt="pdf"
                  width={18}
                  height={18}
                />
                Выгрузить в Excel
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CoordinatorStatsPage;
