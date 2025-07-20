import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { ListMedical } from "./types";
import { Ellipsis } from "lucide-react";

export const columns: ColumnDef<ListMedical>[] = [
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
    size: 36,
  },
  {
    accessorKey: "fullname",
    header: "ФИО",
    cell: ({ row }) => (
      <div>
        <div>{row.original.fullname}</div>
        <div className="text-xs text-muted-foreground">
          {row.original.position}
        </div>
      </div>
    ),
    size: 220,
  },
  {
    accessorKey: "iin",
    header: "ИИН",
    cell: ({ row }) => row.original.iin,
    size: 120,
  },
  {
    accessorKey: "examType",
    header: "Тип осмотра",
    cell: ({ row }) => row.original.examType,
    size: 140,
  },
  {
    accessorKey: "examDate",
    header: "Дата осмотра",
    cell: ({ row }) => row.original.examDate,
    size: 140,
  },
  {
    accessorKey: "status",
    header: "Статус",
    cell: ({ row }) => <span>{row.original.status}</span>,
    size: 120,
  },
  {
    id: "actions",
    header: "Действия:",
    cell: () => <Badge variant="secondary">Badge</Badge>,
    size: 80,
  },
  {
    id: "menu",
    header: "",
    cell: () => (
      <div className="flex justify-end w-full pr-2">
        <Ellipsis className="text-muted-foreground" />
      </div>
    ),
    size: 40,
    enableSorting: false,
    enableHiding: false,
  },
];
