// columns.tsx
import { ColumnDef } from "@tanstack/react-table";
import { Podrazdeleniye } from "./types";
import { Pencil, X } from "lucide-react";
import { Button } from "@/components/ui/Button";

export const columns: ColumnDef<Podrazdeleniye>[] = [
  {
    accessorKey: "id",
    header: "#",
    cell: ({ row }) => row.original.id,
    size: 36,
    enableSorting: false,
  },
  {
    accessorKey: "name",
    header: "Военкомат",
    cell: ({ row }) => row.original.name,
    size: 220,
    enableSorting: true,
    sortingFn: "alphanumeric",
  },
  {
    accessorKey: "address",
    header: "Код",
    cell: ({ row }) => row.original.code,
    size: 220,
    enableSorting: true,
    sortingFn: "alphanumeric",
  },
  {
    accessorKey: "structure",
    header: "Контакты",
    cell: ({ row }) => row.original.structure,
    size: 220,
    enableSorting: true,
    sortingFn: "alphanumeric",
  },
  {
    id: "actions",
    header: "",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="text-blue-500">
          <Pencil size={18} />
        </Button>
        <Button variant="ghost" size="icon" className="text-red-500">
          <X size={18} />
        </Button>
      </div>
    ),
    size: 60,
    enableSorting: false,
  },
];
