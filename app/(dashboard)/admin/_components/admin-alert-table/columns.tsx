import { Checkbox } from "@/components/ui/checkbox";
import { ArrowDown, ArrowUp, MoreHorizontal, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";
import { cn } from "@/lib/utils";
import { AlertRow } from "./types";

export const columns: ColumnDef<AlertRow>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllRowsSelected()
            ? true
            : table.getIsSomeRowsSelected()
            ? "indeterminate"
            : false
        }
        onCheckedChange={(checked) => {
          if (checked === "indeterminate") return;
          table.toggleAllRowsSelected(checked === true);
        }}
        aria-label="Выбрать все"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={row.getToggleSelectedHandler()}
        aria-label="Выбрать строку"
      />
    ),
    enableSorting: false,
    enableHiding: false,
    size: 32,
  },
  {
    accessorKey: "name",
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
    cell: ({ row }) => (
      <div className="flex items-center gap-3 w-full">
        <div className="w-10 h-10 min-w-10 min-h-10 rounded-full bg-[#F7F7F7] flex items-center justify-center flex-shrink-0">
          <User strokeWidth={1} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="font-medium truncate">{row.original.name}</div>
          <div className="text-xs text-muted-foreground truncate">
            {row.original.role}
          </div>
        </div>
      </div>
    ),
    size: 220,
    enableSorting: true,
    sortingFn: "alphanumeric",
  },
  {
    accessorKey: "alert",
    header: "Тревога",
    cell: ({ row }) => row.original.alert,
    size: 260,
  },
  {
    accessorKey: "status",
    header: "Статус",
    cell: ({ row }) => {
      const value = row.original.status;
      return (
        <Badge
          className={cn(
            "rounded-full",
            value === "Важно"
              ? "bg-[--warning] text-[#7A5E00] hover:bg-[#7A5E00] hover:text-white"
              : value === "Устранено"
              ? "bg-[#2AD97F]/20 text-[#1D9E4B] hover:text-white hover:bg-[#1D9E4B]"
              : "bg-[#E6E9F4] text-[#6B7280] hover:bg-[#6B7280] hover:text-white"
          )}
        >
          {value}
        </Badge>
      );
    },
    size: 120,
  },
  {
    id: "actions",
    header: "",
    cell: () => (
      <div className="flex justify-end">
        {/* IDK what will be here, sorry :) */}
        <MoreHorizontal className="text-[#A1A1AA]" size={20} />
      </div>
    ),
    size: 32,
  },
];
