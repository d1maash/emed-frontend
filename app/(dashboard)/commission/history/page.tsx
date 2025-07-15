"use client";
import React, { useState } from "react";
import { HistoryOfProtocolsTable } from "./_components/history-of-protocols-table/HistoryOfProtocolsTable";
import { Protocol } from "./_components/history-of-protocols-table/types";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/Input";
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const STATUSES = [
  { value: "signed", label: "Подписан" },
  { value: "notSigned", label: "Не подписан" },
  { value: "awaiting", label: "В ожидании" },
];

const CommissionHistoryPage = () => {
  const [globalFilter, setGlobalFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | undefined>();

  const filteredProtocols = protocols.filter((p) => {
    const matchesText =
      p.fullname.toLowerCase().includes(globalFilter.toLowerCase()) ||
      String(p.id).includes(globalFilter);

    const matchesStatus = statusFilter
      ? (statusFilter === "signed" && p.status === "Подписан") ||
        (statusFilter === "notSigned" && p.status === "Не подписан") ||
        (statusFilter === "awaiting" && p.status === "В ожидании")
      : true;

    return matchesText && matchesStatus;
  });
  return (
    <div className="flex flex-col gap-8">
      {/* Sort */}
      <div className="flex flex-col md:flex-row gap-2 md:gap-4">
        <div className="max-w-md relative h-max">
          <Input
            placeholder="Поиск по ФИО или ID"
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="w-full bg-white shadow-none pl-10"
          />
          <Search
            className="text-[--coolgray-90] absolute left-3 top-1/2 -translate-y-1/2"
            size={16}
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px] bg-white shadow-none">
            <SelectValue placeholder="Статус" />
          </SelectTrigger>
          <SelectContent>
            {STATUSES.map((s) => (
              <SelectItem key={s.value} value={s.value}>
                {s.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <HistoryOfProtocolsTable data={filteredProtocols} />
    </div>
  );
};

const protocols: Protocol[] = [
  {
    id: "000001",
    fullname: "Full Name 1",
    date: "2025-07-01",
    decision: "Decision 1",
    files: [
      {
        id: "000001",
        name: "FileName1_1",
        extension: "pdf",
        size: "1MB",
        src: "https://example.com/file1_1.pdf",
      },
      {
        id: "000002",
        name: "FileName1_2",
        extension: "xlsx",
        size: "2MB",
        src: "https://example.com/file1_2.xlsx",
      },
    ],
    status: "Подписан",
  },
  {
    id: "000002",
    fullname: "Full Name 2",
    date: "2025-07-02",
    decision: "Decision 2",
    files: [
      {
        id: "000003",
        name: "FileName2_1",
        extension: "pdf",
        size: "1MB",
        src: "https://example.com/file2_1.pdf",
      },
      {
        id: "000004",
        name: "FileName2_2",
        extension: "xlsx",
        size: "2MB",
        src: "https://example.com/file2_2.xlsx",
      },
    ],
    status: "Не подписан",
  },
  {
    id: "000003",
    fullname: "Full Name 3",
    date: "2025-07-03",
    decision: "Decision 3",
    files: [
      {
        id: "000005",
        name: "FileName3_1",
        extension: "pdf",
        size: "1MB",
        src: "https://example.com/file3_1.pdf",
      },
      {
        id: "000006",
        name: "FileName3_2",
        extension: "docx",
        size: "2MB",
        src: "https://example.com/file3_2.docx",
      },
    ],
    status: "В ожидании",
  },
  {
    id: "000025",
    fullname: "Full Name 25",
    date: "2025-07-25",
    decision: "Decision 25",
    files: [
      {
        id: "000049",
        name: "FileName25_1",
        extension: "pdf",
        size: "1MB",
        src: "https://example.com/file25_1.pdf",
      },
      {
        id: "000050",
        name: "FileName25_2",
        extension: "docx",
        size: "2MB",
        src: "https://example.com/file25_2.docx",
      },
    ],
    status: "Подписан",
  },
];

export default CommissionHistoryPage;
