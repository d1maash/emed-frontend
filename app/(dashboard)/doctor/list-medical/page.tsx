"use client";

import { useCallback, useEffect, useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Search, SlidersHorizontal } from "lucide-react";
import { listMedicalData } from "./_components/data";
import { ListMedicalTable } from "./_components/ListMedicalTable";
import z from "zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useDebounce } from "@/app/hooks/useDebounce";
import { clearLMO, clearLMOList, getLMOList } from "@/store/slices/lmoSlice";
import { LMOList } from "@/types/lmo";

const searchSchema = z.object({
  search: z
    .string()
    .min(1, "Введите поисковый запрос")
    .max(50, "Максимальная длина запроса 50 символов"),
});

export default function ListMedicalPage() {
  // tools
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();

  // redux state
  const { lmoList, loading, error } = useAppSelector((state) => state.lmo);
  const { access } = useAppSelector((state) => state.auth);

  // params
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<string | undefined>(undefined);
  const [validationError, setValidationError] = useState("");

  const debouncedSearch = useDebounce(search, 1000);

  useEffect(() => {
    const searchParam = searchParams.get("search");
    const statusParam = searchParams.get("status");

    if (searchParam) setSearch(searchParam);
    if (statusParam) setStatus(statusParam);
  }, [searchParams]);

  // update URLParams
  const updateSearchParams = useCallback(
    (updates: { search?: string; status?: string }) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(updates).forEach(([key, value]) => {
        if (value && value.trim() !== "") {
          params.set(key, value);
        } else {
          params.delete(key);
        }
      });

      router.replace(`?${params.toString()}`);
    },
    [searchParams, router]
  );

  // API request function
  const performSearch = useCallback(
    async (searchTerm: string) => {
      if (!access) return;

      if (!searchTerm.trim()) {
        dispatch(clearLMOList());
        return;
      }

      try {
        searchSchema.parse({ search: searchTerm });
        setValidationError("");

        const result = await dispatch(
          getLMOList({
            search: searchTerm,
            access,
          })
        );

        if (getLMOList.fulfilled.match(result)) {
          updateSearchParams({ search: searchTerm });
        }
      } catch (err) {
        if (err instanceof z.ZodError) {
          setValidationError(err.errors[0].message);
        }
      }
    },
    [access, dispatch, updateSearchParams]
  );

  useEffect(() => {
    if (debouncedSearch.trim()) {
      performSearch(debouncedSearch);
    } else {
      // Очищаем результаты если поле поиска пустое
      dispatch(clearLMOList());
      updateSearchParams({ search: "" });
    }
  }, [debouncedSearch, performSearch, dispatch, updateSearchParams]);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setValidationError("");
  };

  const handleStatusChange = (value: string) => {
    const newStatus = value === "" ? undefined : value;
    setStatus(newStatus);
    updateSearchParams({ status: value });
  };

  // clear
  const clearAllFilters = () => {
    dispatch(clearLMOList());
    handleStatusChange("");
    handleSearchChange("");
    setValidationError("");
  };

  const hasActiveFilters = search || status;
  const lmoListData: LMOList[] = Array.isArray(lmoList) ? lmoList : [];

  const filteredLMOs = lmoListData.filter((c: LMOList) => {
    return true;
  });

  return (
    <div className="">
      <h1 className="text-2xl font-bold mb-6">Список медицинских осмотров</h1>
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
        <div className="max-w-md relative h-max w-full md:w-auto">
          <Input
            placeholder="Поиск по ФИО или ИИН"
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full md:w-[350px] bg-white shadow-none pl-10"
          />
          <Search
            className="text-[--coolgray-90] absolute left-3 top-1/2 -translate-y-1/2"
            size={16}
          />
        </div>
        <Button className="mt-2 md:mt-0 md:ml-4" variant="outline">
          Статус
          <SlidersHorizontal />
        </Button>

        {hasActiveFilters && (
          <button
            className="h-11 rounded-lg border border-gray-200 bg-white w-auto flex items-center gap-2 text-sm px-3 shadow-sm text-muted-foreground hover:bg-gray-50 transition"
            onClick={clearAllFilters}
          >
            Сбросить фильтры
          </button>
        )}
      </div>

      {/* Показываем ошибки валидации */}
      {validationError && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
          {validationError}
        </div>
      )}
      <ListMedicalTable data={filteredLMOs} />

      {/* Сообщение когда нет поиска */}
      {!search && !loading && lmoListData.length === 0 && (
        <div className="text-center p-8 text-gray-500">
          <Search className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <p>Введите поисковый запрос для поиска ЛМО</p>
          <p className="text-sm mt-2">Начните вводить ФИО или ИИН призывника</p>
        </div>
      )}
    </div>
  );
}
