// src/components/columns.tsx
import { ColumnDef } from "@tanstack/react-table";
import { Recruit } from "./types";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ArrowDown, ArrowUp } from "lucide-react";
import { useRouter } from "next/navigation";

export const columns: ColumnDef<Recruit>[] = [
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
    accessorKey: "iin",
    header: ({ column }) => (
      <button
        type="button"
        className="flex items-center gap-1 select-none"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        ИИН
        {column.getIsSorted() === "asc" && <ArrowUp className="w-4 h-4" />}
        {column.getIsSorted() === "desc" && <ArrowDown className="w-4 h-4" />}
      </button>
    ),
    cell: ({ row }) => row.original.iin,
    size: 95,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <button
        type="button"
        className="flex items-center gap-1 select-none"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Статус
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
            value === "Ждет решения"
              ? "bg-[--warning] text-[#7A5E00] hover:bg-[#7A5E00] hover:text-white"
              : value === "Решение принято" &&
                  "bg-[#2AD97F]/20 text-[#1D9E4B] hover:text-white hover:bg-[#1D9E4B]"
          )}
        >
          {value}
        </Badge>
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
      className="rounded-2xl py-0.5 px-2.5 font-medium text-xs border border-[--primary-60] hover:bg-[--primary-90] hover:text-white hover:border-[--primary-90] transition"
    >
      Перейти к рассмотрению
    </button>
  );
};
