import { ColumnDef } from "@tanstack/react-table";
import { Conscript } from "./types";
import { Badge } from "@/components/ui/badge";
import { Pencil, Eye, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export const columns: ColumnDef<Conscript>[] = [
  {
    accessorKey: "id",
    header: "#",
    cell: ({ row }) => row.original.id,
    size: 36,
    enableSorting: false,
  },
  {
    accessorKey: "name",
    header: "ФИО",
    cell: ({ row }) => row.original.name,
    size: 220,
    enableSorting: true,
    sortingFn: "alphanumeric",
  },
  {
    accessorKey: "login",
    header: "Логин",
    cell: ({ row }) => row.original.login,
    size: 180,
    enableSorting: false,
  },
  {
    accessorKey: "militaryId",
    header: "Военный билет",
    cell: ({ row }) => row.original.militaryId,
    size: 180,
    enableSorting: false,
  },
  {
    accessorKey: "department",
    header: "Подразделения",
    cell: ({ row }) => row.original.department,
    size: 180,
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
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="text-blue-500">
          <Pencil size={18} />
        </Button>
        <Button variant="ghost" size="icon" className="text-gray-500">
          <Eye size={18} />
        </Button>
        <Button variant="ghost" size="icon" className="text-red-500">
          <X size={18} />
        </Button>
      </div>
    ),
    size: 80,
    enableSorting: false,
  },
];
