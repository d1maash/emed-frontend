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
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { Banner } from "@/components/myui/Banner";
import Textarea from "@/components/myui/MyTextarea";
import DownloadList from "./_component/DownloadList";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getCommissionHearingDetailById } from "@/store/slices/commissionHearingSlice";
import LoadingScreen from "@/components/LoadingScreen";

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
  const router = useRouter();
  const params = useSearchParams();
  const dispatch = useAppDispatch();
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

  const [hearingID, setHearingID] = useState("");

  const access = useAppSelector((state) => state.auth.access);
  const user = useAppSelector((state) => state.auth.user);
  const {
    currentHearing = null,
    loading = false,
    error = null,
  } = useAppSelector((state) => state.commissionHearing || {});
  useEffect(() => {
    const id = params.get("id");
    if (id && user && user.role === "commission" && !currentHearing && access) {
      setHearingID(id);
      dispatch(getCommissionHearingDetailById({ access, HearingId: id }));
    }
  }, [user, params, access, dispatch]);

  const handleCheckbox = (field: DecisionField) => {
    setValue("fit", field === "fit");
    setValue("unfit", field === "unfit");
    setValue("defer", field === "defer");
  };

  const onSubmit = (data: FormData) => {
    // Логика сохранения решения
    alert("Решение сохранено");
  };

  //   TODO: Delete on Prod
  const id = "404 404 404 404";
  const isLegal = true;
  //

  const NCALayerStatus = "warning";

  if (!id) {
    return (
      <div className="flex flex-col gap-4 text-center ">
        <h2 className="text-xl sm:text-2xl font-medium">
          <div className="font-bold text-2xl sm:text-3xl">{id}</div>
          Слушанее с таким ID не найдено.
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

  if (loading || !user) return <LoadingScreen />;
  if (!currentHearing) return <div className="p-6">Слушанее не найдено</div>;
  return (
    <>
      <div className="border border-[--primary-30] rounded-xl min-h-12 p-4 gap-4 2xl:p-8 2xl:gap-8 grid xl:grid-cols-3">
        <div
          className={cn(
            "xl:col-span-2 p-6 rounded-xl border min-h-max bg-white",
            currentHearing.decision == "fit" && "border-[--success] border-2",
            currentHearing.decision == "unfit" && "border-[--error] border-2",
            currentHearing.decision == "defer" && "border-[--warning] border-2"
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
              <p className="text-base">Рост: {currentHearing.lmo.height} см</p>
              <p className="text-base">Вес: {currentHearing.lmo.weight} кг</p>
              <p className="text-base">ИМТ: {currentHearing.lmo.bmi}</p>
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
            {currentHearing.lmo.medical_records.length == 0 ? (
              <div>Осмотры не найдены</div>
            ) : (
              <div className="flex flex-col">
                {/* Doctors List */}
                <Accordion type="multiple">
                  {currentHearing.lmo.medical_records.map((mr) => (
                    <AccordionItem key={mr.id} value={mr.doctor.full_name}>
                      <AccordionTrigger className="flex justify-between py-2">
                        <h4 className="text-base font-medium">
                          {mr.doctor.specialty}
                        </h4>
                      </AccordionTrigger>
                      <AccordionContent className="flex flex-col">
                        <p>Врач: {mr.doctor.full_name}</p>
                        <p>Осмотр: {mr.examination_date}</p>
                        <p>Заключение: {mr.diagnosis}</p>
                        <p>Рекомендация: {mr.recommendations}</p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            )}
            {/* <DownloadList files={files} /> */}
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
      {/* Pagination i guess */}
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
