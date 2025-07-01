// columns.tsx
import { ColumnDef } from "@tanstack/react-table";
import { AdminUser } from "./types";
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

export const columns: ColumnDef<AdminUser>[] = [
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
    accessorKey: "role",
    header: "Роли",
    cell: ({ row }) => row.original.role,
    size: 180,
    enableSorting: false,
  },
  {
    accessorKey: "department",
    header: "Подразделения",
    cell: ({ row }) => (
      <Select value={row.original.department} disabled>
        <SelectTrigger className="w-[140px] bg-white shadow-none">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Первое">Первое</SelectItem>
          <SelectItem value="Второе">Второе</SelectItem>
          <SelectItem value="Третье">Третье</SelectItem>
          <SelectItem value="Четвертое">Четвертое</SelectItem>
        </SelectContent>
      </Select>
    ),
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
          row.original.status === "Активен"
            ? "text-[--success] bg-green-50 hover:text-white hover:bg-[--success]"
            : "text-[--error] bg-red-50 hover:text-white hover:bg-[--error]"
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
