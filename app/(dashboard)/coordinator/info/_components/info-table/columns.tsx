import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/Button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { InfoRow } from "./types";

export const columns: ColumnDef<InfoRow>[] = [
  {
    accessorKey: "name",
    header: "ФИО",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <span className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center">
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
            <path
              d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5zm0 2c-3.314 0-10 1.657-10 5v3h20v-3c0-3.343-6.686-5-10-5z"
              fill="#C1C7D0"
            />
          </svg>
        </span>
        {row.original.name}
      </div>
    ),
    size: 220,
    enableSorting: true,
    sortingFn: "alphanumeric",
  },
  {
    accessorKey: "specialty",
    header: "Специальность",
    cell: ({ row }) => row.original.specialty,
    size: 180,
    enableSorting: true,
    sortingFn: "alphanumeric",
  },
  {
    accessorKey: "department",
    header: "Подразделение",
    cell: ({ row }) => (
      <Select value={row.original.department} disabled>
        <SelectTrigger className="w-[80px] bg-white shadow-none">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="№3">№3</SelectItem>
        </SelectContent>
      </Select>
    ),
    size: 100,
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
        Редактировать
      </Button>
    ),
    size: 160,
    enableSorting: false,
  },
];
