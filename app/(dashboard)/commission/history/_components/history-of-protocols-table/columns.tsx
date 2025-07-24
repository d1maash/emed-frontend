// src/components/columns.tsx
import { ColumnDef } from "@tanstack/react-table";
import { Protocol } from "./types";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ArrowDown, ArrowUp, FileDownIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import Image from "next/image";

export const columns: ColumnDef<Protocol>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <button
        type="button"
        className="flex items-center gap-1 select-none"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        ID
        {column.getIsSorted() === "asc" && <ArrowUp className="w-4 h-4" />}
        {column.getIsSorted() === "desc" && <ArrowDown className="w-4 h-4" />}
      </button>
    ),
    cell: ({ row }) => row.original.id,
    size: 70,
  },
  {
    accessorKey: "fullname",
    header: ({ column }) => (
      <button
        type="button"
        className="flex items-center gap-1 select-none"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        ФИО
        {column.getIsSorted() === "asc" && <ArrowUp className="w-4 h-4" />}
        {column.getIsSorted() === "desc" && <ArrowDown className="w-4 h-4" />}
      </button>
    ),
    cell: ({ row }) => row.original.fullname,
  },
  {
    accessorKey: "date",
    header: ({ column }) => (
      <button
        type="button"
        className="flex items-center gap-1 select-none"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Дата заседания
        {column.getIsSorted() === "asc" && <ArrowUp className="w-4 h-4" />}
        {column.getIsSorted() === "desc" && <ArrowDown className="w-4 h-4" />}
      </button>
    ),
    cell: ({ row }) => row.original.date,
    size: 95,
  },
  {
    accessorKey: "decision",
    header: "Принятое решение",
    cell: ({ row }) => row.original.decision,
    size: 115,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <button
        type="button"
        className="flex items-center gap-1 select-none"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Статус подписи
        {column.getIsSorted() === "asc" && <ArrowUp className="w-4 h-4" />}
        {column.getIsSorted() === "desc" && <ArrowDown className="w-4 h-4" />}
      </button>
    ),
    cell: ({ row }) => {
      const value = row.original.status;
      return (
        <Badge
          className={cn(
            "rounded-full",
            value === "В ожидании"
              ? "bg-[--warning] text-[#7A5E00] hover:bg-[#7A5E00] hover:text-white"
              : value === "Подписан"
              ? "bg-[#2AD97F]/20 text-[#1D9E4B] hover:text-white hover:bg-[#1D9E4B]"
              : "bg-white text-black hover:bg-gray-800 hover:text-white"
          )}
        >
          {value}
        </Badge>
      );
    },
    size: 115,
  },
  {
    accessorKey: "files",
    header: ({ column }) => (
      <button
        type="button"
        className="flex items-center gap-1 select-none"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Экспорт
        {column.getIsSorted() === "asc" && <ArrowUp className="w-4 h-4" />}
        {column.getIsSorted() === "desc" && <ArrowDown className="w-4 h-4" />}
      </button>
    ),
    cell: ({ row }) => {
      const files = row.original.files;
      return (
        <div className="flex gap-2 justify-starts items-center">
          {files.map((file) => (
            <button
              key={file.id}
              className="w-24 justify-center items-center
              flex gap-2 whitespace-nowrap flex-nowrap
              rounded-xl py-0.5 px-4 font-medium text-xs border border-[--primary-60] hover:bg-[--primary-90] hover:text-white hover:border-[--primary-90] transition"
              onClick={() => {}}
            >
              {file.extension === "xlsx" ? (
                <>
                  <Image
                    alt="excel icon"
                    src={"/icons/EXCELIcon.svg"}
                    width={20}
                    height={20}
                  />
                  Excel
                </>
              ) : file.extension === "pdf" ? (
                <>
                  <Image
                    alt="pdf icon"
                    src={"/icons/PDFIcon.svg"}
                    width={20}
                    height={20}
                  />
                  PDF
                </>
              ) : (
                <>
                  <FileDownIcon
                    className="text-[--primary-60] whitespace-nowrap flex-nowrap"
                    size={16}
                  />
                  Файл
                </>
              )}
            </button>
          ))}
        </div>
      );
    },
    size: 115,
  },
  {
    id: "options",
    cell: ({ row }) => <OptionsCell id={row.original.id} />,
    size: 160,
  },
];

const OptionsCell = ({ id }: { id: string }) => {
  const router = useRouter();
  return (
    <button
      onClick={() => router.push(`/commission/case?id=${id}`)}
      className="rounded-xl py-0.5 px-2.5 font-medium text-xs border border-[--primary-60] hover:bg-[--primary-90] hover:text-white hover:border-[--primary-90] transition"
    >
      Просмотреть протокол
    </button>
  );
};
