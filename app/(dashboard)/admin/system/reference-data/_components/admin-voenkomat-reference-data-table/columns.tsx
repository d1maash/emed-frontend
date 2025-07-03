// columns.tsx
import { ColumnDef } from "@tanstack/react-table";
import { Voenkomat } from "./types";
import { Pencil, X } from "lucide-react";
import { Button } from "@/components/ui/Button";

export const columns: ColumnDef<Voenkomat>[] = [
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
    header: "Адрес",
    cell: ({ row }) => row.original.address,
    size: 220,
    enableSorting: true,
    sortingFn: "alphanumeric",
  },
  {
    accessorKey: "contacts",
    header: "Контакты",
    cell: ({ row }) => row.original.contacts,
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
