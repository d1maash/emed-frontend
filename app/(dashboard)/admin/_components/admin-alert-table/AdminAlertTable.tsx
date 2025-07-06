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
import { alertRows } from "./data";
import { AlertCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const AdminAlertTable = () => {
  const [rowSelection, setRowSelection] = useState({});
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data: alertRows,
    columns,
    state: { rowSelection, sorting },
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    enableRowSelection: true,
  });

  return (
    <div className="w-full flex flex-col justify-start xl:col-span-3 rounded-xl border px-6 py-8 md:p-10 overflow-hidden bg-white xl:h-[820px]">
      <div className="flex items-center justify-between">
        <h4 className="text-2xl font-bold">Тревога</h4>
        <AlertCircle size={24} />
      </div>
      <div className="flex-1 overflow-hidden mt-8">
        <div className="h-full overflow-auto">
          <table className="w-full text-sm">
            <thead className="border-y bg-[#F7F7F8] sticky top-0">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="py-2.5 px-3 truncate text-ellipsis font-medium text-left whitespace-nowrap"
                      style={{
                        width: header.getSize(),
                        minWidth: header.getSize(),
                        maxWidth: header.getSize(),
                      }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="border-b hover:bg-[#F7F7F8] transition"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="py-2 px-3 truncate text-ellipsis align-middle whitespace-nowrap"
                      style={{
                        width: cell.column.getSize(),
                        minWidth: cell.column.getSize(),
                        maxWidth: cell.column.getSize(),
                      }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Pagination */}
      <div className="mt-8 xl:mt-auto flex justify-center items-center gap-2 select-none">
        <button
          className="w-8 h-8 flex items-center justify-center bg-white text-[--primary-90] disabled:text-[#6B7280] disabled:opacity-50"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <ChevronLeft size={20} strokeWidth={2.5} />
        </button>
        {Array.from({ length: table.getPageCount() }, (_, i) => (
          <button
            key={i}
            className={cn(
              "w-8 h-8 flex items-center justify-center text-[--primary-90]",
              table.getState().pagination.pageIndex === i
                ? "bg-[--primary-30]"
                : "bg-white"
            )}
            onClick={() => table.setPageIndex(i)}
          >
            {i + 1}
          </button>
        ))}
        <button
          className="w-8 h-8 flex items-center justify-center  bg-white text-[--primary-90] disabled:text-[#6B7280] disabled:opacity-50"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <ChevronRight size={20} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
};

export default AdminAlertTable;
