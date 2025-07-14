"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Search, SlidersHorizontal } from "lucide-react";
import { conscripts } from "./_components/data";
import { ConscriptsTable } from "./_components/ConscriptsTable";
import MyButton from "@/components/myui/MyButton";

export default function ConscriptsPage() {
  const [globalFilter, setGlobalFilter] = useState("");

  const filteredConscripts = conscripts.filter((c) => {
    const matchesText =
      c.fullname.toLowerCase().includes(globalFilter.toLowerCase()) ||
      c.iin.includes(globalFilter);
    return matchesText;
  });

  return (
    <div className="">
      <h1 className="text-2xl font-bold mb-6">Призывники на осмотр</h1>
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
        <div className="max-w-md relative h-max w-full md:w-auto">
          <Input
            placeholder="Поиск по ФИО или ИИН"
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="w-full md:w-[350px] bg-white shadow-none pl-10"
          />
          <Search
            className="text-[--coolgray-90] absolute left-3 top-1/2 -translate-y-1/2"
            size={16}
          />
        </div>
        <Button className="mt-2 md:mt-0 md:ml-4" variant="outline">
          Статус
          <SlidersHorizontal />
        </Button>
      </div>
      <ConscriptsTable data={filteredConscripts} />
    </div>
  );
}
