"use client";
import MyButton from "@/components/myui/MyButton";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/Button";
import MyInput from "@/components/myui/MyInput";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft, ChevronRight, Printer, Weight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { Banner } from "@/components/myui/Banner";
import Textarea from "@/components/myui/MyTextarea";

const schema = z.object({
  fit: z.boolean(),
  unfit: z.boolean(),
  defer: z.boolean(),
  name: z.string().min(1, "Имя обязательно"),
  comment: z.string().min(1, "Комментарий обязателен"),
});

type FormData = z.infer<typeof schema>;

type DecisionField = "fit" | "unfit" | "defer";

const CommissionCasePage = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      fit: false,
      unfit: false,
      defer: false,
      name: "",
      comment: "",
    },
  });

  const handleCheckbox = (field: DecisionField) => {
    setValue("fit", field === "fit");
    setValue("unfit", field === "unfit");
    setValue("defer", field === "defer");
  };

  const onSubmit = (data: FormData) => {
    // Логика сохранения решения
    alert("Решение сохранено");
  };

  const router = useRouter();
  const params = useSearchParams();

  //   TODO: Delete on Prod
  const id = "404 404 404 404";
  const isLegal = true;
  //

  const NCALayerStatus = "warning";

  const user = {
    id: "25541213",
    full_name: "Иванович Иван Иванов",
    iin: "070707777777",
    height: "181",
    weight: "72",
    bmi: "22",
    decision: "defer",
    doctors: [
      {
        id: "123",
        speciality: "Хирург",
        full_name: "Макс Максимов",
        examination:
          "Проведен осмотр операционной раны, признаки воспаления отсутствуют.",
        complaints: "Боль в области послеоперационного шва.",
        conclusion: "Состояние после аппендэктомии, заживление без осложнений.",
        recommendation:
          "Продолжить обработку шва, избегать физических нагрузок 7 дней.",
        comment: "Контрольный осмотр через 3 дня.",
      },
      {
        id: "122",
        speciality: "Кардиолог",
        full_name: "Настя Ивлеева",
        examination:
          "Аускультация сердца — ритм правильный, шумов нет, давление 120/80.",
        complaints:
          "Периодические боли в области сердца, учащенное сердцебиение.",
        conclusion: "Признаков ишемической болезни сердца не выявлено.",
        recommendation:
          "Соблюдать режим труда и отдыха, ограничить стресс, повторная ЭКГ через месяц.",
        comment: "Рекомендовано наблюдение у терапевта.",
      },
      {
        id: "124",
        speciality: "Терапевт",
        full_name: "Ольга Петрова",
        examination:
          "Температура 37.5°C, горло гиперемировано, миндалины увеличены.",
        complaints: "Боль в горле, слабость, температура.",
        conclusion: "Острый тонзиллит.",
        recommendation:
          "Постельный режим, обильное питье, полоскание горла, жаропонижающее при необходимости.",
        comment: "Повторный осмотр при ухудшении состояния.",
      },
      {
        id: "125",
        speciality: "Невролог",
        full_name: "Артём Сидоров",
        examination: "Неврологический статус без очаговой симптоматики.",
        complaints: "Головные боли, головокружение.",
        conclusion: "Мигрень, обострение.",
        recommendation:
          "Приём назначенных препаратов, избегать переутомления, консультация через 2 недели.",
        comment: "Рекомендовано ведение дневника головной боли.",
      },
    ],
  };

  if (!id || !isLegal) {
    return (
      <div className="flex flex-col gap-4 text-center ">
        <h2 className="text-xl sm:text-2xl font-medium">
          <div className="font-bold text-2xl sm:text-3xl">{id}</div>
          Призывник с таким ID не найден.
        </h2>
        <div className="grid md:grid-cols-2 gap-3">
          <MyButton
            className="w-full"
            onClick={() => {
              router.back();
            }}
          >
            Назад
          </MyButton>
          <Link href={"/commission"}>
            <MyButton variant={"outline"} className="w-full">
              На главную
            </MyButton>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="border border-[--primary-30] rounded-xl min-h-12 p-4 gap-4 2xl:p-8 2xl:gap-8 grid xl:grid-cols-3">
        <div
          className={cn(
            "xl:col-span-2 p-6 rounded-xl border min-h-max",
            user.decision == "fit" && "border-[--success] border-2",
            user.decision == "unfit" && "border-[--error] border-2",
            user.decision == "defer" && "border-[--warning] border-2"
          )}
        >
          <div className="flex gap-3">
            <div className="aspect-square rounded-full bg-gray-500">
              <Image src="" alt="profile picture" width={75} height={75} />
            </div>
            <div className="flex flex-col justify-center">
              <h3 className="flex text-lg sm:text-xl md:text-2xl font-semibold gap-3">
                {user.full_name}{" "}
                <span className="text-[--primary-90] font-medium">
                  #{user.id}
                </span>
              </h3>
              <p className="text-lg md:text-xl">{user.iin}</p>
            </div>
          </div>
          <div className="flex flex-col gap-1 mt-3">
            <h3 className="text-xl">Медицинская история</h3>
            <div>
              <Separator
                className="bg-[--primary-30] mb-1"
                orientation="horizontal"
              />
              <h3 className="text-muted-foreground font-medium mb-1">
                Общие данные
              </h3>
              <p className="text-base">Рост: {user.height} см</p>
              <p className="text-base">Вес: {user.weight} кг</p>
              <p className="text-base">ИМТ: {user.bmi}</p>
            </div>
            <div>
              <Separator
                className="bg-[--primary-30] mb-1"
                orientation="horizontal"
              />
              <h3 className="text-muted-foreground font-medium mb-1">
                Осмотры врачей
              </h3>
            </div>
            {user.doctors.length == 0 ? (
              <div>Осмотры не найдены</div>
            ) : (
              <div className="flex flex-col">
                {/* Doctors List */}
                <Accordion type="multiple">
                  {user.doctors.map((doctor) => (
                    <AccordionItem key={doctor.id} value={doctor.id}>
                      <AccordionTrigger className="flex justify-between py-2">
                        <h4 className="text-base font-medium">
                          {doctor.speciality}
                        </h4>
                      </AccordionTrigger>
                      <AccordionContent className="flex flex-col">
                        <p>Врач: {doctor.full_name}</p>
                        <p>Осмотр: {doctor.examination}</p>
                        <p>Жалобы: {doctor.complaints}</p>
                        <p>Заключение: {doctor.conclusion}</p>
                        <p>Рекомендация: {doctor.recommendation}</p>
                        <p>Комментарий: {doctor.comment}</p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-4">
          {/* Action Sidebar */}
          {/* <div className="border rounded-xl">SearchBar(idk)</div> */}
          <div className="border rounded-xl h-max p-6 flex flex-col gap-8 bg-white">
            <h2 className="text-xl">Решение</h2>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-6"
            >
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <Checkbox
                    checked={watch("fit")}
                    onCheckedChange={() => handleCheckbox("fit")}
                  />
                  Годен
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <Checkbox
                    checked={watch("unfit")}
                    onCheckedChange={() => handleCheckbox("unfit")}
                  />
                  Не годен
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <Checkbox
                    checked={watch("defer")}
                    onCheckedChange={() => handleCheckbox("defer")}
                  />
                  Отсрочка
                </label>
              </div>
              {(errors.fit || errors.unfit || errors.defer) && (
                <span className="text-red-500 text-xs">
                  Выберите одно решение
                </span>
              )}

              <MyInput
                type="text"
                placeholder="Имя Фамилия"
                {...register("name")}
                className="border rounded-md p-2 w-full"
                error={errors.name?.message}
              />

              <Textarea
                placeholder="Напишите комментарий…"
                {...register("comment")}
                className="border rounded-md p-2 w-full min-h-[60px]"
                error={errors.comment?.message}
              />

              <button
                type="submit"
                className="font-medium border border-[--primary-60] text-[--primary-60]  rounded-lg py-2 hover:bg-blue-50 transition"
              >
                Сохранить решение
              </button>

              <button
                type="button"
                className="font-medium border border-[--primary-60] text-[--primary-60]  rounded-lg py-2 hover:bg-blue-50 transition flex justify-center items-center gap-2"
                onClick={() => {}}
              >
                <Printer className="text-[--primary-90]" strokeWidth={1.5} />
                Распечатать протокол
              </button>

              <Banner variant={NCALayerStatus}>
                {NCALayerStatus == "warning" ? (
                  <div className="flex flex-col ">
                    <span>
                      Прежде чем подписать документ, убедитесь что программа
                      NCALayer запущена.
                    </span>
                    <a
                      href="https://pki.gov.kz/ncalayer/"
                      className="text-[--primary-60] underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Инструкция по запуску программы
                    </a>
                  </div>
                ) : NCALayerStatus == "success" ? (
                  <div>Программа NCALayer успешно запущена.</div>
                ) : (
                  <div className="flex flex-col ">
                    <span>
                      Ошибка при подключении, убедитесь что программа NCALayer
                      запущена и повторите попытку.
                    </span>
                    <a
                      href="https://pki.gov.kz/ncalayer/"
                      className="text-[--primary-60] underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Инструкция по запуску программы
                    </a>
                  </div>
                )}
              </Banner>

              <button
                type="button"
                className="font-medium border border-[--primary-60] text-[--primary-60] rounded-lg py-2 hover:bg-blue-50 transition"
              >
                Подписать
              </button>
            </form>
          </div>
        </div>
      </div>
      {/* Pages i guess */}
      <div className="flex justify-between mt-4">
        <Button
          variant="link"
          className="font-medium text-lg text-[--primary-90]"
        >
          <ChevronLeft size={24} />
          Назад
        </Button>
        <Button
          variant="link"
          className="font-medium text-lg text-[--primary-90]"
        >
          Следующий
          <ChevronRight size={24} />
        </Button>
      </div>
    </>
  );
};

export default CommissionCasePage;
