"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import MyButton from "@/components/myui/MyButton";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/Input";

import { Search, FileText, Stethoscope } from "lucide-react";

import { useAppDispatch, useAppSelector } from "@/store/hooks";

import {
  clearError as clearSearchError,
  clearSearchResults,
  searchConscript,
} from "@/store/slices/searchSlice";

import {
  sendToMedical,
  clearApplication,
  getApplicationList,
} from "@/store/slices/applicationSlice";

import { getLMOList } from "@/store/slices/lmoSlice";

import { createApplicationWithLMOByCoordinator } from "@/store/thunks/createApplicationWithLMO";

import { z } from "zod";

const searchSchema = z.object({
  iin: z
    .string()
    .min(12, "ИИН должен содержать 12 цифр")
    .max(12, "ИИН должен содержать 12 цифр")
    .regex(/^\d+$/, "ИИН должен содержать только цифры"),
});

const ConscriptsQueuePage: React.FC = () => {
  const [search, setSearch] = useState("");
  const [validationError, setValidationError] = useState("");
  const [step, setStep] = useState<
    "search" | "found" | "application" | "medical"
  >("search");
  const [isInitialLoading, setIsInitialLoading] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();

  const {
    searchResults,
    loading: searchLoading,
    error: searchError,
  } = useAppSelector((state) => state.search);

  const { access } = useAppSelector((state) => state.auth);

  const {
    currentApplication,
    applicationList,
    loading: appLoading,
    error: appError,
    sendingToMedical,
  } = useAppSelector((state) => state.application);

  const {
    currentLMO,
    lmoList,
    loading: lmoLoading,
    error: lmoError,
  } = useAppSelector((state) => state.lmo);

  // Update URL query param ?iin=
  const updateSearchParams = useCallback(
    (iin: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (iin) {
        params.set("iin", iin);
      } else {
        params.delete("iin");
      }
      router.replace(`?${params.toString()}`);
    },
    [router, searchParams]
  );

  // Initial search on page load if ?iin= param present
  const handleInitialSearch = useCallback(
    async (iinValue: string) => {
      if (!access) return;

      setIsInitialLoading(true);

      try {
        searchSchema.parse({ iin: iinValue });
        setValidationError("");

        dispatch(clearSearchError());
        dispatch(clearApplication());
        dispatch(clearSearchResults());

        // Search conscript info (name, iin etc)
        const searchResult = await dispatch(
          searchConscript({ iin: iinValue, access })
        );

        if (searchConscript.fulfilled.match(searchResult)) {
          // Get application list (if any) for that iin
          const appResult = await dispatch(
            getApplicationList({ search: iinValue, access })
          );

          if (getApplicationList.fulfilled.match(appResult)) {
            const applications = appResult.payload;
            if (applications && applications.length > 0) {
              // application есть
              console.log("application found");
              const lmoResult = await dispatch(
                getLMOList({ search: iinValue, access })
              );
              if (getLMOList.fulfilled.match(lmoResult)) {
                const lmos = lmoResult.payload;
                if (lmos && lmos.length > 0) {
                  console.log("lmo found");
                  setStep("application");
                }
              }
            } else {
              setStep("found");
            }
          } else {
            setStep("found");
          }

          updateSearchParams(iinValue);
        }
      } catch (error) {
        if (error instanceof z.ZodError) {
          setValidationError(error.errors[0].message);
        }
      } finally {
        setIsInitialLoading(false);
      }
    },
    [access, dispatch, updateSearchParams]
  );

  useEffect(() => {
    const iinParam = searchParams.get("iin");
    if (iinParam && access) {
      setSearch(iinParam);
      handleInitialSearch(iinParam);
    }
  }, [searchParams, access, handleInitialSearch]);

  // Clear states on unmount/reset
  useEffect(() => {
    return () => {
      dispatch(clearSearchResults());
      dispatch(clearApplication());
      dispatch(clearSearchError());
    };
  }, [dispatch]);

  // Handle manual search input + button click
  const handleSearch = async (iinValue?: string) => {
    const iinToSearch = iinValue ?? search;

    try {
      searchSchema.parse({ iin: iinToSearch });
      setValidationError("");

      if (access) {
        updateSearchParams(iinToSearch);

        dispatch(clearSearchError());
        dispatch(clearApplication());
        dispatch(clearSearchResults());

        const result = await dispatch(
          searchConscript({ iin: iinToSearch, access })
        );

        if (searchConscript.fulfilled.match(result)) {
          setStep("found");
        }
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        setValidationError(error.errors[0].message);
      }
    }
  };

  // Создать заявку с ЛМО
  const handleCreateApplication = async () => {
    if (!searchResults?.[0].iin || !access) return;

    const result = await dispatch(
      createApplicationWithLMOByCoordinator({
        iin: searchResults[0].iin,
        access,
      })
    );

    if (createApplicationWithLMOByCoordinator.fulfilled.match(result)) {
      setStep("application");
    }
  };

  // Отправить заявку на медкомиссию
  const handleSendToMedical = async () => {
    if (!currentApplication?.id || !access) return;

    const result = await dispatch(
      sendToMedical({
        applicationId: currentApplication.id,
        access,
      })
    );

    if (sendToMedical.fulfilled.match(result)) {
      setStep("medical");
    }
  };

  // Сброс всего поиска
  const handleReset = () => {
    setSearch("");
    setStep("search");
    setValidationError("");
    updateSearchParams("");
    dispatch(clearSearchResults());
    dispatch(clearApplication());
    dispatch(clearSearchError());
  };

  if (isInitialLoading) {
    return (
      <div className="w-full mx-auto flex justify-center">
        <Card className="w-max flex items-center flex-col p-2">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center space-y-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="text-sm text-gray-600">
                Проверка данных призывника...
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // --- Render functions (UI) ---
  const renderSearchForm = () => (
    <Card className="w-max flex items-center flex-col p-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Поиск призывника
        </CardTitle>
        <CardDescription>
          Введите ИИН и нажмите кнопку
          <br /> для поиска призывника
        </CardDescription>
      </CardHeader>
      <CardContent className="w-full">
        <div className="relative w-full sm:w-auto">
          <Input
            className="pl-10 min-w-[240px] max-w-sm h-11 rounded-lg border border-gray-200 bg-white w-full"
            placeholder="Поиск по ИИН"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        </div>
        {validationError && (
          <p className="text-red-500 text-sm mt-2">{validationError}</p>
        )}
        {searchError && (
          <p className="text-red-500 text-sm mt-2">{searchError}</p>
        )}
      </CardContent>
      <CardFooter className="w-full">
        <MyButton
          onClick={() => handleSearch()}
          className="w-full py-3"
          disabled={searchLoading || !search.trim()}
        >
          {searchLoading ? "Поиск..." : "Найти"}
        </MyButton>
      </CardFooter>
    </Card>
  );

  const renderFoundUser = () => (
    <Card className="w-max flex items-center flex-col p-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Призывник найден
        </CardTitle>
      </CardHeader>
      <CardContent className="w-full space-y-4">
        <div className="space-y-2">
          <p>
            <strong>ФИО:</strong> {searchResults?.[0].full_name}
          </p>
          <p>
            <strong>ИИН:</strong> {searchResults?.[0].iin}
          </p>
          <p>
            <strong>Дата рождения:</strong> {searchResults?.[0].birth_date}
          </p>
          <p>
            <strong>Телефон:</strong> {searchResults?.[0].phone}
          </p>
        </div>
        {appError && <p className="text-red-500 text-sm">{appError}</p>}
      </CardContent>
      <CardFooter className="w-full flex gap-2">
        <MyButton onClick={handleReset} variant="outline" className="flex-1">
          Новый поиск
        </MyButton>
        <MyButton
          onClick={handleCreateApplication}
          className="flex-1"
          disabled={appLoading}
        >
          {appLoading ? "Создание..." : "Создать заявку"}
        </MyButton>
      </CardFooter>
    </Card>
  );

  const renderApplicationCreated = () => (
    <Card className="w-max flex items-center flex-col p-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="w-5 h-5" />
          Заявка найдена
        </CardTitle>
      </CardHeader>
      <CardContent className="w-full space-y-4">
        <div className="space-y-2">
          <p>
            <strong>Призывник:</strong>{" "}
            {searchResults?.[0]?.full_name ??
              currentApplication?.applicant?.full_name ??
              applicationList?.[0].applicant?.full_name}
          </p>
          <p>
            <strong>ID заявки:</strong>{" "}
            {currentApplication?.id ?? applicationList?.[0].id}
          </p>
          <p>
            <strong>Статус:</strong>{" "}
            {currentApplication?.status_display ??
              applicationList?.[0].status_display}
          </p>
          {currentLMO && (
            <div className="mt-4 p-3 bg-gray-50 rounded">
              <h4 className="font-semibold mb-2">Назначенное ЛМО:</h4>
              <p>
                <strong>ID:</strong> {currentLMO.id ?? lmoList?.[0].id}
              </p>
              <p>
                <strong>Номер:</strong>{" "}
                {currentLMO.number ?? lmoList?.[0].number}
              </p>
              <p>
                <strong>Статус:</strong>{" "}
                {currentLMO.status_display ?? lmoList?.[0].status_display}
              </p>
              <p>
                <strong>Текущий этап:</strong>{" "}
                {currentLMO.current_stage ?? "Неизвестно"}
              </p>
            </div>
          )}
        </div>
        {appError && <p className="text-red-500 text-sm">{appError}</p>}
      </CardContent>
      <CardFooter className="w-full flex gap-2">
        <MyButton onClick={handleReset} variant="outline" className="flex-1">
          Новый поиск
        </MyButton>

        {currentApplication?.status === "draft" && (
          <MyButton
            onClick={handleSendToMedical}
            className="flex-1"
            disabled={sendingToMedical}
          >
            {sendingToMedical ? "Отправка..." : "Отправить на медосмотр"}
          </MyButton>
        )}

        <MyButton
          className="flex-1"
          disabled={!currentLMO && !lmoList?.[0]}
          variant={currentLMO || !lmoList?.[0] ? undefined : "outline"}
          onClick={() => {
            const lmoId = currentLMO?.id ?? lmoList?.[0]?.id;
            if (lmoId) {
              router.push(`/coordinator/conscripts/lmo/${lmoList?.[0].id}`);
            }
          }}
        >
          ЛМО (Лист медицинского освидетельствования)
        </MyButton>
      </CardFooter>
      {!currentLMO && !lmoList?.[0] && (
        <p className="text-red-500 text-sm mt-2">
          ЛМО для данного призывника не найдено.
        </p>
      )}
    </Card>
  );

  const renderMedicalSent = () => (
    <Card className="w-max flex items-center flex-col p-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-green-600">
          <Stethoscope className="w-5 h-5" />
          Отправлено на медосмотр
        </CardTitle>
      </CardHeader>
      <CardContent className="w-full space-y-4">
        <div className="space-y-2">
          <p>
            <strong>Призывник:</strong>{" "}
            {searchResults?.[0]?.full_name ??
              currentApplication?.applicant?.full_name}
          </p>
          <p>
            <strong>ID заявки:</strong> {currentApplication?.id}
          </p>
          <p className="text-green-600">
            <strong>Статус:</strong> Отправлено на медосмотр
          </p>
        </div>
      </CardContent>
      <CardFooter className="w-full">
        <MyButton onClick={handleReset} className="w-full">
          Новый поиск
        </MyButton>
      </CardFooter>
    </Card>
  );

  return (
    <div className="w-full mx-auto flex justify-center">
      <div className="grid grid-cols-1 gap-4">
        {step === "search" && renderSearchForm()}
        {step === "found" && renderFoundUser()}
        {step === "application" && renderApplicationCreated()}
        {step === "medical" && renderMedicalSent()}

        <MyButton
          onClick={() => router.push("/coordinator/conscripts")}
          variant="outline"
          className="py-2 w-full max-h-max"
        >
          Таблица призывников
        </MyButton>
      </div>
    </div>
  );
};

export default ConscriptsQueuePage;
