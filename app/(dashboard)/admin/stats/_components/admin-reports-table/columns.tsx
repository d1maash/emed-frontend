// columns.tsx
import { ColumnDef } from "@tanstack/react-table";
import { Report } from "./types";
import { Badge } from "@/components/ui/badge";
import { Pencil, Eye, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectItem,
  SelectValue,
  SelectTrigger,
  SelectContent,
} from "@/components/ui/select";

export const columns: ColumnDef<Report>[] = [
  {
    accessorKey: "id",
    header: "#",
    cell: ({ row }) => row.original.id,
    size: 36,
    enableSorting: false,
  },
  {
    accessorKey: "name",
    header: "Название отчета",
    cell: ({ row }) => row.original.name,
    size: 220,
    enableSorting: true,
    sortingFn: "alphanumeric",
  },
  {
    accessorKey: "interval",
    header: "Периодичность",
    cell: ({ row }) => (
      <Select value={row.original.interval} disabled>
        <SelectTrigger className="w-[140px] bg-white shadow-none">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Ежедневно">Ежедневно</SelectItem>
          <SelectItem value="Еженедельно">Еженедельно</SelectItem>
          <SelectItem value="Ежемесячно">Ежемесячно</SelectItem>
        </SelectContent>
      </Select>
    ),
    size: 180,
    enableSorting: false,
  },
  {
    accessorKey: "responsible",
    header: "Ответственный",
    cell: ({ row }) => row.original.responsible,
    size: 180,
    enableSorting: false,
  },
  {
    accessorKey: "lastGeneration",
    header: "Последняя генерация",
    cell: ({ row }) => (
      <div>
        {row.original.lastGeneration
          ? new Date(row.original.lastGeneration).toLocaleDateString("ru-RU", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            })
          : ""}
      </div>
    ),
    size: 180,
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
