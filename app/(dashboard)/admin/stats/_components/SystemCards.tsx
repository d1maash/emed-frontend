import SystemCard, { SystemCardProps } from "./SystemCard";
import { cn } from "@/lib/utils";

const systemCardData: SystemCardProps[] = [
  {
    title: "2 дн. 4 ч.",
    icon: "/icons/clock.svg",
    description: "Среднее время прохождения медосмотра",
  },
  {
    title: "21 ошибка",
    icon: "/icons/exclamation.svg",
    description: "Количество системных ошибок",
  },
  {
    title: "55 отмен",
    icon: "/icons/x-circle.svg",
    description: "Количество отмененных/ отклоненных направлений",
  },
  {
    title: "55 истекли",
    icon: "/icons/document-duplicate.svg",
    description: "Количество истекших сертификатов",
  },
];

const SystemCards = () => {
  return (
    <div
      className={cn(
        "flex flex-col @[500px]:flex-row @[1000px]:grid grid-cols-4 overflow-x-auto gap-4 mt-4"
      )}
    >
      {systemCardData.map((card) => (
        <SystemCard key={card.description} {...card} />
      ))}
    </div>
  );
};

export default SystemCards;
