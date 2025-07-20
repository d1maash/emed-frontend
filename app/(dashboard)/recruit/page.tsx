"use client";

import MyButton from "@/components/myui/MyButton";
import AccordionList from "./_components/AccordionList";
import Stepper from "./_components/Stepper";
import { Separator } from "@/components/ui/separator";
import InfoCard from "./_components/InfoCard";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getRecruitDashboard } from "@/store/slices/recruitDashboardSlice";
import LoadingScreen from "@/components/LoadingScreen";

const Page = () => {
  const dispatch = useAppDispatch();
  const {
    data = null,
    loading = false,
    error = null,
  } = useAppSelector((state) => state.recruitDashboard || {});
  const access = useAppSelector((state) => state.auth.access);
  const user = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    if (user && user.role === "conscript" && !data && access) {
      dispatch(getRecruitDashboard(access));
    }
  }, [user, data, access, dispatch]);

  if (!user || user.role !== "conscript" || loading || !data)
    return <LoadingScreen />;
  if (error) return <div className="text-red-500">{error}</div>;

  const profile = data.profile;
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="md:col-span-2">
        <h1 className="text-4xl font-bold ">
          Здраствуйте , {profile?.full_name} !
        </h1>
        <div className="flex flex-wrap items-center gap-3 mt-2">
          <div className="flex items-center gap-2">
            <p className="text-sm sm:text-base font-medium">ИИН :</p>
            <p className="bg-[--primary-90] text-xs sm:text-sm font-medium py-1 px-3 rounded-xl text-white">
              {profile?.iin}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <p className="text-sm sm:text-base font-medium">Статус :</p>
            <p className="bg-[#FFD54D] text-xs sm:text-sm font-medium py-1 px-3 rounded-xl text-white">
              {profile?.fitness_status}
            </p>
          </div>
        </div>

        <p className="text-sm sm:text-base mt-5">
          Прогресс прохождения медосмотра : 3 из 7 этапов
        </p>

        <Stepper stepsCount={7} currentStep={4} />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-10">
          <MyButton variant="filled">Записаться на следующий этап</MyButton>
          <MyButton
            variant="outline"
            className="border-[--primary-60] text-[--primary-60]"
          >
            Узнать больше о следующем шаге
          </MyButton>
        </div>

        <MyButton
          variant="filled"
          className="w-full text-sm sm:text-base bg-[#B3D1FF] hover:bg-[#B3D1FF]/80 mt-10"
        >
          Не забудьте взять с собой паспорт и результаты анализов на следующий
          этап !
        </MyButton>

        <Separator
          orientation="horizontal"
          className="my-10 h-0.5 rounded-xl"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <InfoCard
            icon="bell"
            title="Уведомления"
            description="У вас есть важные напоминания и обновления по процессу."
            buttonText="Открыть уведомления"
            onClick={() => {}}
          />
          <InfoCard
            icon="phone"
            title="Контакт куратора"
            description="Если у вас возникли вопросы свяжитесь с вашим куратором. Он поможет по любому этапу."
            buttonText="Связаться"
            onClick={() => {}}
          />
          <InfoCard
            icon="arrow"
            title="Следующий шаг"
            description="Для продолжения процедуры, необходимо загрузить фотографию формата 3x4."
            buttonText="Загрузить фото"
            onClick={() => {}}
          />
        </div>
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

export default Page;
