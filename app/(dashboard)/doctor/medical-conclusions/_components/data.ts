import { MedicalConclusion } from "./types";

export const medicalConclusions: MedicalConclusion[] = [
  {
    fullname: "Айдос Амянов",
    examDate: "15.06.2025",
    examType: "Первичный",
    category: "А",
    comment: "Жалоб нет, состояние хорошее",
    file: "PDF",
    status: "Подписано",
    action: "Просмотр",
  },
  {
    fullname: "Диас Болат",
    examDate: "14.06.2025",
    examType: "Повторный",
    category: "Б",
    comment: "Повторное обследование",
    file: "Нетy",
    status: "В ожидании",
    action: "Редактировать",
  },
  {
    fullname: "Руслан Жанарысов",
    examDate: "13.06.2025",
    examType: "Первичный",
    category: "Г",
    comment: "Отправлен на дополнительный анализ",
    file: "Нетy",
    status: "Отклонено",
    action: "Удалить",
  },
  {
    fullname: "Бекболат Шайзада",
    examDate: "10.06.2025",
    examType: "Финальный",
    category: "В",
    comment: "Жалуется на головные боли",
    file: "PDF",
    status: "Требует подписи",
    action: "Подписать",
  },
];
