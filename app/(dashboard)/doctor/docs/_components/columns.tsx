import { ColumnDef } from "@tanstack/react-table";
import { Doc } from "./types";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";

const modalDocs = [
  {
    name: "Заключение терапевта",
    date: "14.06.2025",
    type: "Медицинская справка",
    format: "PDF",
    status: "Готово",
  },
  {
    name: "Анализ крови",
    date: "13.06.2025",
    type: "Заключение",
    format: "PDF",
    status: "Готово",
  },
  {
    name: "Анализ мочи",
    date: "12.06.2025",
    type: "Финальное заключение",
    format: "PDF",
    status: "Готово",
  },
  {
    name: "ЭКГ",
    date: "11.06.2025",
    type: "Медкарта",
    format: "PDF",
    status: "Готово",
  },
  {
    name: "Психиатрическое заключение",
    date: "—",
    type: "Административный",
    format: "PDF",
    status: "Не загружено",
  },
  {
    name: "Флюорография",
    date: "10.06.2025",
    type: "Решение комиссии",
    format: "PDF",
    status: "Готово",
  },
  {
    name: "Заключение ВВК",
    date: "10.06.2025",
    type: "Решение комиссии",
    format: "PDF",
    status: "Готово",
  },
  {
    name: "Справка COVID",
    date: "10.06.2025",
    type: "Решение комиссии",
    format: "PDF",
    status: "Готово",
  },
];

export const columns: ColumnDef<Doc>[] = [
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
    header: "Призывник",
    cell: ({ row }) => row.original.fullname,
    size: 180,
  },
  {
    accessorKey: "date",
    header: "Дата",
    cell: ({ row }) => row.original.date,
    size: 120,
  },
  {
    accessorKey: "totalDocs",
    header: "Всего документов",
    cell: ({ row }) => row.original.totalDocs,
    size: 140,
  },
  {
    accessorKey: "format",
    header: "Формат",
    cell: ({ row }) => row.original.format,
    size: 80,
  },
  {
    accessorKey: "status",
    header: "Статус",
    cell: ({ row }) => {
      const value = row.original.status;
      let color = "text-yellow-500";
      if (value === "Завершено") color = "text-green-500";
      if (value === "Не загружено") color = "text-red-500";
      return <span className={color}>{value}</span>;
    },
    size: 120,
  },
  {
    id: "actions",
    header: "Действия:",
    cell: () => (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="secondary">Подробнее</Button>
        </DialogTrigger>
        <DialogContent className="max-w-5xl w-full">
          <div className="overflow-x-auto border rounded-lg p-2">
            <table className="min-w-full text-sm">
              <thead>
                <tr>
                  <th className="px-2 py-2">
                    <Checkbox />
                  </th>
                  <th className="px-2 py-2 text-left">Название документа</th>
                  <th className="px-2 py-2 text-left">Дата загрузки</th>
                  <th className="px-2 py-2 text-left">Тип документа</th>
                  <th className="px-2 py-2 text-left">Формат</th>
                  <th className="px-2 py-2 text-left">Статус</th>
                  <th className="px-2 py-2 text-left">Действия:</th>
                </tr>
              </thead>
              <tbody>
                {modalDocs.map((doc, idx) => (
                  <tr key={idx} className="border-t">
                    <td className="px-2 py-2">
                      <Checkbox />
                    </td>
                    <td className="px-2 py-2">{doc.name}</td>
                    <td className="px-2 py-2">{doc.date}</td>
                    <td className="px-2 py-2">{doc.type}</td>
                    <td className="px-2 py-2">{doc.format}</td>
                    <td className="px-2 py-2">
                      <span
                        className={
                          doc.status === "Готово"
                            ? "text-green-500"
                            : doc.status === "Не загружено"
                            ? "text-red-500"
                            : ""
                        }
                      >
                        {doc.status}
                      </span>
                    </td>
                    <td className="px-2 py-2">
                      <Button variant="secondary">Посмотреть</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </DialogContent>
      </Dialog>
    ),
    size: 100,
  },
];
