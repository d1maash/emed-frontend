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
  getLMOById,
  sendToMedical,
  assignDoctorThunk,
  clearApplication,
} from "@/store/slices/applicationSlice";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { DoctorList } from "@/types/user";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { GetDoctorsBySpecialityID } from "@/api/doctors";

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
    assignedDoctorsStatus,
  } = useAppSelector((state) => state.application);

  const [doctorsBySpecialty, setDoctorsBySpecialty] = useState<
    Record<number, DoctorList[]>
  >({});
  const [selectedDoctors, setSelectedDoctors] = useState<
    Record<number, number | null>
  >({});
  const [openedItems, setOpenedItems] = useState<string[]>([]);

  // Синхронизация выбранных докторов при загрузке currentLMO
  useEffect(() => {
    if (currentLMO?.doctor_queue) {
      const initSelected: Record<number, number | null> = {};
      currentLMO.doctor_queue.forEach((dq) => {
        initSelected[dq.id] = dq.assigned_doctor?.id ?? null;
      });
      setSelectedDoctors(initSelected);
    }
  }, [currentLMO?.doctor_queue]);

  useEffect(() => {
    if (!lmoId || !access) return;

    (async () => {
      try {
        dispatch(clearApplication()); // Очистить предыдущее состояние

        const newLMO = await dispatch(
          getLMOById({ lmoId: parseInt(lmoId), access })
        ).unwrap();

        if (!newLMO) {
          router.replace("/coordinator/conscripts/lmo");
          return;
        }

        await dispatch(
          getApplicationByConscript({
            search: newLMO.conscript.iin,
            access,
          })
        ).unwrap();
      } catch {
        router.replace("/coordinator/conscripts/lmo");
      }
    })();
  }, [lmoId, access, dispatch, router]);

  const loadDoctors = async (specialtyId: number) => {
    if (!access) return;
    if (doctorsBySpecialty[specialtyId]) return; // Уже загружены

    try {
      const doctors = await GetDoctorsBySpecialityID(specialtyId, access);
      setDoctorsBySpecialty((prev) => ({ ...prev, [specialtyId]: doctors }));
    } catch (e) {
      console.error("Ошибка загрузки докторов", e);
    }
  };

  const onAccordionChange = (openItems: string[]) => {
    setOpenedItems(openItems);

    openItems.forEach((idStr) => {
      const dq = currentLMO?.doctor_queue.find(
        (dq) => dq.id.toString() === idStr
      );
      if (dq) loadDoctors(dq.specialty.id);
    });
  };

  const onSelectDoctor = (doctorQueueId: number, doctorId: number | null) => {
    setSelectedDoctors((prev) => ({
      ...prev,
      [doctorQueueId]: doctorId,
    }));
  };

  const handleAssignDoctor = (
    doctorQueueId: number,
    doctorId: number | null
  ) => {
    if (!doctorId || !currentLMO || !access) return;

    dispatch(
      assignDoctorThunk({
        lmoId: currentLMO.id,
        doctorId,
        queueId: doctorQueueId,
        access,
      })
    );
  };

  const handleSendToMedical = async () => {
    if (!currentApplication?.id || !access) return;

    try {
      await dispatch(
        sendToMedical({ applicationId: currentApplication.id, access })
      ).unwrap();
      // TODO: уведомление успешной отправки
    } catch {
      // TODO: уведомление об ошибке
    }
  };

  if (loading) return <LoadingScreen />;
  if (error) return <div className="p-6 text-red-600">Ошибка: {error}</div>;
  if (!currentLMO) return <div className="p-6">ЛМО не найден</div>;

  const user = currentLMO.conscript;

  return (
    <div className="p-6 max-w-5xl mx-auto flex flex-col gap-6">
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

          {Array.isArray(currentLMO.doctor_queue) &&
          currentLMO.doctor_queue.length > 0 ? (
            <Accordion
              type="multiple"
              value={openedItems}
              onValueChange={onAccordionChange}
            >
              {currentLMO.doctor_queue.map((dq) => {
                const selectedDoctorId = selectedDoctors[dq.id];
                const doctorName =
                  (selectedDoctorId &&
                    doctorsBySpecialty[dq.specialty.id]?.find(
                      (doc) => doc.id === selectedDoctorId
                    )?.full_name) ||
                  dq.assigned_doctor_name ||
                  "не назначен";

                const assignStatus = assignedDoctorsStatus[dq.id] || {
                  loading: false,
                  error: null,
                };

                return (
                  <AccordionItem key={dq.id} value={dq.id.toString()}>
                    <AccordionTrigger>{dq.specialty.name}</AccordionTrigger>
                    <AccordionContent>
                      <div className="flex justify-between items-center gap-4 flex-wrap">
                        <div>
                          <p>Завершено: {dq.is_completed ? "Да" : "Нет"}</p>
                          <p>Порядок: {dq.order}</p>
                        </div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <p>Доктор: {doctorName}</p>
                          {openedItems.includes(dq.id.toString()) && (
                            <>
                              {!doctorsBySpecialty[dq.specialty.id] ? (
                                <p className="italic text-gray-500">
                                  Загрузка...
                                </p>
                              ) : (
                                <>
                                  <Select
                                    value={
                                      selectedDoctorId !== undefined &&
                                      selectedDoctorId !== null
                                        ? selectedDoctorId.toString()
                                        : "none"
                                    }
                                    onValueChange={(value) => {
                                      if (value === "none") {
                                        onSelectDoctor(dq.id, null);
                                      } else {
                                        onSelectDoctor(dq.id, Number(value));
                                      }
                                    }}
                                  >
                                    <SelectTrigger className="w-52">
                                      <SelectValue placeholder="Выберите доктора" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="none">
                                        Не назначен
                                      </SelectItem>
                                      {doctorsBySpecialty[dq.specialty.id].map(
                                        (doctor) => (
                                          <SelectItem
                                            key={doctor.id}
                                            value={doctor.id.toString()}
                                          >
                                            {doctor.full_name}
                                          </SelectItem>
                                        )
                                      )}
                                    </SelectContent>
                                  </Select>

                                  <MyButton
                                    onClick={() =>
                                      handleAssignDoctor(
                                        dq.id,
                                        selectedDoctors[dq.id] ?? null
                                      )
                                    }
                                    disabled={
                                      assignStatus.loading ||
                                      !selectedDoctors[dq.id]
                                    }
                                  >
                                    {assignStatus.loading
                                      ? "Назначаю..."
                                      : "Назначить"}
                                  </MyButton>

                                  {assignStatus.error && (
                                    <p className="text-sm text-red-600">
                                      {assignStatus.error}
                                    </p>
                                  )}
                                </>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          ) : (
            <p>Осмотры не найдены</p>
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
