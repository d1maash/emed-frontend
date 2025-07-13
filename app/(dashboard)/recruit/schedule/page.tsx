import {
  AccordionContent,
  Accordion,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Settings2 } from "lucide-react";
import Image from "next/image";

const scheduleData = [
  {
    id: 1,
    date: "20 июля 2025",
    time: "9:20 - 11:00",
    doctor: "Терапевт",
    status: "Ожидает",
    address: "",
    statusColor: "bg-[--primary-60] text-white",
    description: "Повторный прием по результатам анализов",
  },
  {
    id: 2,
    date: "20 июля 2025",
    time: "11:00 - 12:20",
    doctor: "Трехолог",
    status: "Ожидает",
    address: "",
    statusColor: "bg-[--primary-60] text-white",
    description: "Повторный прием по результатам анализов",
  },
  {
    id: 3,
    date: "21 июля 2025",
    time: "9:20 - 11:00",
    doctor: "Кардиолог",
    status: "Ожидает",
    address: "",
    statusColor: "bg-[--primary-60] text-white",
    description: "Повторный прием по результатам анализов",
  },
];

const RecruitSchedulePage = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 grid grid-cols-1 gap-4">
        {scheduleData.length == 0 && (
          <div className="text-2xl font-semibold">
            Здесь будут приемы назначенные вам докторами.
          </div>
        )}
        <Accordion
          type="multiple"
          className="w-full flex flex-col gap-3"
          defaultValue={["item-1"]}
        >
          {scheduleData.map((item) => (
            <AccordionItem
              className="bg-[#F4F6FF] rounded-xl px-2 pb-2 border border-[#B3D1FF]"
              value={`item-${item.id}`}
              key={item.id}
            >
              <AccordionTrigger className="flex items-center justify-between gap-2 py-3 text-[--primary-90] text-base font-semibold">
                <div className="flex items-center gap-2 text-black font-bold text-sm">
                  <span className="size-2 aspect-square rounded-full bg-[--primary-60] inline-block mr-2" />
                  <span>
                    {item.date} – {item.doctor}
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
              <AccordionContent className="w-full border border-[#B3D1FF] p-4 rounded-xl bg-white grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="text-xs text-gray-400 font-semibold mb-0.5">
                  Описание:
                  <div className="text-sm font-medium text-black">
                    {item.description}
                  </div>
                </div>
                <div className="text-xs text-gray-400 font-semibold mb-0.5">
                  Время приема:
                  <div className="text-sm font-medium text-black">
                    {item.time}
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <div className="flex flex-col gap-4 w-full lg:max-w-[400px]">
        <div className="flex justify-between gap-4 max-h-20">
          <div className="bg-[--primary-60] w-4/5 p-3 rounded-xl flex justify-start gap-3">
            <div className="aspect-square h-full">
              <Image
                src={"/ava.jpg"}
                alt=""
                width={50}
                height={50}
                className="rounded-full object-cover bg-white w-full h-full aspect-square"
              />
            </div>
            <div className="flex flex-col gap-1 text-white">
              <h4 className="text-sm font-semibold">Иван Иванович</h4>
              <p className="text-xs">ИИН: 070230517010</p>
              <p className="text-xs">Возраст: 18</p>
            </div>
          </div>
          <div className="bg-[--primary-60] sm:w-16 lg:w-20 p-2 aspect-square rounded-xl">
            <Settings2 className="w-full h-full text-white" />
          </div>
        </div>

        <div>
          <Calendar
            mode="multiple"
            selected={[new Date()]}
            // onSelect={setDate}
            className="w-full max-w-[320px] sm:max-w-[350px] md:max-w-[380px] lg:max-w-[400px] mx-auto p-2 sm:p-3 md:p-4 lg:p-6 bg-[--primary-60] rounded-2xl text-white [&_[data-selected-single=true]]:bg-white [&_[data-selected-single=true]]:text-[--primary-60] [&_[data-selected-single=true]]:hover:bg-white [&_[data-selected-single=true]]:hover:text-[--primary-60]"
            classNames={{
              weekday:
                "text-white text-[0.8rem] font-normal flex-1 select-none rounded-md",
              caption_label: "text-white font-medium",
              nav_button: "text-white hover:text-white/80",
            }}
          />
        </div>

        <div className="p-4 w-full bg-[--primary-60] rounded-xl text-white flex flex-col gap-1">
          <h4 className="text-2xl font-semibold">Важно знать:</h4>
          <p className="text-sm">
            Если категория годности не указана, система не сможет сформировать
            справку автоматически.
          </p>
          <Image
            src={"/illustrations/doctor-gives-medical-document-clinic.png"}
            alt=""
            width={300}
            height={145}
            className="w-full rounded-xl"
          />
        </div>
      </div>
    </div>
  );
};

export default RecruitSchedulePage;
