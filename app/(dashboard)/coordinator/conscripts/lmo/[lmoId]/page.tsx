"use client";

import LoadingScreen from "@/components/LoadingScreen";
import MyButton from "@/components/myui/MyButton";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
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
  getApplicationById,
  getApplicationList,
  sendToMedical,
} from "@/store/slices/applicationSlice";
import {
  getLMOById,
  assignDoctorThunk,
  clearLMO,
  clearError as clearLMOError,
} from "@/store/slices/lmoSlice";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState, useCallback } from "react";
import { DoctorList } from "@/types/user";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { getDoctorsBySpecialityID } from "@/api/doctors";
import { cn } from "@/lib/utils";

const Page = () => {
  const { lmoId } = useParams<{ lmoId: string }>();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const access = useAppSelector((state) => state.auth.access);
  const {
    currentLMO,
    loading: lmoLoading,
    error: lmoError,
    assignedDoctorsStatus,
  } = useAppSelector((state) => state.lmo);

  const {
    applicationList,
    loading: appLoading,
    error: appError,
    sendingToMedical,
    sentToMedical,
  } = useAppSelector((state) => state.application);

  const [doctorsBySpecialty, setDoctorsBySpecialty] = useState<
    Record<number, DoctorList[]>
  >({});
  const [selectedDoctors, setSelectedDoctors] = useState<
    Record<number, number | null>
  >({});
  const [openedItems, setOpenedItems] = useState<string[]>([]);

  // Инициализация выбранных докторов при загрузке currentLMO
  useEffect(() => {
    if (currentLMO?.doctor_queue) {
      const initialSelected: Record<number, number | null> = {};
      currentLMO.doctor_queue.forEach((dq) => {
        initialSelected[dq.id] = dq.assigned_doctor?.id ?? null;
      });
      setSelectedDoctors(initialSelected);
    }
  }, [currentLMO?.doctor_queue]);

  // Загрузка LMO и application при изменении lmoId или access
  useEffect(() => {
    if (!lmoId || !access) return;

    (async () => {
      try {
        dispatch(clearLMO());
        dispatch(clearLMOError());

        const lmo = await dispatch(
          getLMOById({ lmoId: Number(lmoId), access })
        ).unwrap();

        if (!lmo) {
          router.replace("/coordinator/conscripts/lmo");
          return;
        }

        await dispatch(
          getApplicationList({ search: lmo.conscript.iin, access })
        ).unwrap();
      } catch {
        router.replace("/coordinator/conscripts/lmo");
      }
    })();
  }, [lmoId, access, dispatch, router]);

  const loadDoctors = useCallback(
    async (specialtyId: number) => {
      if (!access || doctorsBySpecialty[specialtyId]) return;
      try {
        const doctors = await getDoctorsBySpecialityID(specialtyId, access);
        setDoctorsBySpecialty((prev) => ({ ...prev, [specialtyId]: doctors }));
      } catch (error) {
        console.error("Ошибка загрузки докторов", error);
      }
    },
    [access, doctorsBySpecialty]
  );

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
    if (!applicationList?.[0]?.id || !access) return;

    try {
      await dispatch(
        sendToMedical({ applicationId: applicationList?.[0]?.id, access })
      ).unwrap();
      // TODO: notify success
    } catch {
      // TODO: notify error
    }
  };

  if (lmoLoading || appLoading) return <LoadingScreen />;
  if (lmoError || appError)
    return (
      <div className="p-6 text-red-600">
        Ошибка: {lmoError ?? appError ?? "Неизвестная ошибка"}
      </div>
    );
  if (!currentLMO) return <div className="p-6">ЛМО не найден</div>;

  const user = currentLMO.conscript;

  return (
    <div className="p-6 max-w-5xl mx-auto flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <div className="text-2xl">
              {user.full_name} #{user.id}
            </div>
            {applicationList?.[0].status == "submitted" && (
              <p className="rounded-xl border py-4 px-6">
                Отправлен на медосмотр
              </p>
            )}
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
                      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 flex-wrap">
                        <div>
                          <p>Завершено: {dq.is_completed ? "Да" : "Нет"}</p>
                          <p>Порядок: {dq.order}</p>
                        </div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <p>Доктор:</p>

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
                                      onSelectDoctor(
                                        dq.id,
                                        value === "none" ? null : Number(value)
                                      );
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
        <CardFooter
          className={cn(
            "flex justify-between",
            applicationList?.[0].status !== "draft" && "hidden"
          )}
        >
          <MyButton
            onClick={handleSendToMedical}
            disabled={
              !applicationList?.[0] || sendingToMedical || sentToMedical
            }
          >
            {sendingToMedical ? "Отправка..." : "Отправить на медосмотр"}
          </MyButton>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Page;
