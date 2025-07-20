"use client";

import React, { useState } from "react";
import { CoordinatorConscriptsTable } from "./_components/conscripts-table/CoordinatorConscriptsTable";
import { conscripts as conscriptsData } from "./_components/conscripts-table/data";
import { Conscript } from "./_components/conscripts-table/types";
import { Input } from "@/components/ui/Input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Download, Plus, Search, SlidersHorizontal } from "lucide-react";

const statuses = [
  { value: "Ожидает приема", label: "Ожидает приема" },
  { value: "На приеме", label: "На приеме" },
  { value: "Завершено", label: "Завершено" },
  { value: "На комиссии", label: "На комиссии" },
  { value: "Результат готов", label: "Результат готов" },
];
const voenkomats = [
  { value: "Полномочия", label: "Полномочия" },
  { value: "Первичный", label: "Первичный" },
];

const CoordinatorConscriptsPage = () => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<string | undefined>(undefined);
  const [voenkomat, setVoenkomat] = useState<string | undefined>(undefined);

  const filteredConscripts = (conscriptsData as Conscript[]).filter(
    (c: Conscript) => {
      const matchesText =
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        String(c.id).includes(search);
      const matchesStatus = status ? c.status === status : true;
      const matchesVoenkomat = voenkomat ? c.department === voenkomat : true;
      return matchesText && matchesStatus && matchesVoenkomat;
    }
  );

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-4 mb-2">
        <div className="flex  flex-wrap sm:flex-nowrap items-center gap-3 w-full">
          <div className="relative w-full sm:w-auto">
            <Input
              className="pl-10 min-w-[240px] max-w-xs h-11 rounded-lg border border-gray-200 bg-white w-full"
              placeholder="Поиск по ФИО или ID"
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="h-11 rounded-lg border border-gray-200 bg-white w-auto flex items-center gap-2">
              <SelectValue placeholder="Статус" />
              <SlidersHorizontal className="ml-2 w-4 h-4 text-gray-400" />
            </SelectTrigger>
            <SelectContent>
              {statuses.map((status) => (
                <SelectItem key={status.value} value={status.value}>
                  {status.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={voenkomat} onValueChange={setVoenkomat}>
            <SelectTrigger className="h-11 rounded-lg border border-gray-200 bg-white w-auto flex items-center gap-2">
              <SelectValue placeholder="Военкомат" />
              <SlidersHorizontal className="ml-2 w-4 h-4 text-gray-400" />
            </SelectTrigger>
            <SelectContent>
              {voenkomats.map((v) => (
                <SelectItem key={v.value} value={v.value}>
                  {v.label}
                </SelectItem>
              ))}
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
      <CoordinatorConscriptsTable data={filteredConscripts} />
    </div>
  );
};

export default CoordinatorConscriptsPage;
