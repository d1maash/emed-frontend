"use client";

import React, { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
  SortingState,
} from "@tanstack/react-table";
import { columns } from "./columns";
import { Conscript } from "./types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface CoordinatorConscriptsTableProps {
  data: Conscript[];
}

export const CoordinatorConscriptsTable: React.FC<
  CoordinatorConscriptsTableProps
> = ({ data }) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pageIndex, setPageIndex] = useState(1);

  const pageSize = 10;
  const pageCount = Math.ceil(data.length / pageSize);
  const paginatedConscripts = data.slice(
    (pageIndex - 1) * pageSize,
    pageIndex * pageSize
  );

  const table = useReactTable({
    data: paginatedConscripts,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualPagination: true,
    pageCount,
  });

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <div className="w-full rounded-xl border bg-white overflow-x-auto">
        <Table className="w-full">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    style={{ width: header.getSize() }}
                    className={cn(
                      header.column.getCanSort() && "cursor-pointer select-none"
                    )}
                    onClick={
                      header.column.getCanSort()
                        ? header.column.getToggleSortingHandler()
                        : undefined
                    }
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                className={row.index % 2 === 1 ? "bg-[#f7faff]" : ""}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {/* Pagination */}
      <div className="w-full flex justify-center items-center gap-2 my-4">
        <button
          className="w-8 h-8 flex items-center justify-center  text-[--primary-90] disabled:text-[#6B7280] disabled:opacity-50"
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
