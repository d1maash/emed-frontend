import MyButton from "@/components/myui/MyButton";
import { Separator } from "@/components/ui/separator";
import AccordionList from "../_components/AccordionList";

const page = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="md:col-span-2">
        <h1 className="text-4xl font-bold ">Остались вопросы?</h1>
        <p className="text-sm text-[#9C9C9C] mt-5">
          Мы стараемся сделать процесс прохождения медосмотра простым и
          понятным. Если у вас возникли трудности, остались неясности или нужна
          помощь — не переживайте, мы рядом! Наши специалисты с радостью ответят
          на все ваши вопросы и подскажут, как действовать дальше.Нажмите на
          кнопку ниже, чтобы связаться с нами. Мы ответим как можно быстрее!
        </p>
        <MyButton variant="filled" className="mt-5">
          Связаться с нами
        </MyButton>
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
