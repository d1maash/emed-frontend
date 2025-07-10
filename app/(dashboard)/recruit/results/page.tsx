import MyButton from "@/components/myui/MyButton";
import AccordionList from "../_components/AccordionList";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

const resultsData = [
  {
    id: 1,
    date: "20 мая 2025",
    doctor: "Терапевт (Первичный осмотр)",
    result: "Удовлетворительно",
    status: "Не просмотрено",
    statusColor: "bg-[#FF5A5A] text-white",
    details: {
      date: "15 Апреля , 2025",
      procedure: "ЭКГ + первичный осмотр",
      result: "Не выявлено нарушений",
      comment:
        "Сердечный ритм в пределах нормы. Жалоб на момент осмотра не предъявлял. Дополнительные обследования не требуются.",
    },
  },
  {
    id: 2,
    date: "15 апреля 2025",
    doctor: "Кардиолог (ЭКГ + осмотр)",
    result: "Не выявлено нарушений",
    status: "Просмотрено",
    statusColor: "bg-[#2AD97F] text-white",
    details: {
      date: "15 Апреля , 2025",
      procedure: "ЭКГ + первичный осмотр",
      result: "Не выявлено нарушений",
      comment:
        "Сердечный ритм в пределах нормы. Жалоб на момент осмотра не предъявлял. Дополнительные обследования не требуются.",
    },
  },
  {
    id: 3,
    date: "02 июня 2025",
    doctor: "Хирург (Плановый осмотр)",
    result: "Жалоб нет, в пределах нормы",
    status: "Просмотрено",
    statusColor: "bg-[#2AD97F] text-white",
    details: {
      date: "15 Апреля , 2025",
      procedure: "ЭКГ + первичный осмотр",
      result: "Не выявлено нарушений",
      comment:
        "Сердечный ритм в пределах нормы. Жалоб на момент осмотра не предъявлял. Дополнительные обследования не требуются.",
    },
  },
  {
    id: 4,
    date: "10 июня 2025",
    doctor: "Анализ крови (общий)",
    result: "Показатели в норме",
    status: "Просмотрено",
    statusColor: "bg-[#2AD97F] text-white",
    details: {
      date: "15 Апреля , 2025",
      procedure: "ЭКГ + первичный осмотр",
      result: "Не выявлено нарушений",
      comment:
        "Сердечный ритм в пределах нормы. Жалоб на момент осмотра не предъявлял. Дополнительные обследования не требуются.",
    },
  },
];

const page = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2 grid grid-cols-1 gap-4">
        <Accordion
          type="multiple"
          className="w-full flex flex-col gap-3"
          defaultValue={["item-2"]}
        >
          {resultsData.map((item) => (
            <AccordionItem
              className="bg-[#F4F6FF] rounded-xl px-2 border border-[#B3D1FF]"
              value={`item-${item.id}`}
              key={item.id}
            >
              {item.details ? (
                <AccordionTrigger className="flex items-center justify-between gap-2 py-3 text-[--primary-90] text-base font-semibold">
                  <div className="flex items-center gap-2 text-black font-bold text-sm">
                    <span className="size-2 aspect-square rounded-full bg-[--primary-60] inline-block mr-2" />
                    <span>
                      {item.date} – {item.doctor} – {item.result}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 ml-auto">
                    <Badge
                      className={`px-3 py-1 text-xs font-medium rounded-full ${item.statusColor}`}
                    >
                      {item.status}
                    </Badge>
                  </div>
                </AccordionTrigger>
              ) : (
                <div className="flex items-center justify-between gap-2 py-3 text-[--primary-90] text-base font-semibold cursor-default select-none">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[#3A7BFF] inline-block mr-2" />
                    <span>
                      {item.date} – {item.doctor} – {item.result}
                    </span>
                  </div>
                  <Badge
                    className={`ml-2 px-3 py-1 text-xs font-medium rounded-full ${item.statusColor}`}
                  >
                    {item.status}
                  </Badge>
                </div>
              )}
              {item.details && (
                <AccordionContent className="bg-white rounded-xl my-2 p-4 border border-[#B3D1FF]">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-2">
                    <div>
                      <div className="text-xs text-gray-400 font-semibold mb-0.5">
                        Дата:
                      </div>
                      <div className="text-sm font-medium">
                        {item.details.date}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-400 font-semibold mb-0.5">
                        Процедура:
                      </div>
                      <div className="text-sm font-medium">
                        {item.details.procedure}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-400 font-semibold mb-0.5">
                        Результат:
                      </div>
                      <div className="text-sm font-medium">
                        {item.details.result}
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-400 font-semibold mb-0.5">
                    Комментарий врача:
                  </div>
                  <div className="text-xs font-normal mb-2">
                    {item.details.comment}
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2 mt-1">
                    <MyButton
                      variant="link"
                      className="text-[#3A7BFF] p-0 h-auto min-h-0 text-xs"
                    >
                      Задать вопрос врачу
                    </MyButton>
                    <MyButton
                      variant="link"
                      className="text-[#3A7BFF] p-0 h-auto min-h-0 text-xs"
                    >
                      Запросить повторное обследование
                    </MyButton>
                    <MyButton
                      variant="link"
                      className="text-[#3A7BFF] p-0 h-auto min-h-0 text-xs"
                    >
                      Открыть PDF-отчет
                    </MyButton>
                  </div>
                </AccordionContent>
              )}
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      <div className="flex gap-1">
        <Separator
          orientation="vertical"
          className="hidden sm:block mx-5 h-full w-0.5 rounded-xl"
        />
        <AccordionList />
      </div>
    </div>
  );
};

export default page;
