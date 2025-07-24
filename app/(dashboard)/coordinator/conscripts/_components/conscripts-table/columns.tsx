import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Pencil, Eye, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { Conscript } from "@/types/conscript";
import { useRouter } from "next/navigation";

const ActionsCell = ({ iin }: { iin: string }) => {
  const router = useRouter();
  return (
    <div className="flex items-center gap-2">
      <Button variant="ghost" size="icon" className="text-blue-500">
        <Pencil size={18} />
      </Button>
      <Button
        onClick={() => {
          router.push("/coordinator/conscripts/queue/?iin=" + iin);
        }}
        variant="ghost"
        size="icon"
        className="text-gray-500"
      >
        <Eye size={18} />
      </Button>
      <Button variant="ghost" size="icon" className="text-red-500">
        <X size={18} />
      </Button>
    </div>
  );
};

export const columns: ColumnDef<Conscript>[] = [
  {
    accessorKey: "id",
    header: "#",
    cell: ({ row }) => row.original.user.id,
    size: 36,
    enableSorting: false,
  },
  {
    accessorKey: "name",
    header: "ФИО",
    cell: ({ row }) => row.original.user.full_name,
    size: 220,
    enableSorting: true,
    sortingFn: "alphanumeric",
  },
  {
    accessorKey: "iin",
    header: "ИИН",
    cell: ({ row }) => row.original.user.iin,
    size: 180,
    enableSorting: false,
  },
  {
    accessorKey: "militaryId",
    header: "Военный билет",
    cell: ({ row }) => <div>Недоступно</div>,
    size: 180,
    enableSorting: false,
  },
  {
    accessorKey: "department",
    header: "Подразделения",
    cell: ({ row }) => <div>Недоступно</div>,
    size: 180,
    enableSorting: false,
  },
  {
    accessorKey: "status",
    header: "Статус",
    cell: ({ row }) => (
      <Badge className="rounded-full text-blue-600 bg-blue-50 hover:text-white hover:bg-blue-600">
        Недоступно
      </Badge>
    ),
    size: 120,
    enableSorting: false,
  },
  {
    id: "actions",
    header: "",
    cell: ({ row }) => <ActionsCell iin={row.original.user.iin} />, // refactored
    size: 80,
    enableSorting: false,
  },
];
