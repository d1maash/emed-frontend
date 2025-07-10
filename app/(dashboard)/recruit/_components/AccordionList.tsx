import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

const accordionData = [
  {
    title: "Как изменить дату приёма?",
    content:
      "В разделе 'График приёма' выберите нужный этап и нажмите 'Изменить'.",
  },
  {
    title: "Что делать, если пропустил этап?",
    content: "Обратитесь к куратору для уточнения дальнейших действий.",
  },
  {
    title: "Как загрузить документы?",
    content: "Перейдите в раздел загрузки документов и следуйте инструкциям.",
  },
  {
    title: "Куда обратиться по вопросам?",
    content: "Свяжитесь с поддержкой или куратором через контактную форму.",
  },
  {
    title: "Что делать, если нет справки от терапевта?",
    content: "Обратитесь в медицинское учреждение для получения справки.",
  },
  {
    title: "Что такое E-med?",
    content: "E-med — это электронная система для прохождения медосмотра.",
  },
  {
    title: "Какие документы нужны?",
    content: "Паспорт, результаты анализов и другие необходимые документы.",
  },
];

const AccordionList = () => {
  return (
    <Accordion
      type="single"
      collapsible
      defaultValue="item-1"
      className="w-full flex flex-col gap-5"
    >
      {accordionData.map((item, idx) => (
        <AccordionItem
          className="bg-[#F4F6FF] rounded-xl px-3"
          value={`item-${idx + 1}`}
          key={item.title}
        >
          <AccordionTrigger className="text-[--primary-90]">
            {item.title}
          </AccordionTrigger>
          <AccordionContent>{item.content}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default AccordionList;
