import { ColumnDef } from "@tanstack/react-table";
import { ScheduleRow } from "./types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export const columns: ColumnDef<ScheduleRow>[] = [
  {
    accessorKey: "doctor",
    header: "Врач",
    cell: ({ row }) => row.original.doctor,
    size: 180,
    enableSorting: true,
    sortingFn: "alphanumeric",
  },
  {
    accessorKey: "conscript",
    header: "Призывник",
    cell: ({ row }) => row.original.conscript,
    size: 180,
    enableSorting: true,
    sortingFn: "alphanumeric",
  },
  {
    accessorKey: "room",
    header: "Кабинет",
    cell: ({ row }) => row.original.room,
    size: 100,
    enableSorting: false,
  },
  {
    accessorKey: "slot",
    header: "Слоты",
    cell: ({ row }) => row.original.slot,
    size: 160,
    enableSorting: false,
  },
  {
    accessorKey: "status",
    header: "Статус",
    cell: ({ row }) => (
      <Badge
        className={cn(
          "rounded-full",
          row.original.status === "Ожидает приема"
            ? "text-yellow-600 bg-yellow-50 hover:text-white hover:bg-yellow-600"
            : row.original.status === "Завершено"
            ? "text-green-600 bg-green-50 hover:text-white hover:bg-green-600"
            : row.original.status === "Результат готов"
            ? "text-blue-600 bg-blue-50 hover:text-white hover:bg-blue-600"
            : "text-gray-600 bg-gray-50 hover:text-white hover:bg-gray-600"
        )}
      >
        {row.original.status}
      </Badge>
    ),
    size: 120,
    enableSorting: false,
  },
  {
    id: "actions",
    header: "",
    cell: ({ row }) => (
      <Button
        variant="outline"
        className="border-blue-400 text-blue-500 px-4 py-1 rounded-full hover:bg-blue-50"
      >
        Перенести запись
      </Button>
    ),
    size: 160,
    enableSorting: false,
  },
];
