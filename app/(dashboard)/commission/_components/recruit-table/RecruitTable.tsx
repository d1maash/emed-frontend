// src/components/RecruiterTable.tsx
"use client";

import React, { useEffect, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
  SortingState,
} from "@tanstack/react-table";
import { columns } from "./columns";
import { Recruit } from "./types";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface RecruitTableProps {
  data: Recruit[];
}

export const RecruitTable: React.FC<RecruitTableProps> = ({ data }) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pageIndex, setPageIndex] = useState(1);

  useEffect(() => {
    setPageIndex(1);
  }, [data]);

  const pageSize = 10;
  const pageCount = Math.ceil(data.length / pageSize);

  // Получаем только данные текущей страницы
  const paginatedData = data.slice(
    (pageIndex - 1) * pageSize,
    pageIndex * pageSize
  );

  const table = useReactTable({
    data: paginatedData,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    pageCount,
  });

  return (
    <div className="flex flex-col items-center w-full">
      <div className="w-full rounded-xl overflow-x-auto">
        <Table className="min-w-full border-separate border-spacing-0 text-sm">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    className="py-2.5 px-3 truncate text-ellipsis font-medium text-left whitespace-nowrap cursor-pointer select-none border-b border-gray-200 bg-[--primary-30]"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} className="even:bg-gray-100">
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className={cn(
                      "py-2 px-3 truncate text-ellipsis align-middle whitespace-nowrap"
                    )}
                    style={{
                      width: cell.column.getSize(),
                      minWidth: cell.column.getSize(),
                      maxWidth: cell.column.getSize(),
                    }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {/* Pagination Controls */}
      <div className="w-full flex justify-center items-center gap-2 my-4">
        <button
          className="w-8 h-8 flex items-center justify-center text-[--primary-90] disabled:text-[#6B7280] disabled:opacity-50"
          onClick={() => setPageIndex((p) => Math.max(1, p - 1))}
          disabled={pageIndex === 1}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        {Array.from({ length: pageCount }, (_, i) => (
          <button
            key={i}
            className={cn(
              "w-8 h-8 flex items-center justify-center text-[--primary-90]",
              pageIndex === i + 1 ? "bg-[--primary-30]" : ""
            )}
            onClick={() => setPageIndex(i + 1)}
          >
            {i + 1}
          </button>
        ))}
        <button
          className="w-8 h-8 flex items-center justify-center text-[--primary-90] disabled:text-[#6B7280] disabled:opacity-50"
          onClick={() => setPageIndex((p) => Math.min(pageCount, p + 1))}
          disabled={pageIndex === pageCount}
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
