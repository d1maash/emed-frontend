"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Download, Plus, Search } from "lucide-react";
import { CoordinatorInfoTable } from "./_components/info-table/CoordinatorInfoTable";
import { infoRows } from "./_components/info-table/data";
import { InfoRow } from "./_components/info-table/types";

const CoordinatorInfoPage = () => {
  const [search, setSearch] = useState("");

  const filteredRows = infoRows.filter((row: InfoRow) => {
    return (
      row.name.toLowerCase().includes(search.toLowerCase()) ||
      String(row.id).includes(search)
    );
  });

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="flex items-center justify-between gap-4 mt-4 mb-2">
        <div className="flex items-center justify-between gap-3 w-full">
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
      <div className="flex-1">
        <CoordinatorInfoTable data={filteredRows} />
      </div>
    </div>
  );
};

export default CoordinatorInfoPage;
