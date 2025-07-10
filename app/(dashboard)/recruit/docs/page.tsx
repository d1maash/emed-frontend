"use client";

import MyButton from "@/components/myui/MyButton";
import { Plus } from "lucide-react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import React, { useState, useRef, useEffect } from "react";

type StatusColor = "success" | "error";
interface DocumentRow {
  id: number;
  name: string;
  date: string;
  type: string;
  format: string;
  status: string;
  statusColor: StatusColor;
  action: string;
}

const mockDocs: DocumentRow[] = [
  {
    id: 1,
    name: "Заключение терапевта",
    date: "14.06.2025",
    type: "Медицинская справка",
    format: "PDF",
    status: "Готово",
    statusColor: "success",
    action: "Посмотреть",
  },
  {
    id: 2,
    name: "Анализ крови",
    date: "13.06.2025",
    type: "Заключение",
    format: "PDF",
    status: "Готово",
    statusColor: "success",
    action: "Посмотреть",
  },
  {
    id: 3,
    name: "Анализ мочи",
    date: "12.06.2025",
    type: "Финальное заключение",
    format: "PDF",
    status: "Готово",
    statusColor: "success",
    action: "Посмотреть",
  },
  {
    id: 4,
    name: "ЭКГ",
    date: "11.06.2025",
    type: "Медкарта",
    format: "PDF",
    status: "Готово",
    statusColor: "success",
    action: "Посмотреть",
  },
  {
    id: 5,
    name: "Психиатрическое заключение",
    date: "—",
    type: "Административный",
    format: "PDF",
    status: "Не загружено",
    statusColor: "error",
    action: "Посмотреть",
  },
  {
    id: 6,
    name: "Флюорография",
    date: "10.06.2025",
    type: "Решение комиссии",
    format: "PDF",
    status: "Готово",
    statusColor: "success",
    action: "Посмотреть",
  },
  {
    id: 7,
    name: "Заключение ВВК",
    date: "10.06.2025",
    type: "Решение комиссии",
    format: "PDF",
    status: "Готово",
    statusColor: "success",
    action: "Посмотреть",
  },
  {
    id: 8,
    name: "Справка COVID",
    date: "10.06.2025",
    type: "Решение комиссии",
    format: "PDF",
    status: "Готово",
    statusColor: "success",
    action: "Посмотреть",
  },
];

const statusColorMap: Record<StatusColor, string> = {
  success: "text-green-500",
  error: "text-red-500",
};

const Page = () => {
  const [selected, setSelected] = useState<number[]>([]);
  const allCheckboxRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (allCheckboxRef.current) {
      (allCheckboxRef.current as any).indeterminate =
        selected.length > 0 && selected.length < mockDocs.length;
    }
  }, [selected]);

  const toggleAll = () => {
    if (selected.length === mockDocs.length) setSelected([]);
    else setSelected(mockDocs.map((d) => d.id));
  };
  const toggleOne = (id: number) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <div>
      <div className="flex items-center justify-end">
        <MyButton variant="filled" className="flex items-center p-3 gap-2">
          <Plus />
          Загрузить документ
        </MyButton>
      </div>
      <div className="mt-6 border rounded-xl overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-[#F7F7F8]">
              <TableHead>
                <Checkbox
                  ref={allCheckboxRef}
                  checked={selected.length === mockDocs.length}
                  onCheckedChange={toggleAll}
                  aria-label="Выбрать все"
                />
              </TableHead>
              <TableHead className="font-medium text-black">
                Название документа
              </TableHead>
              <TableHead className="font-medium text-black">
                Дата загрузки
              </TableHead>
              <TableHead className="font-medium text-black">
                Тип документа
              </TableHead>
              <TableHead className="font-medium text-black">Формат</TableHead>
              <TableHead className="font-medium text-black">Статус</TableHead>
              <TableHead className="font-medium text-black">
                Действия:
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockDocs.map((doc) => (
              <TableRow key={doc.id}>
                <TableCell>
                  <Checkbox
                    checked={selected.includes(doc.id)}
                    onCheckedChange={() => toggleOne(doc.id)}
                    aria-label="Выбрать строку"
                  />
                </TableCell>
                <TableCell>{doc.name}</TableCell>
                <TableCell>{doc.date}</TableCell>
                <TableCell>{doc.type}</TableCell>
                <TableCell>{doc.format}</TableCell>
                <TableCell>
                  <span className={statusColorMap[doc.statusColor]}>
                    {doc.status}
                  </span>
                </TableCell>
                <TableCell>
                  <MyButton
                    variant="outline"
                    size="small"
                    className="text-sm p-1.5"
                  >
                    {doc.action}
                  </MyButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Page;
