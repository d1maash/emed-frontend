import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Ellipsis } from "lucide-react";
import { LMOList } from "@/types/lmo";
import { formatDateDmmmmYYYY } from "@/utils/dateUtils";
import { DoctorDashboardLMO } from "@/types/doctor";

export const columns: ColumnDef<DoctorDashboardLMO>[] = [
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
        <div>{row.original.conscript_name}</div>
        <div className="text-xs text-muted-foreground">
          {row.original.conscript_phone}
        </div>
      </div>
    ),
    size: 220,
  },
  {
    accessorKey: "iin",
    header: "ИИН",
    cell: ({ row }) => row.original.conscript_iin,
    size: 120,
  },
  {
    accessorKey: "canExamine",
    header: "Готов к осмотру",
    cell: ({ row }) => (
      <div>
        {!!row.original.can_examine ? (
          <Badge> Да </Badge>
        ) : (
          <Badge> Нет </Badge>
        )}
      </div>
    ),
    size: 140,
  },
  {
    accessorKey: "createDate",
    header: "Дата создания",
    cell: ({ row }) => <CreateDateCell date={row.original.created_at} />,
    size: 140,
  },
  {
    accessorKey: "status",
    header: "Статус",
    cell: ({ row }) => <span>{row.original.lmo_status_display}</span>,
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

const CreateDateCell: React.FC<{ date: string }> = ({ date }) => {
  const formattedDate = formatDateDmmmmYYYY(date);

  return <>{formattedDate}</>;
};
