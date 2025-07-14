import { ColumnDef } from "@tanstack/react-table";
import { MedicalConclusion } from "./types";
import { Button } from "@/components/ui/Button";
import { Ellipsis } from "lucide-react";

export const columns: ColumnDef<MedicalConclusion>[] = [
  {
    accessorKey: "fullname",
    header: "Призывник",
    cell: ({ row }) => row.original.fullname,
    size: 180,
  },
  {
    accessorKey: "examDate",
    header: "Дата осмотра",
    cell: ({ row }) => row.original.examDate,
    size: 120,
  },
  {
    accessorKey: "examType",
    header: "Тип",
    cell: ({ row }) => row.original.examType,
    size: 120,
  },
  {
    accessorKey: "category",
    header: "Категория",
    cell: ({ row }) => row.original.category,
    size: 80,
  },
  {
    accessorKey: "comment",
    header: "Комментарий",
    cell: ({ row }) => row.original.comment,
    size: 220,
  },
  {
    accessorKey: "file",
    header: "Файл",
    cell: ({ row }) => row.original.file,
    size: 80,
  },
  {
    accessorKey: "status",
    header: "Статус",
    cell: ({ row }) => {
      const value = row.original.status;
      let color = "text-green-500";
      if (value === "В ожидании") color = "text-blue-500";
      if (value === "Отклонено") color = "text-red-500";
      if (value === "Требует подписи") color = "text-cyan-500";
      return <span className={color}>{value}</span>;
    },
    size: 120,
  },
  {
    accessorKey: "action",
    header: "Действие",
    cell: ({ row }) => (
      <Button variant="secondary" className="min-w-[100px]">
        {row.original.action}
      </Button>
    ),
    size: 120,
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
