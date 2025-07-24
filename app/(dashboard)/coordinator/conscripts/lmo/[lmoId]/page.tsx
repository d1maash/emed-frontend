"use client";

import LoadingScreen from "@/components/LoadingScreen";
import MyButton from "@/components/myui/MyButton";
import {
  Accordion,
  AccordionTrigger,
  AccordionItem,
  AccordionContent,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  getApplicationByConscript,
  getLMOByConscript,
  getLMOById,
  sendToMedical,
} from "@/store/slices/applicationSlice";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Page = () => {
  const { lmoId } = useParams<{ lmoId: string }>();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const access = useAppSelector((state) => state.auth.access);
  const {
    currentLMO,
    currentApplication,
    loading,
    error,
    sendingToMedical,
    sentToMedical,
  } = useAppSelector((state) => state.application);

  useEffect(() => {
    if (!lmoId || !access) return;

    (async () => {
      try {
        // Получаем LMO
        const newLMO = await dispatch(
          getLMOById({ lmoId: parseInt(lmoId), access })
        ).unwrap();
        if (!newLMO) {
          router.replace("/coordinator/conscripts/lmo");
          return;
        }

        console.log(newLMO);
        // Получаем Application
        await dispatch(
          getApplicationByConscript({
            search: newLMO!.conscript.iin,
            access,
          })
        ).unwrap();
      } catch {
        router.replace("/coordinator/conscripts/lmo");
      }
    })();
  }, [lmoId, access, dispatch, router]);

  const handleSendToMedical = async () => {
    if (!currentApplication?.id || !access) return;

    try {
      await dispatch(
        sendToMedical({ applicationId: currentApplication.id, access })
      ).unwrap();
      // TODO: sent to medical notification
    } catch {
      // TODO: did not sent to medical notification
    }
  };

  if (loading) return <LoadingScreen />;
  if (error) return <div className="p-6 text-red-600">Ошибка: {error}</div>;
  if (!currentLMO) return <div className="p-6">ЛМО не найден</div>;

  const user = currentLMO.conscript;

  return (
    <div className="p-6 max-w-5xl mx-auto flex flex-col gap-6">
      {/* Информация о призывнике и LMO */}
      <Card>
        <CardHeader>
          <CardTitle>
            {user.full_name} #{user.id}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>ИИН: {user.iin}</p>
          <p>Рост: {user.height} см</p>
          <p>Вес: {user.weight} кг</p>
          <p>ИМТ: {user.bmi}</p>

          <Separator className="my-4" />

          <h3 className="mb-2 font-semibold text-lg">Осмотры врачей</h3>
          {currentLMO.doctor_queue?.length === 0 ? (
            <p>Осмотры не найдены</p>
          ) : (
            <Accordion type="multiple">
              {currentLMO.doctor_queue?.map((dq) => (
                <AccordionItem key={dq.id} value={dq.id.toString()}>
                  <AccordionTrigger>{dq.specialty.name}</AccordionTrigger>
                  <AccordionContent>
                    <p>Завершено: {dq.is_completed ? "Да" : "Нет"}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </CardContent>
        <CardFooter className="flex gap-3">
          <MyButton
            onClick={handleSendToMedical}
            disabled={!currentApplication || sendingToMedical || sentToMedical}
          >
            {sendingToMedical ? "Отправка..." : "Отправить на медосмотр"}
          </MyButton>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Page;
